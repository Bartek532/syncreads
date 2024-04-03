import { z } from "zod";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;

export const registerUserSchema = z.object({
  name: z.string({ required_error: "This field is required." }),
  email: z
    .string({ required_error: "This field is required." })
    .email("Email must be a valid email."),
  password: z
    .string({ required_error: "This field is required." })
    .regex(
      PASSWORD_REGEX,
      "Password must contain an uppercase letter, a special character, a number and must be at least 8 characters long.",
    ),
});

export const loginUserSchema = z.object({
  email: z
    .string({ required_error: "This field is required." })
    .email("Email must be a valid email."),
  password: z
    .string({ required_error: "This field is required." })
    .regex(
      PASSWORD_REGEX,
      "Password must contain an uppercase letter, a special character, a number and must be at least 8 characters long.",
    ),
});

export type LoginData = z.infer<typeof loginUserSchema>;
export type RegisterData = z.infer<typeof registerUserSchema>;

export const SOCIAL_PROVIDER = {
  GITHUB: "github",
  GOOGLE: "google",
} as const;

export type SOCIAL_PROVIDER =
  typeof SOCIAL_PROVIDER[keyof typeof SOCIAL_PROVIDER];

export const AUTH_PROVIDER = {
  ...SOCIAL_PROVIDER,
  PASSWORD: "password",
} as const;

export type AUTH_PROVIDER = typeof AUTH_PROVIDER[keyof typeof AUTH_PROVIDER];
