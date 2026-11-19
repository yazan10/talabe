import { create } from 'zustand'
import { persist } from 'zustand/middleware'
export type RateableTarget={id:string;name:string;type:'driver'|'company'}
interface Rating{targetId:string;targetType:'driver'|'company';stars:number;comment?:string;createdAt:string}
interface SocialState{following:string[];ratings:Rating[];follow:(id:string)=>void;unfollow:(id:string)=>void;isFollowing:(id:string)=>boolean;rate:(targetId:string,targetType:'driver'|'company',stars:number,comment?:string)=>Promise<void>;getRatingsFor:(targetId:string)=>Rating[];getAverageRating:(targetId:string)=>number|null;loadFollowing:()=>Promise<void>}
export const useSocialStore=create<SocialState>()(persist((set,get)=>({
 following:[],ratings:[],
 follow:(id)=>{set(s=>s.following.includes(id)?s:{following:[...s.following,id]});void fetch('/api/follows',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({id})}).catch(()=>{})},
 unfollow:(id)=>{set(s=>({following:s.following.filter(x=>x!==id)}));void fetch('/api/follows',{method:'DELETE',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({id})}).catch(()=>{})},
 isFollowing:(id)=>get().following.includes(id),
 rate:async(targetId,targetType,stars,comment)=>{const response=await fetch('/api/ratings',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({targetId,targetType,stars,comment})});const data=await response.json();if(!response.ok)throw new Error(data.error||'تعذر حفظ التقييم');set(s=>({ratings:[...s.ratings.filter(r=>r.targetId!==targetId),{targetId,targetType,stars,comment,createdAt:new Date().toISOString()}]}))},
 getRatingsFor:(targetId)=>get().ratings.filter(r=>r.targetId===targetId),
 getAverageRating:(targetId)=>{const list=get().ratings.filter(r=>r.targetId===targetId);return list.length?list.reduce((a,r)=>a+r.stars,0)/list.length:null},
 loadFollowing:async()=>{try{const r=await fetch('/api/follows',{credentials:'include'});if(!r.ok)return;const d=await r.json();set({following:d.following||[]})}catch{}}
}),{name:'talabe-social'}))
