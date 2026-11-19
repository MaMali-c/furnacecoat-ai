import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import type {FurnaceConfig,Layer,Project,Page,ThermalResults} from '../domain/types';
import {createDemoResult} from '../services/mockThermal';
export const defaultConfig:FurnaceConfig={name:'Industrial process furnace',geometry:'Rectangular',length:4,width:2.5,height:2.5,operatingTemperature:1150,maximumTemperature:1300,ambientTemperature:25,atmosphere:'Oxidizing',heating:'Natural gas',pressure:101.325,operation:'Continuous',shellMaterial:'Carbon steel',maxShellTemperature:60,maxLiningThickness:400};
export const initialLayers:Layer[]=[{id:'layer-1',materialId:'DEMO-001',thickness:115},{id:'layer-2',materialId:'DEMO-002',thickness:125},{id:'layer-3',materialId:'DEMO-003',thickness:75}];
export const initialProject:Project={id:'project-1',title:'Process Furnace 01',reference:'FC-2026-001',config:defaultConfig,layers:initialLayers,result:createDemoResult(defaultConfig,initialLayers)};
export const moveLayer=(layers:Layer[],from:number,to:number)=>{if(from<0||to<0||from>=layers.length||to>=layers.length)return layers;const copy=[...layers];const [item]=copy.splice(from,1);copy.splice(to,0,item);return copy;};
interface AppStore {projects:Project[];activeId:string;page:Page;persian:boolean;toast:string|null;setPage:(p:Page)=>void;setActive:(id:string)=>void;togglePersian:()=>void;notify:(s:string|null)=>void;saveConfig:(c:FurnaceConfig)=>void;addLayer:()=>void;removeLayer:(id:string)=>void;updateLayer:(id:string,p:Partial<Layer>)=>void;reorderLayer:(from:number,to:number)=>void;setResult:(r:ThermalResults,projectId:string)=>void;addProject:(title:string)=>void}
export const useStore=create<AppStore>()(persist((set)=>{
 const edit=(f:(p:Project)=>Project)=>set(s=>({projects:s.projects.map(p=>p.id===s.activeId?f(p):p)}));
 return {projects:[initialProject],activeId:'project-1',page:'Dashboard Overview',persian:false,toast:null,
 setPage:page=>{location.hash=page.toLowerCase().replaceAll(/[^a-z0-9]+/g,'-');set({page})},setActive:activeId=>set({activeId}),togglePersian:()=>set(s=>({persian:!s.persian})),notify:toast=>set({toast}),
 saveConfig:config=>edit(p=>({...p,config})),addLayer:()=>edit(p=>({...p,layers:[...p.layers,{id:crypto.randomUUID(),materialId:'DEMO-002',thickness:50}]})),
 removeLayer:id=>edit(p=>({...p,layers:p.layers.filter(l=>l.id!==id)})),updateLayer:(id,patch)=>edit(p=>({...p,layers:p.layers.map(l=>l.id===id?{...l,...patch,id:l.id}:l)})),reorderLayer:(from,to)=>edit(p=>({...p,layers:moveLayer(p.layers,from,to)})),
 setResult:(result,projectId)=>set(s=>({projects:s.projects.map(p=>p.id===projectId?{...p,result}:p)})),addProject:title=>{const id=crypto.randomUUID();set(s=>({activeId:id,projects:[...s.projects,{...initialProject,id,title,reference:'FC-'+String(s.projects.length+1).padStart(3,'0'),config:{...defaultConfig},layers:initialLayers.map(l=>({...l,id:crypto.randomUUID()})),result:null}]}))}
 };
},{name:'furnacecoat-workspace-v1',version:1,partialize:({projects,activeId,persian})=>({projects,activeId,persian})}));
export const useProject=()=>useStore(s=>s.projects.find(p=>p.id===s.activeId)??s.projects[0]);
