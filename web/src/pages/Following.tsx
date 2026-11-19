import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSocialStore } from '@/stores/socialStore'
import { Button } from '@/components/ui/Button'
import { Star, UserMinus, Users, Truck } from 'lucide-react'
type FollowProfile={id:string;name:string;role:string;vehicle_type?:string|null;rating?:number|null;total_deliveries?:number;company_name?:string|null}
export function Following(){
 const{following,unfollow,loadFollowing}=useSocialStore(),[profiles,setProfiles]=useState<FollowProfile[]>([]),[loading,setLoading]=useState(true)
 const load=async()=>{try{const r=await fetch('/api/follows',{credentials:'include'});const d=await r.json();if(r.ok){setProfiles(d.profiles||[]);await loadFollowing()}}finally{setLoading(false)}}
 useEffect(()=>{void load()},[])
 return <div className="mx-auto max-w-3xl px-4 py-6 pb-28"><h1 className="mb-2 text-2xl font-bold">المتابَعون</h1><p className="mb-6 text-sm text-surface-500">السائقين والشركات اللي بتتابعهم — محفوظين بحسابك</p>{loading?<div className="card py-10 text-center text-surface-400">جارٍ تحميل القائمة...</div>:profiles.length===0?<div className="card py-12 text-center"><Users className="mx-auto mb-3 h-10 w-10 text-surface-300"/><p className="text-surface-500">لسه ما بتتابع أحد</p><Link to="/orders/new" className="mt-4 inline-block"><Button size="sm">اطلب وجرّب متابعة سائق</Button></Link></div>:<div className="space-y-3">{profiles.map(d=><div key={d.id} className="card flex items-center gap-3 p-4"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 font-bold text-brand-600">{d.role==='driver'?<Truck className="h-5 w-5"/>:d.name.charAt(0)}</div><div className="flex-1"><div className="font-semibold">{d.name}</div><div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-surface-500">{d.vehicle_type&&<span>{d.vehicle_type}</span>}{d.company_name&&<span>{d.company_name}</span>}{d.rating!=null&&<span className="flex items-center gap-0.5"><Star className="h-3 w-3 fill-amber-400 text-amber-400"/>{Number(d.rating).toFixed(1)}</span>}</div></div><Button variant="ghost" size="sm" className="text-red-500" onClick={()=>{unfollow(d.id);setProfiles(p=>p.filter(x=>x.id!==d.id))}}><UserMinus className="h-4 w-4"/>إلغاء</Button></div>)}</div>}</div>
}
