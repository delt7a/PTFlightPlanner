import React, { useEffect, useState } from 'react'
export default function Controllers(){
  const [data,setData]=useState([])
  useEffect(()=>{ fetch('/api/controllers').then(r=>r.json()).then(setData).catch(()=>{}) },[])
  return (<div className="min-h-screen p-8 max-w-6xl mx-auto">
    <div className="card">
      <h2 className="text-xl font-semibold">Active Controllers</h2>
      <div className="mt-4 grid gap-3">{data.length===0? <div className="text-slate-400">No active controllers</div> : data.map((p,idx)=> (
        <div key={idx} className="p-3 bg-slate-700 rounded-md">
          <div className="flex justify-between"><div><strong>{p.airport}</strong> — {p.position}</div><div className="text-sm text-slate-300">{p.holder}</div></div>
          <div className="mt-2 text-xs">Queue: {p.queue?.length || 0} {p.queue?.length ? `(${p.queue.join(',')})` : ''}</div>
        </div>
      ))}</div>
    </div>
  </div>)
}