import type {Material} from '../domain/types';
// Entirely fictional material records for testing the interface. Not vendor specifications.
export const materials:Material[] = [
 {id:'DEMO-001',name:'High-alumina brick',category:'Dense refractory',grade:'HA-70 / sample',manufacturer:'Example supplier A',density:2450,conductivity:1.8,maxTemperature:1500,color:'#f59558',source:'Illustrative UI fixture; no technical datasheet',verification:'Sample — unverified'},
 {id:'DEMO-002',name:'Insulating firebrick',category:'Insulating refractory',grade:'IFB-26 / sample',manufacturer:'Example supplier B',density:800,conductivity:0.3,maxTemperature:1350,color:'#e6c58b',source:'Illustrative UI fixture; no technical datasheet',verification:'Sample — unverified'},
 {id:'DEMO-003',name:'Ceramic fiber board',category:'Fiber insulation',grade:'CFB / sample',manufacturer:'Example supplier C',density:300,conductivity:0.12,maxTemperature:1200,color:'#96cbd2',source:'Illustrative UI fixture; no technical datasheet',verification:'Sample — unverified'},
 {id:'DEMO-004',name:'Microporous panel',category:'Backup insulation',grade:'MP / sample',manufacturer:'Example supplier D',density:250,conductivity:0.04,maxTemperature:950,color:'#a6b5d1',source:'Illustrative UI fixture; no technical datasheet',verification:'Sample — unverified'},
 {id:'DEMO-005',name:'Low-cement castable',category:'Dense refractory',grade:'LCC / incomplete',manufacturer:'Example supplier A',density:2600,conductivity:null,maxTemperature:null,color:'#bfa594',source:'Incomplete sample record; properties missing',verification:'Sample — unverified'},
 {id:'DEMO-006',name:'Calcium silicate board',category:'Backup insulation',grade:'CS / sample',manufacturer:'Example supplier B',density:220,conductivity:0.08,maxTemperature:650,color:'#9daf9d',source:'Illustrative UI fixture; no technical datasheet',verification:'Sample — unverified'}
];
export const materialById = (id:string) => materials.find(m=>m.id===id);
