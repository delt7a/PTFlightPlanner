import express from 'express'
import fetch from 'node-fetch'
import { get, set } from '../cache.js'
const router = express.Router()
const BASE = 'https://24data.ptfs.app/atis'

router.get('/', async (req, res) => {
  try {
    const airports = (req.query.airports || '').toString().split(',').map(s=>s.trim().toUpperCase()).filter(Boolean)
    const key = 'atis_all'
    let data = get(key)
    if(!data){
      const r = await fetch(BASE)
      if(!r.ok) return res.status(502).json({ error: 'Upstream ATIS error' })
      data = await r.json()
      set(key, data, 6000)
    }
    let out = data
    if(airports.length){
      const setA = new Set(airports)
      out = (Array.isArray(data)?data:[]).filter(a=> setA.has(String(a.airport || '').toUpperCase()))
    }
    res.json(out)
  } catch(e){
    res.status(500).json({ error: e.message })
  }
})

export default router