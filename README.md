# 24FlightPlanner (Rendr-ready)

This repository is a Rendr-ready full-stack app for ATC24 flight planning. It's SimBrief-inspired: modern, sleek UI and powerful features for creating ready-to-copy flight plans with SID/STAR recommendations.

## Features
- Detailed Create Flight Plan page (departure, arrival, aircraft, flight rules, cruise alt, route, fuel notes, ETAs)
- SID/STAR dynamic recommendation engine (based on airport coordinates and headings)
- Manageable lists of airports and aircraft (simple CRUD backed by JSON files in the repo)
- Controllers page showing active controllers (via 24data proxy)
- Express backend that proxies & caches 24data API and serves the frontend (single service for Rendr)
- Ready for GitHub -> Rendr deploy

## Quick local run
1. Install dependencies
```bash
npm install
```
2. Run dev (frontend Vite + backend node concurrently)
```bash
npm run dev
```
3. Build & start for production
```bash
npm run build
npm start
```

## Rendr deployment
- Push repo to GitHub
- Create a new Rendr service pointing to this repo
- Rendr will run `npm run build` then `npm start` by default (see render.yaml)

## Notes
- The 24data API cannot be called directly from the browser. The Express backend proxies `/api/atis` and `/api/controllers` and includes short TTL caching to respect rate limits.
- Populate `server/data/airports.json` and `server/data/aircraft.json` to add more entries.
- Do not commercialize per 24data terms.