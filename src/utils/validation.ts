import { z } from "zod";

import type { TypeOf } from "zod";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;

export const registerUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8).regex(PASSWORD_REGEX),
});

export const loginUserSchema = z.object({
  email: z.string().email("Email must be a valid email."),
  password: z
    .string()
    .regex(
      PASSWORD_REGEX,
      "Password must contain an uppercase letter, a special character, a number and must be at least 8 characters long.",
    ),
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
