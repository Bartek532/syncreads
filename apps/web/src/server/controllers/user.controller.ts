import { HTTP_STATUS_CODE } from "@rssmarkable/shared";
import dayjs from "dayjs";
import { register } from "rmapi-js";

import { deleteFeed, getFeedById } from "../services/feed/feed.service";
import {
  deleteUserFeed,
  getUserDevice,
  getUserFeeds,
  getUserArticles,
  getUserSyncs,
  registerUserDevice,
  unregisterUserDevice,
} from "../services/user.service";
import { ApiError } from "../utils/exceptions";

import type {
  CursorPaginationInput,
  RegisterAndConnectDeviceInput,
  UnregisterAndDisconnectDeviceInput,
  DeleteAndDisconnectFeedsInput,
  RangeInput,
  LimitInput,
} from "../../utils/validation/types";

export const registerDeviceHandler = async ({
  id,
  code,
}: RegisterAndConnectDeviceInput) => {
  const token = await register(code);
  const device = await registerUserDevice({ token, id });

  return {
    status: "Success",
    message: `Successfully registered your device!`,
    device,
  };
};

export const unregisterDeviceHandler = async ({
  id,
}: UnregisterAndDisconnectDeviceInput) => {
  const device = await unregisterUserDevice({ id });

  return {
    status: "Success",
    message: `Successfully unregistered your device!`,
    device,
  };
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

export const deleteUserFeedsHandler = async ({
  id: userId,
  in: ids,
}: DeleteAndDisconnectFeedsInput) => {
  for (const id of ids) {
    const { data, error, status } = await getFeedById({ id });

    if (error) {
      throw new ApiError(status, error.message);
    }

    if (!data) {
      throw new ApiError(
        HTTP_STATUS_CODE.NOT_FOUND,
        `Feed with id ${id} not found!`,
      );
    }

    if (data.users.length > 1) {
      await deleteUserFeed({ id, userId });
    } else {
      await deleteFeed({ id });
    }
  }

  return {
    status: "Success",
    message: `Successfully deleted ${ids.length} feed${
      ids.length > 1 ? "s" : ""
    }!`,
  };
};

export const getUserDeviceHandler = async ({ id }: { id: string }) => {
  const { data } = await getUserDevice({ id });

  return data;
};

export const getUserSyncsHandler = async (
  input: RangeInput & { id: string },
) => {
  const { data, error, status } = await getUserSyncs(input);

  if (error) {
    throw new ApiError(status, error.message);
  }

  return data;
};

export const getUserArticlesHandler = async (
  input: LimitInput & { id: string },
) => {
  const { data, error, status } = await getUserArticles(input);

  if (error) {
    throw new ApiError(status, error.message);
  }

  return data;
};
