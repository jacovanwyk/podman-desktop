var i=Object.defineProperty;var m=(e,t,o)=>t in e?i(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var a=(e,t,o)=>m(e,typeof t!="symbol"?t+"":t,o);import{p,i as c,b as l,c as d,n as u,h as f}from"./props-Ct5youmW.js";import"./ErrorMessage-nrR_MbHO.js";import"./Button-CXtuYCLJ.js";import{c as n,d as _,f as T}from"./Table-BrcU3MAg.js";import"./LinearProgress-B7Q4YnHG.js";import"./Spinner-3w347hq6.js";import"./EmptyScreen-D2cOoZkI.js";import{d as b,c as w,s as h}from"./create-runtime-stories-9QZNooOq.js";import"./class-CJ27Bt_C.js";import"./index-client-DELMZoey.js";import"./index-A764_bBz.js";import"./fa-layers-text.svelte_svelte_type_style_lang-CWnm17nQ.js";import"./attributes-Jce5emvo.js";import"./StarIcon-CcmoysF8.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-DtmeDzJ6.js";import"./index-D-8MO0q_.js";import"./index-DPS9-N-h.js";class s{constructor(t,o){a(this,"title");a(this,"info");this.title=t,this.info=o}}class g{constructor(t){a(this,"info");this.info=t}}const C=(e,t,o=u)=>{n(e,d(()=>f(t==null?void 0:t(),["_children"])))},{Story:D,meta:x}=b({component:n,title:"Table",tags:["autodocs"],args:{},parameters:{docs:{description:{component:"These are the stories for the `Table` component.\nAllow to display a table."}}}}),y=[{name:"John",duration:new Date().getTime()-6e5},{name:"Henry",duration:new Date().getTime()},{name:"Charlie",duration:new Date().getTime()-36e5}],B=new s("Name",{renderMapping:e=>e.name,renderer:_}),M=new s("Duration",{renderMapping:e=>e.duration?new Date(e.duration):void 0,renderer:T}),S=[B,M],v=e=>!0,R=new g({selectable:v,disabledText:"cannot be selected"});function r(e,t){p(t,!1),h(C),c(),D(e,{name:"Basic",args:{data:y,columns:S,row:R},parameters:{__svelteCsf:{rawCode:"<Table {...args}></Table>"}}}),l()}r.__docgen={keywords:[],data:[],name:"Table.stories.svelte"};const k=w(r,x),Y=["Basic"],Z=k.Basic;export{Z as Basic,Y as __namedExportsOrder,x as default};