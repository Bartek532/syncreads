import { TRPCError } from "@trpc/server";
import { hash } from "argon2";
import type { RegisterUserInput } from "src/utils/validation";
import { createUser, getUserByEmail } from "../services/user.service";

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

    const hashedPassword = await hash(password);
    const user = await createUser({ email, password: hashedPassword });

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
