import React, { useEffect, useState } from 'react'
export default function Airports(){
  const [data,setData]=useState({}); const [form,setForm]=useState({icao:'',name:'',lat:'',lon:''})
  useEffect(()=>fetch('/api/airports').then(r=>r.json()).then(setData).catch(()=>{}),[])
  function add(){ fetch('/api/airports',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)}).then(()=>fetch('/api/airports').then(r=>r.json()).then(setData)); setForm({icao:'',name:'',lat:'',lon:''}) }
  return (<div className="min-h-screen p-8 max-w-5xl mx-auto">
    <div className="card">
      <h2 className="text-xl font-semibold">Airports</h2>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs">ICAO</label>
          <input value={form.icao} onChange={e=>setForm({...form,icao:e.target.value.toUpperCase()})} className="w-full p-2 rounded-md bg-slate-700"/>
        </div>
        <div>
          <label className="text-xs">Name</label>
          <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full p-2 rounded-md bg-slate-700"/>
        </div>
        <div>
          <label className="text-xs">Latitude</label>
          <input value={form.lat} onChange={e=>setForm({...form,lat:e.target.value})} className="w-full p-2 rounded-md bg-slate-700"/>
        </div>
        <div>
          <label className="text-xs">Longitude</label>
          <input value={form.lon} onChange={e=>setForm({...form,lon:e.target.value})} className="w-full p-2 rounded-md bg-slate-700"/>
        </div>
      </div>
      <div className="mt-3"><button className="btn bg-blue-600 text-white" onClick={add}>Add Airport</button></div>
      <div className="mt-6">
        <h3 className="font-semibold">Existing</h3>
        <ul className="mt-2 text-sm">{Object.entries(data).map(([k,v])=> <li key={k} className="py-1">{k} — {v.name} ({v.lat},{v.lon})</li>)}</ul>
      </div>
    </div>
  </div>)
}