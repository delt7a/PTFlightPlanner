import React, { useEffect, useState } from 'react'
import { recommendSID, recommendSTAR } from '../lib/sidstar.js'

export default function CreateFlightPlan(){
  const [dep,setDep]=useState('KJFK'), [arr,setArr]=useState('EGLL')
  const [aircraft,setAircraft]=useState('A320'), [rules,setRules]=useState('IFR')
  const [alt,setAlt]=useState('FL350'), [route,setRoute]=useState(''), [useSS,setUseSS]=useState(true)
  const [plan,setPlan]=useState(''), [notes,setNotes]=useState(''), [eta,setEta]=useState('01:30')

  const [airports, setAirports] = useState({})
  const [aircraftList, setAircraftList] = useState({})

  useEffect(()=>{ fetch('/api/airports').then(r=>r.json()).then(setAirports).catch(()=>{}) ; fetch('/api/aircraft').then(r=>r.json()).then(setAircraftList).catch(()=>{}) },[])

  function buildPlan(e){
    e && e.preventDefault()
    const depI=dep.trim().toUpperCase(), arrI=arr.trim().toUpperCase()
    let sid=null, star=null
    if(useSS){ sid = recommendSID(depI, arrI); star = recommendSTAR(depI, arrI) }
    let base = route.trim() ? route.trim() : 'DCT'
    const tokens = [depI]
    if(sid) tokens.push(sid.name)
    if(base) tokens.push(base)
    if(star) tokens.push(star.name)
    tokens.push(arrI)
    const finalRoute = tokens.filter(Boolean).join(' ')
    const output = `Callsign: YOURCALL\nRoute: ${finalRoute}\nAircraft: ${aircraft} | Rules: ${rules} | Alt: ${alt}\nETA: ${eta}\nNotes: ${notes}`
    setPlan(output)
  }

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
      <form className="card md:col-span-2" onSubmit={buildPlan}>
        <h2 className="text-xl font-semibold mb-4">Create Flight Plan</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs">Departure</label>
            <input value={dep} onChange={e=>setDep(e.target.value)} className="w-full p-2 rounded-md bg-slate-700"/>
          </div>
          <div>
            <label className="text-xs">Arrival</label>
            <input value={arr} onChange={e=>setArr(e.target.value)} className="w-full p-2 rounded-md bg-slate-700"/>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-3">
          <div>
            <label className="text-xs">Aircraft</label>
            <input value={aircraft} onChange={e=>setAircraft(e.target.value)} className="w-full p-2 rounded-md bg-slate-700" list="aircrafts"/>
            <datalist id="aircrafts">{Object.keys(aircraftList).map(k=> <option key={k} value={k}/>)}</datalist>
          </div>
          <div>
            <label className="text-xs">Rules</label>
            <select value={rules} onChange={e=>setRules(e.target.value)} className="w-full p-2 rounded-md bg-slate-700"><option>IFR</option><option>VFR</option></select>
          </div>
          <div>
            <label className="text-xs">Cruise Altitude</label>
            <input value={alt} onChange={e=>setAlt(e.target.value)} className="w-full p-2 rounded-md bg-slate-700"/>
          </div>
        </div>

        <div className="mt-3">
          <label className="text-xs">Route (optional)</label>
          <input value={route} onChange={e=>setRoute(e.target.value)} placeholder="e.g. DCT MERIT DCT" className="w-full p-2 rounded-md bg-slate-700"/>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <input type="checkbox" checked={useSS} onChange={()=>setUseSS(v=>!v)}/> <label className="text-sm">Use SID/STAR?</label>
          <button type="button" onClick={()=>{ setRoute('') ; setPlan('') }} className="ml-auto btn bg-slate-700">Reset</button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button className="btn bg-blue-600 text-white" type="submit">Generate Plan</button>
          <button type="button" className="btn bg-green-600 text-white" onClick={()=>navigator.clipboard.writeText(plan)} disabled={!plan}>Copy Plan</button>
        </div>

        <div className="mt-6">
          <label className="text-xs">ETA</label>
          <input value={eta} onChange={e=>setEta(e.target.value)} className="w-32 p-2 rounded-md bg-slate-700"/>
          <label className="text-xs ml-4">Notes</label>
          <input value={notes} onChange={e=>setNotes(e.target.value)} className="w-64 p-2 rounded-md bg-slate-700"/>
        </div>
      </form>

      <aside className="card">
        <h3 className="font-semibold">Flight Summary</h3>
        <div className="mt-3 text-sm whitespace-pre-wrap">{plan || 'No plan yet. Fill the form and generate.'}</div>
        <div className="mt-4 text-xs text-slate-300">
          <strong>Airport Lookup</strong><br/>
          The Airports and Aircraft lists can be managed in the Airports & Aircraft pages.
        </div>
      </aside>
    </div>
  )
}