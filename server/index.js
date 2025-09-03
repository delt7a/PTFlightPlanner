import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import atisRoute from './routes/atis.js'
import controllersRoute from './routes/controllers.js'
import airportsRoute from './routes/airports.js'
import aircraftRoute from './routes/aircraft.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())

// API routes
app.use('/api/atis', atisRoute)
app.use('/api/controllers', controllersRoute)
app.use('/api/airports', airportsRoute)
app.use('/api/aircraft', aircraftRoute)

// Serve frontend
const dist = path.join(__dirname, '../frontend/dist')
app.use(express.static(dist))

app.get('*', (req, res) => {
  res.sendFile(path.join(dist, 'index.html'))
})

const PORT = process.env.PORT || 8787
app.listen(PORT, ()=> console.log('Server started on', PORT))