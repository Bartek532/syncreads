import { redis } from "../../lib/redis";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await redis.publish("test", "test message");

  res.status(200).json({ name: "John Doe" });
}
