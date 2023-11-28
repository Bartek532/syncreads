import { createClient } from "@supabase/supabase-js";

import type { Database } from "./types/database.types";

const supabaseUrl = "http://127.0.0.1:54321";
const supabaseKey = process.env.SUPABASE_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey ?? "");
export * from "./types/database.types";
