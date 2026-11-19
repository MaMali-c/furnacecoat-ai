import type {DatasetPreview} from '../domain/types';
export const mappingFields=[{key:'furnace_id',label:'Furnace ID',unit:'text'},{key:'operating_temperature',label:'Operating temperature',unit:'°C'},{key:'shell_temperature',label:'Shell temperature',unit:'°C'},{key:'lining_thickness',label:'Lining thickness',unit:'mm'},{key:'heat_flux',label:'Heat flux',unit:'W/m²'}];
export const requiredFields=['furnace_id','operating_temperature','lining_thickness'];
export async function parseExcel(file:File):Promise<DatasetPreview>{
 if(!/\.(xlsx|xls)$/i.test(file.name))throw new Error('Choose a .xlsx or .xls workbook.');
 if(file.size>10*1024*1024)throw new Error('The file exceeds the 10 MB preview limit.');
 const XLSX=await import('xlsx');const data=await file.arrayBuffer();const signature=new Uint8Array(data.slice(0,8));const isZip=signature[0]===0x50&&signature[1]===0x4b;const isOLE=signature[0]===0xd0&&signature[1]===0xcf;
 if(!isZip&&!isOLE)throw new Error('The file is not a recognized Excel workbook.');
 let workbook;try{workbook=XLSX.read(data,{type:'array',sheetRows:502,cellHTML:false,cellFormula:false})}catch{throw new Error('Unable to read this workbook. It may be corrupted or encrypted.');}
 const sheet=workbook.SheetNames[0];if(!sheet)throw new Error('This workbook has no worksheets.');
 const table=XLSX.utils.sheet_to_json<unknown[]>(workbook.Sheets[sheet],{header:1,defval:'',blankrows:false});if(table.length<2)throw new Error('Include a header row and at least one data row.');
 const columns=table[0].map(v=>String(v).trim());if(columns.some(c=>!c)||new Set(columns).size!==columns.length)throw new Error('Header names must be non-empty and unique.');
 const rows=table.slice(1,501).map(row=>Object.fromEntries(columns.map((c,i)=>[c,row[i]??''])));
 return {filename:file.name,size:file.size,sheet,columns,rows,truncated:table.length>501};
}
export function validateMapping(preview:DatasetPreview,mapping:Record<string,string>){const issues:string[]=[];const selected=Object.values(mapping).filter(Boolean);if(new Set(selected).size!==selected.length)issues.push('Map each source column to only one target field.');for(const f of requiredFields)if(!mapping[f])issues.push(`Missing mapping: ${f}`);if(issues.length)return issues;
 preview.rows.forEach((r,i)=>{for(const f of mappingFields){const col=mapping[f.key];if(!col)continue;const v=r[col];if(String(v).trim()===''){if(requiredFields.includes(f.key))issues.push(`Row ${i+2}: ${f.label} is empty.`);continue;}if(f.key!=='furnace_id'&&(!Number.isFinite(Number(v))||(f.key==='lining_thickness'&&Number(v)<=0)))issues.push(`Row ${i+2}: ${f.label} must be ${f.key==='lining_thickness'?'a positive number':'numeric'}.`);}});return issues;
}
export async function downloadTemplate(){const XLSX=await import('xlsx');const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet([{furnace_id:'SAMPLE-01',operating_temperature:1150,shell_temperature:62,lining_thickness:315,heat_flux:426}]),'Sample data');XLSX.writeFile(wb,'FurnaceCoat-demo-template.xlsx');}
