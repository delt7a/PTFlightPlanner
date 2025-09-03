import React, { useEffect, useState } from 'react'
export default function Aircraft(){
  const [data,setData]=useState({}); const [form,setForm]=useState({type:'',cruise:'',notes:''})
  useEffect(()=>fetch('/api/aircraft').then(r=>r.json()).then(setData).catch(()=>{}),[])
  function add(){ fetch('/api/aircraft',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)}).then(()=>fetch('/api/aircraft').then(r=>r.json()).then(setData)); setForm({type:'',cruise:'',notes:''}) }
  return (<div className="min-h-screen p-8 max-w-5xl mx-auto">
    <div className="card">
      <h2 className="text-xl font-semibold">Aircraft Types</h2>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div><label className="text-xs">Type</label><input value={form.type} onChange={e=>setForm({...form,type:e.target.value.toUpperCase()})} className="w-full p-2 rounded-md bg-slate-700"/></div>
        <div><label className="text-xs">Cruise</label><input value={form.cruise} onChange={e=>setForm({...form,cruise:e.target.value})} className="w-full p-2 rounded-md bg-slate-700"/></div>
        <div><label className="text-xs">Notes</label><input value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} className="w-full p-2 rounded-md bg-slate-700"/></div>
      </div>
      <div className="mt-3"><button className="btn bg-blue-600 text-white" onClick={add}>Add Aircraft</button></div>
      <div className="mt-6"><h3 className="font-semibold">Existing</h3><ul className="mt-2 text-sm">{Object.entries(data).map(([k,v])=> <li key={k} className="py-1">{k} — {v.cruise} — {v.notes}</li>)}</ul></div>
    </div>
  </div>)
}