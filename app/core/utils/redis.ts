import Redis from "ioredis"

export const redis = new Redis({
  port: 6168,
  host: process.env.REDISHOST,
  password: process.env.REDISPASSWORD,
})
