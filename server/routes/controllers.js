import express from 'express'
import fetch from 'node-fetch'
import { get, set } from '../cache.js'
const router = express.Router()
const BASE = 'https://24data.ptfs.app/controllers'

router.get('/', async (req, res) => {
  try {
    const key = 'controllers_all'
    let data = get(key)
    if(!data){
      const r = await fetch(BASE)
      if(!r.ok) return res.status(502).json({ error: 'Upstream controllers error' })
      data = await r.json()
      set(key, data, 6000)
    }
    // filter active controller positions
    const active = (Array.isArray(data)?data:[]).filter(p => p && p.claimable === false && p.holder)
    res.json(active)
  } catch(e){
    res.status(500).json({ error: e.message })
  }
})

export default router