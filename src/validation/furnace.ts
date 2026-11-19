import {z} from 'zod';
export const furnaceSchema=z.object({
 name:z.string().trim().min(2,'Enter at least 2 characters').max(80),geometry:z.enum(['Rectangular','Cylindrical']),
 length:z.number().finite().positive('Must be greater than zero').max(100),width:z.number().finite().positive('Must be greater than zero').max(100),height:z.number().finite().positive('Must be greater than zero').max(100),
 operatingTemperature:z.number().finite().min(1).max(2500),maximumTemperature:z.number().finite().min(1).max(2600),ambientTemperature:z.number().finite().min(-50).max(100),
 atmosphere:z.enum(['Oxidizing','Reducing','Inert']),heating:z.enum(['Natural gas','Electric','Fuel oil']),pressure:z.number().finite().positive().max(10000),operation:z.enum(['Continuous','Cyclic']),shellMaterial:z.string().trim().min(2),
 maxShellTemperature:z.number().finite().min(30).max(500),maxLiningThickness:z.number().finite().positive().max(2000)
}).superRefine((v,c)=>{if(v.maximumTemperature<v.operatingTemperature)c.addIssue({code:'custom',path:['maximumTemperature'],message:'Must be at least the operating temperature'});if(v.ambientTemperature>=v.operatingTemperature)c.addIssue({code:'custom',path:['ambientTemperature'],message:'Must be below the operating temperature'});if(v.maxShellTemperature<=v.ambientTemperature)c.addIssue({code:'custom',path:['maxShellTemperature'],message:'Must exceed the ambient temperature'});});
