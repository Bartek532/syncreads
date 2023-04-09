import Redis from "ioredis";

import { env } from "../env/server";

import type { RedisOptions } from "ioredis";

const options: RedisOptions = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  lazyConnect: true,
  maxRetriesPerRequest: 3,
  retryStrategy: (times: number) => {
    if (times > 3) {
      throw new Error(`[Redis] Could not connect after ${times} attempts`);
    }

    return Math.min(times * 200, 1000);
  },
  ...(env.REDIS_PASSWORD ? { password: env.REDIS_PASSWORD } : {}),
};

export const createRedisClient = () => {
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

export const publisher = createRedisClient();
export const subscriber = createRedisClient();
