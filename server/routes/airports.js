import express from 'express'
import fs from 'fs'
import path from 'path'
const router = express.Router()
const DATA = path.join(process.cwd(), 'server', 'data', 'airports.json')

function read(){ try{ return JSON.parse(fs.readFileSync(DATA,'utf8')) }catch(e){ return {} } }
function write(d){ fs.writeFileSync(DATA, JSON.stringify(d, null, 2)) }

router.get('/', (req,res)=> res.json(read()))
router.post('/', (req,res)=>{
  const body = req.body
  if(!body.icao) return res.status(400).json({error:'icao required'})
  const d = read(); d[body.icao.toUpperCase()] = body; write(d); res.json({ok:true})
})
router.put('/:icao', (req,res)=>{
  const icao = req.params.icao.toUpperCase(); const d = read()
  if(!d[icao]) return res.status(404).json({error:'not found'})
  d[icao] = {...d[icao], ...req.body}; write(d); res.json({ok:true})
})
router.delete('/:icao', (req,res)=>{
  const icao = req.params.icao.toUpperCase(); const d = read()
  delete d[icao]; write(d); res.json({ok:true})
})

export default router