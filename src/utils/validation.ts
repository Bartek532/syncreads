import { z } from "zod";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;

export const newUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(PASSWORD_REGEX),
  deviceToken: z.string(),
});
