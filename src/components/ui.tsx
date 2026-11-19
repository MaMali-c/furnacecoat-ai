import type {ReactNode} from 'react';
import {ArrowUpRight,FlaskConical,TriangleAlert,Info,X} from 'lucide-react';
import {useStore} from '../store/useStore';
import {DEMO_LABEL} from '../services/mockThermal';
export function Technical({en,fa}:{en:string;fa:string}){const persian=useStore(s=>s.persian);return <>{en}{persian&&<span className="translation" lang="fa" dir="rtl"> ({fa})</span>}</>}
export function DemoBadge(){return <span className="badge demo"><FlaskConical size={11}/>{DEMO_LABEL}</span>}
export function Panel({title,subtitle,action,children,className=''}:{title?:ReactNode;subtitle?:string;action?:ReactNode;children:ReactNode;className?:string}){return <section className={'panel '+className}>{title&&<div className="panel-head"><div><h2>{title}</h2>{subtitle&&<p>{subtitle}</p>}</div>{action}</div>}{children}</section>}
export function PageHeading({eyebrow,title,description,action}:{eyebrow:string;title:ReactNode;description:string;action?:ReactNode}){return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action}</div>}
export function LinkAction({children,onClick}:{children:ReactNode;onClick:()=>void}){return <button className="text-button" onClick={onClick}>{children}<ArrowUpRight size={14}/></button>}
export function Notice({children,warning=false}:{children:ReactNode;warning?:boolean}){const Icon=warning?TriangleAlert:Info;return <div className={'notice '+(warning?'warning':'')}><Icon size={16}/><div>{children}</div></div>}
export function Empty({title,description,action}:{title:string;description:string;action?:ReactNode}){return <div className="empty"><FlaskConical size={30}/><h3>{title}</h3><p>{description}</p>{action}</div>}
export function Modal({title,onClose,children}:{title:string;onClose:()=>void;children:ReactNode}){return <div className="modal-overlay" onClick={onClose}><section className="modal panel" role="dialog" aria-modal="true" aria-label={title} onClick={e=>e.stopPropagation()} onKeyDown={e=>{if(e.key==='Escape')onClose()}}><div className="panel-head"><h2>{title}</h2><button autoFocus className="icon-button" aria-label="Close dialog" onClick={onClose}><X size={18}/></button></div>{children}</section></div>}
