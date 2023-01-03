import { ApiError } from "src/utils/exceptions";

import { prisma } from "../../server/db/client";
import { HTTP_METHOD } from "../../utils/types";
import { registerUserSchema } from "../../utils/validation";

import type { RegisterUserInput } from "../../utils/validation";
import type { NextApiRequest, NextApiResponse } from "next";

const addUser = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name?: string;
}) => {
  return prisma.user.create({
    data: { email, password, ...(name ? { name } : {}) },
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === HTTP_METHOD.POST) {
      registerUserSchema.parse(req.body);
      const user = await addUser(req.body as RegisterUserInput);

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
  } catch (e: unknown) {
    console.log(e);
    if (e instanceof ApiError) {
      return res.status(e.status).json({ status: "Error", message: e.message });
    }

    if (e instanceof Error) {
      return res.status(500).json({ status: "Error", message: e.message });
    }

    return res
      .status(500)
      .json({ status: "Error", message: "Internal Server Error" });
  }
}
