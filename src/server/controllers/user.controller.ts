import { TRPCError } from "@trpc/server";
import { hash } from "bcrypt";

import {
  createUser,
  getUserByEmail,
  getUserFeeds,
} from "../services/user.service";

import type { RegisterUserInput } from "src/utils/validation";

export const registerUserHandler = async ({
  input,
}: {
  input: RegisterUserInput;
}) => {
  try {
    const { email, password } = input;

    const isUserExists = await getUserByEmail({ email });

    if (isUserExists) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "User already exists.",
      });
    }

    //const hashedPassword = await hash(password, 10);
    const user = await createUser({ email, password });

    return {
      status: "Success",
      message: `Successfully created user account!`,
      user,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getUserFeedsHandler = async ({
  input,
}: {
  input: { email: string };
}) => {
  try {
    return getUserFeeds({ email: input.email });
  } catch (err) {
    console.error(err);
    throw err;
  }
};
