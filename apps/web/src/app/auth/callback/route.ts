import { NextResponse } from "next/server";

import { supabase } from "../../../lib/supabase/route";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  console.log("code", code);

  if (code) {
    const { error } = await supabase().auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // TODO: add error screen
  return NextResponse.redirect(`${origin}/auth/login`);
}
