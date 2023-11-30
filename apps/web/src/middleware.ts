// export { default } from "next-auth/middleware";

// export const config = { matcher: ["/dashboard/:path*"] };
import { type NextRequest } from "next/server";

import { createClient } from "./utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);

  await supabase.auth.getSession();

  return response;
}
