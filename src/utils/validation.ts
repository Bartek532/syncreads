import type { TypeOf } from "zod";
import { z } from "zod";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;

export const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(PASSWORD_REGEX),
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(PASSWORD_REGEX),
});

export const createFeedSchema = z.object({
  url: z.string().url(),
});

export const createAndConnectFeedSchema = z.object({
  url: z.string().url(),
  email: z.string().email(),
});

export const params = z.object({
  id: z.number(),
});

export type RegisterUserInput = TypeOf<typeof registerUserSchema>;
export type LoginUserInput = TypeOf<typeof loginUserSchema>;
export type CreateFeedInput = TypeOf<typeof createFeedSchema>;
export type CreateAndConnectFeedInput = TypeOf<
  typeof createAndConnectFeedSchema
>;
export type ParamsInput = TypeOf<typeof params>;
