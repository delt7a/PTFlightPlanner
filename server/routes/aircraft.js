import express from 'express'
import fs from 'fs'
import path from 'path'
const router = express.Router()
const DATA = path.join(process.cwd(), 'server', 'data', 'aircraft.json')

function read(){ try{ return JSON.parse(fs.readFileSync(DATA,'utf8')) }catch(e){ return {} } }
function write(d){ fs.writeFileSync(DATA, JSON.stringify(d, null, 2)) }

router.get('/', (req,res)=> res.json(read()))
router.post('/', (req,res)=>{
  const body = req.body
  if(!body.type) return res.status(400).json({error:'type required'})
  const d = read(); d[body.type] = body; write(d); res.json({ok:true})
})
router.delete('/:type', (req,res)=>{
  const type = req.params.type; const d = read()
  delete d[type]; write(d); res.json({ok:true})
})

export default router