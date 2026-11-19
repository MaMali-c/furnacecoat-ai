export const pageNames = ['Dashboard Overview','Furnace Setup','Layer Designer','Materials Library','Thermal Analysis','Optimization','AI & Data','Reports'] as const;
export type Page = typeof pageNames[number];
export interface FurnaceConfig {
  name:string; geometry:'Rectangular'|'Cylindrical'; length:number; width:number; height:number;
  operatingTemperature:number; maximumTemperature:number; ambientTemperature:number;
  atmosphere:'Oxidizing'|'Reducing'|'Inert'; heating:'Natural gas'|'Electric'|'Fuel oil';
  pressure:number; operation:'Continuous'|'Cyclic'; shellMaterial:string; maxShellTemperature:number; maxLiningThickness:number;
}
export interface Material {
  id:string; name:string; category:'Dense refractory'|'Insulating refractory'|'Fiber insulation'|'Backup insulation';
  grade:string; manufacturer:string; density:number|null; conductivity:number|null; maxTemperature:number|null;
  source:string; verification:'Sample — unverified'; color:string;
}
export interface Layer {id:string; materialId:string; thickness:number}
export interface ThermalPoint {position:number; temperature:number; label:string}
export interface ThermalResults {
  status:'demo'; validated:false; generatedAt:string; fingerprint:string;
  heatFlux:number; shellTemperature:number; heatLoss:number; resistance:number; profile:ThermalPoint[];
}
export interface OptimizationCandidate {id:string; name:string; thickness:number; heatLoss:number; relativeCost:number; shell:number; score:number; materials:string[]}
export interface Project {id:string; title:string; reference:string; config:FurnaceConfig; layers:Layer[]; result:ThermalResults|null}
export interface DatasetPreview {filename:string; size:number; sheet:string; columns:string[]; rows:Record<string,unknown>[]; truncated:boolean}
export interface ThermalEngine {analyze(config:FurnaceConfig,layers:Layer[]):Promise<ThermalResults>}
