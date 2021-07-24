import { redis } from "./redis"

const fetch = async <T>(key: string, fetcher: () => T, expires: number) => {
  const existing = await get(key)
  if (existing !== null) return existing
  return set(key, fetcher, expires)
}

const set = async <T>(key: string, fetcher: () => T, expires: number) => {
  const value = await fetcher()
  await redis.set(key, JSON.stringify(value), "EX", expires)
  return value
}

const del = async (key: string) => {
  await redis.del(key)
}

const get = async (key: string) => {
  const value = await redis.get(key)
  if (!value) {
    return null
  }
  return JSON.parse(value)
}

const exist = async (key: string) => {
  const exists = await redis.exists(key)
  if (exists) {
    console.log(`${key} does exists`)
  } else {
    console.log(`${key} does NOT exists`)
  }
}

/* const exists = await redis.exists( key );
if ( exists ) {
    console.log( `${key} does exists` );
} else {
    console.log( `${key} does NOT exists` );
} */

// eslint-disable-next-line import/no-anonymous-default-export
export default { fetch, set, get, del, exist }
