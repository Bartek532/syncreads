import type { NextApiRequest, NextApiResponse } from "next";
import { newUserSchema } from "../../utils/validation";
import { prisma } from "../../server/db/client";
import { HTTP_METHOD } from "../../utils/consts";

const addUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return prisma.user.create({
    data: { email, password },
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === HTTP_METHOD.POST) {
      newUserSchema.parse(req.body);
      const user = await addUser(req.body);

      return res.status(200).json({
        status: "Success",
        message: `Successfully created user!`,
        user,
      });
    }

    return res.status(400).json({
      status: "Error",
      message: `Only POST requests are supported now!`,
    });
  } catch (e: any) {
    console.log(e);

    return res
      .status(e?.status || 400)
      .json({ status: "Error", message: e?.message || "Bad request" });
  }
}
