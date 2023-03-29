import Redis from "ioredis";

import { env } from "../env/server";

import type { RedisOptions } from "ioredis";

const options: RedisOptions = {
  host: env.REDIS_HOST,
  password: env.REDIS_PASSWORD,
  port: env.REDIS_PORT,
  lazyConnect: true,
  maxRetriesPerRequest: 0,
  retryStrategy: (times: number) => {
    if (times > 3) {
      throw new Error(`[Redis] Could not connect after ${times} attempts`);
    }

    return Math.min(times * 200, 1000);
  },
};

export const initRedis = () => {
  try {
    const redis = new Redis(options);

    redis.on("connection", (data) => {
      console.log("[Redis] Connected.", data);
    });

    redis.on("error", (error: unknown) => {
      console.warn("[Redis] Error connecting!", error);
    });

    return redis;
  } catch (e) {
    throw new Error(`[Redis] Could not create a Redis instance!`);
  }
};

export const redis = initRedis();
