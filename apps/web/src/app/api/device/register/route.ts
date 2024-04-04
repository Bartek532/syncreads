import { DeviceType } from "@syncreads/database";
import { type NextRequest } from "next/server";
import { register } from "rmapi-js";
import { ZodError } from "zod";

import { registerDeviceRemarkableSchema } from "@/utils";

export const runtime = "edge";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const param = searchParams.get("code");

  try {
    const data = registerDeviceRemarkableSchema.parse({
      code: param,
      type: DeviceType.REMARKABLE,
    });

    const token = await register(data.code);

    return new Response(token, { status: 200 });
  } catch (err) {
    if (err instanceof ZodError) {
      return new Response(err.errors[0]?.message, { status: 400 });
    }

    if (err instanceof Error) {
      return new Response(err.message, { status: 500 });
    }

    return new Response("An unknown error occurred", { status: 500 });
  }
};
