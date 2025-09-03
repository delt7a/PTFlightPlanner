const cache = {}
export function get(key){ const item = cache[key]; if(!item) return null; if(Date.now() - item.ts > item.ttl) { delete cache[key]; return null } return item.data }
export function set(key, data, ttl=6000){ cache[key] = { data, ts: Date.now(), ttl } }