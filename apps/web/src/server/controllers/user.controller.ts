import dayjs from "dayjs";
import { register } from "rmapi-js";

import { ApiError } from "../../utils/exceptions";
import {
  getUserDevice,
  getUserFeeds,
  registerUserDevice,
  unregisterUserDevice,
} from "../services/user.service";

import type {
  CursorPaginationInput,
  RegisterAndConnectDeviceInput,
  UnregisterAndDisconnectDeviceInput,
} from "../../utils/validation/types";

export const registerDeviceHandler = async ({
  id,
  code,
}: RegisterAndConnectDeviceInput) => {
  try {
    const token = await register(code);
    const device = await registerUserDevice({ token, id });

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
  id,
}: UnregisterAndDisconnectDeviceInput) => {
  try {
    const device = await unregisterUserDevice({ id });

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
  id,
  input,
}: {
  id: string;
  input: CursorPaginationInput;
}) => {
  const { data, error, status, count } = await getUserFeeds({
    id,
    limit: input.limit,
    cursor: input.cursor ?? dayjs().toISOString(),
  });

  if (error) {
    throw new ApiError(status, error.message);
  }

  return { data, count };
};

export const getUserDeviceHandler = async ({ id }: { id: string }) => {
  const { data } = await getUserDevice({ id });

  return data;
};
