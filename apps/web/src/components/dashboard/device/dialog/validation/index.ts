import { z } from "zod";

const registerRouteFailedResponse = z.object({
  message: z.string(),
});

const registerRouteSuccessResponse = z.object({
  token: z.string(),
});

type RegisterRouteFailedResponse = z.infer<typeof registerRouteFailedResponse>;
type RegisterRouteSuccessResponse = z.infer<
  typeof registerRouteSuccessResponse
>;

export const isRegisterRouteFailedResponse = (
  value: unknown,
): value is RegisterRouteFailedResponse => {
  return registerRouteFailedResponse.safeParse(value).success;
};

export const isRegisterRouteSuccessResponse = (
  value: unknown,
): value is RegisterRouteSuccessResponse => {
  return registerRouteSuccessResponse.safeParse(value).success;
};
