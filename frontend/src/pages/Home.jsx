import { Link } from 'react-router-dom'
export default function Home(){ return (
  <div className="min-h-screen p-8 max-w-5xl mx-auto">
    <div className="card text-center">
      <h1 className="text-3xl font-bold">24FlightPlanner</h1>
      <p className="mt-2 text-slate-300">Detailed flight planning for ATC24 — modern, sleek, SimBrief-inspired.</p>
      <div className="mt-4 flex justify-center gap-3">
        <Link to="/create" className="btn bg-blue-600 text-white">Create Flight Plan</Link>
        <Link to="/controllers" className="btn bg-slate-700 text-white">Controllers</Link>
        <Link to="/airports" className="btn bg-slate-700 text-white">Airports</Link>
        <Link to="/aircraft" className="btn bg-slate-700 text-white">Aircraft</Link>
      </div>
    </div>
  </div>
)}