import { TRPCError } from "@trpc/server";
import { hashSync } from "bcrypt";
import { register } from "rmapi-js";

import {
  SYNCS_PAGINATION_DEFAULT_PAGE,
  SYNCS_PAGINATION_DEFAULT_PER_PAGE,
} from "../../config/sync";
import { getUserSyncs } from "../services/sync.service";
import {
  createUser,
  getUserByEmail,
  getUserDevice,
  getUserFeeds,
  registerUserDevice,
  unregisterUserDevice,
} from "../services/user.service";

import type {
  RegisterAndConnectDeviceInput,
  RegisterUserInput,
  UnregisterAndDisconnectDeviceInput,
} from "../../utils/validation";

export const registerUserHandler = async ({
  input,
}: {
  input: RegisterUserInput;
}) => {
  try {
    const { email, password, name } = input;

    const isUserExists = await getUserByEmail({ email });

    if (isUserExists) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "User already exists.",
      });
    }

    const hashedPassword = hashSync(password, 10);
    const user = await createUser({ email, password: hashedPassword, name });

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

export const registerDeviceHandler = async ({
  email,
  code,
}: RegisterAndConnectDeviceInput) => {
  try {
    const token = await register(code);
    const device = await registerUserDevice({ token, email });

    return {
      status: "Success",
      message: `Successfully registered your device!`,
      device,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const unregisterDeviceHandler = async ({
  email,
}: UnregisterAndDisconnectDeviceInput) => {
  try {
    const device = await unregisterUserDevice({ email });

    return {
      status: "Success",
      message: `Successfully unregistered your device!`,
      device,
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

export const getUserDeviceHandler = async ({ email }: { email: string }) => {
  try {
    return getUserDevice({ email });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getUserSyncsHandler = async ({
  email,
  page,
  perPage,
}: {
  email: string;
  page?: number | null | undefined;
  perPage?: number | null | undefined;
}) => {
  try {
    const [total, syncs, articles] = await getUserSyncs({
      email,
      page: page ?? SYNCS_PAGINATION_DEFAULT_PAGE,
      perPage: perPage ?? SYNCS_PAGINATION_DEFAULT_PER_PAGE,
    });

    return { total, syncs, articles: articles._sum.syncedArticlesCount ?? 0 };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
