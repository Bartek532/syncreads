import { ee } from "../../server/events";

import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  ee.emit("add", "test message");

  res.status(200).json({ name: "John Doe" });
}
