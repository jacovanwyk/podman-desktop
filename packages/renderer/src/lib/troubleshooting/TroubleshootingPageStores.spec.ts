/**********************************************************************
 * Copyright (C) 2023-2025 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ***********************************************************************/

/* eslint-disable @typescript-eslint/no-explicit-any */

import '@testing-library/jest-dom/vitest';

import { render, screen } from '@testing-library/svelte';
import { beforeAll, expect, test } from 'vitest';

import TroubleshootingPageStores from './TroubleshootingPageStores.svelte';

beforeAll(() => {});

test('Check stores widget is there', async () => {
  render(TroubleshootingPageStores, {});

  // get the title
  const title = screen.getByRole('status', { name: 'stores' });
  expect(title).toBeInTheDocument();

  // expect to have store list
  const stores = screen.getByRole('list', { name: 'stores' });
  expect(stores).toBeInTheDocument();
});
