import {LayoutDashboard,Box,Layers3,Database,ChartNoAxesCombined,SlidersHorizontal,BrainCircuit,FileText,Flame,ArrowUpRight,ShieldCheck} from 'lucide-react';
import {pageNames,type Page} from '../domain/types';
import {useStore} from '../store/useStore';
const icons=[LayoutDashboard,Box,Layers3,Database,ChartNoAxesCombined,SlidersHorizontal,BrainCircuit,FileText];
const labels=['Overview','Furnace setup','Layer designer','Materials library','Thermal analysis','Optimization','AI & data','Reports'];
export function Navigation({close}:{close?:()=>void}){const page=useStore(s=>s.page);const go=useStore(s=>s.setPage);const navigate=(p:Page)=>{go(p);close?.()};return <>
 <a href="#dashboard-overview" className="brand" onClick={()=>navigate('Dashboard Overview')}><div className="brand-mark"><Flame size={27}/></div><div>FurnaceCoat <span>AI</span><small>THERMAL ENGINEERING WORKSPACE</small></div></a>
 <div className="nav-caption">WORKSPACE</div><nav aria-label="Main navigation">{pageNames.map((p,i)=>{const Icon=icons[i];return <button key={p} aria-current={page===p?'page':undefined} onClick={()=>navigate(p)} className={'nav-item '+(page===p?'active':'')}><Icon size={18}/><span>{labels[i]}</span>{p==='AI & Data'&&<span className="tiny-label">BETA</span>}{page===p&&<span className="active-dot"/>}</button>})}</nav>
 <div className="sidebar-bottom"><div className="phase-card"><div><ShieldCheck size={18}/><span>Foundation phase</span><span className="phase-dot"/></div><p>Your design workspace.<br/>Engineering validation comes next.</p><button onClick={()=>navigate('Reports')}>View validation status <ArrowUpRight size={14}/></button></div><div className="sidebar-foot"><div className="avatar">MA</div><div>Engineering workspace<small>Local project storage</small></div><span className="online-dot"/></div></div>
 </>}
