// client-side SID/STAR engine (same heuristics as server-side idea)
// Uses embedded aircraft data in frontend/data
import airports from '../data/airports.json'
import procedures from '../data/sidstar.json'

function toRad(deg){ return deg * Math.PI/180 }
function toDeg(rad){ return rad * 180 / Math.PI }

export function bearingBetween(lat1, lon1, lat2, lon2){
  const φ1 = toRad(lat1), φ2 = toRad(lat2)
  const Δλ = toRad(lon2 - lon1)
  const y = Math.sin(Δλ) * Math.cos(φ2)
  const x = Math.cos(φ1)*Math.sin(φ2) - Math.sin(φ1)*Math.cos(φ2)*Math.cos(Δλ)
  let θ = Math.atan2(y, x); θ = toDeg(θ); return (θ + 360) % 360
}

function smallestAngleDiff(a,b){ let d = Math.abs(a-b) % 360; if (d>180) d = 360-d; return d }

export function recommendSID(depIcao, arrIcao){
  const dep = airports[depIcao]; const arr = airports[arrIcao]
  if (!dep || !arr) return null
  const procSet = procedures[depIcao]?.SIDs || []
  if (!procSet.length) return null
  const brg = bearingBetween(dep.lat, dep.lon, arr.lat, arr.lon)
  let best = procSet[0]; let bestDiff = 999
  for(const p of procSet){ const diff = smallestAngleDiff(p.initialHeading, brg); if (diff < bestDiff){ bestDiff = diff; best = p } }
  if (bestDiff <= 80) return best
  return procSet[0]
}

export function recommendSTAR(depIcao, arrIcao){
  const dep = airports[depIcao]; const arr = airports[arrIcao]
  if (!dep || !arr) return null
  const procSet = procedures[arrIcao]?.STARs || []
  if (!procSet.length) return null
  const brg = bearingBetween(dep.lat, dep.lon, arr.lat, arr.lon)
  const reverse = (brg + 180) % 360
  let best = procSet[0]; let bestDiff = 999
  for(const p of procSet){ const diff = smallestAngleDiff(p.finalHeading, reverse); if (diff < bestDiff){ bestDiff = diff; best = p } }
  if (bestDiff <= 80) return best
  return procSet[0]
}