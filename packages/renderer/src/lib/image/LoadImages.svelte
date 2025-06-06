<script lang="ts">
/* eslint-disable import/no-duplicates */
// https://github.com/import-js/eslint-plugin-import/issues/1479
import { faMinusCircle, faPlay, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Button, ErrorMessage, Input } from '@podman-desktop/ui-svelte';
import { onMount } from 'svelte';
import { get } from 'svelte/store';
import { router } from 'tinro';

import ContainerConnectionDropdown from '/@/lib/forms/ContainerConnectionDropdown.svelte';
import { providerInfos } from '/@/stores/providers';
import type { ProviderContainerConnectionInfo, ProviderInfo } from '/@api/provider-info';

import EngineFormPage from '../ui/EngineFormPage.svelte';

let archivesToLoad: string[] = [];
let loadError: string = '';

let providers: ProviderInfo[] = [];
let providerConnections: ProviderContainerConnectionInfo[] = [];
let selectedProvider: ProviderContainerConnectionInfo | undefined = undefined;
let inProgress = false;

let loadDisabled = false;
$: loadDisabled = !selectedProvider || archivesToLoad.length === 0;

onMount(async () => {
  providers = get(providerInfos);
  providerConnections = providers
    .map(provider => provider.containerConnections)
    .flat()
    .filter(providerContainerConnection => providerContainerConnection.status === 'started');

  const selectedProviderConnection = providerConnections.length > 0 ? providerConnections[0] : undefined;
  selectedProvider = !selectedProvider && selectedProviderConnection ? selectedProviderConnection : selectedProvider;
});

async function addArchivesToLoad(): Promise<void> {
  const archives = await window.openDialog({
    title: 'Select Tar Archive(s) containing Image(s) to load',
    selectors: ['multiSelections', 'openFile'],
  });

  if (!archives) {
    return;
  }

  archivesToLoad = [...archivesToLoad, ...archives];
}

function deleteImagesTarArchiveToLoad(index: number): void {
  archivesToLoad = archivesToLoad.filter((_, i) => i !== index);
}

async function loadImages(): Promise<void> {
  loadError = '';

  if (!selectedProvider) {
    throw new Error('Select a provider to load');
  }

  inProgress = true;

  for (const archive of archivesToLoad) {
    try {
      await window.loadImages({
        provider: selectedProvider,
        archives: [archive],
      });
    } catch (e) {
      loadError += `Error while loading ${archive}: ${String(e)}\n`;
    }
  }

  inProgress = false;
  if (loadError === '') {
    router.goto('/images');
  }
}
</script>

<EngineFormPage title="Load Images">
  {#snippet icon()}
    <i class="fas fa-play fa-2x" aria-hidden="true"></i>
  {/snippet}
  {#snippet content()}
  <div class="space-y-2">
    {#if providerConnections.length > 1}
    <div class="mb-2">
      <label for="providerChoice" class="block mb-2 font-semibold text-[var(--pd-content-card-header-text)]"
        >Container Engine</label>
      <ContainerConnectionDropdown
        id="providerChoice"
        name="providerChoice"
        bind:value={selectedProvider}
        connections={providerConnections}/>
      </div>
    {/if}

    <Button on:click={addArchivesToLoad} icon={faPlusCircle} type="link">Add archive</Button>
    <!-- Display the list of existing imagesToLoad -->
    {#if archivesToLoad.length > 0}
      <div class="flex flex-row justify-center w-full py-1 font-semibold text-[var(--pd-content-card-text)]">
        <div class="flex flex-col grow pl-2">Image Archives</div>
      </div>
    {/if}
    {#each archivesToLoad as archiveToLoad, index (index)}
      <div class="flex flex-row justify-center w-full py-1">
        <Input bind:value={archiveToLoad} aria-label="archive path" readonly={true} />
        <Button type="link" on:click={(): void => deleteImagesTarArchiveToLoad(index)} icon={faMinusCircle} />
      </div>
    {/each}

    <div class="pt-5">
      <Button
        on:click={loadImages}
        inProgress={inProgress}
        class="w-full"
        icon={faPlay}
        aria-label="Load images"
        disabled={loadDisabled}>
        Load Images
      </Button>
      <div aria-label="loadError">
        {#if loadError !== ''}
          <ErrorMessage class="py-2 text-sm" error={loadError} />
        {/if}
      </div>
    </div>
  </div>
  {/snippet}
</EngineFormPage>
