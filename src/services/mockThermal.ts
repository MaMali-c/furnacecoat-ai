import type {FurnaceConfig,Layer,ThermalEngine,ThermalResults,OptimizationCandidate} from '../domain/types';
export const DEMO_LABEL='DEMO / NOT VALIDATED';
export const fingerprint=(config:FurnaceConfig,layers:Layer[])=>JSON.stringify({config,layers});
export const totalThickness=(layers:Layer[])=>Math.round(layers.reduce((s,l)=>s+l.thickness,0)*100)/100;
export function createDemoResult(config:FurnaceConfig,layers:Layer[]):ThermalResults {
 return {status:'demo',validated:false,generatedAt:new Date().toISOString(),fingerprint:fingerprint(config,layers),heatFlux:426,shellTemperature:62,heatLoss:18.4,resistance:2.64,
 profile:[{position:0,temperature:1150,label:'Hot face'},{position:37,temperature:810,label:'Interface 1'},{position:73,temperature:268,label:'Interface 2'},{position:100,temperature:62,label:'Shell'}]};
}
// Fixed educational fixtures. Deliberately independent of input values; this is not a solver.
export const mockEngine:ThermalEngine={async analyze(config,layers){await new Promise(r=>setTimeout(r,450));return createDemoResult(config,layers)}};
export const candidates:OptimizationCandidate[]=[
 {id:'A',name:'Balanced lining',thickness:315,heatLoss:18.4,relativeCost:100,shell:62,score:82,materials:['DEMO-001','DEMO-002','DEMO-003']},
 {id:'B',name:'Low-loss concept',thickness:365,heatLoss:13.2,relativeCost:126,shell:49,score:91,materials:['DEMO-001','DEMO-002','DEMO-004']},
 {id:'C',name:'Compact concept',thickness:265,heatLoss:24.8,relativeCost:84,shell:78,score:68,materials:['DEMO-001','DEMO-003']}
];
