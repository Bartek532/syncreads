import type { SupabaseProviderFactory } from "../../supabase/supabase.provider";

export class UserService {
  constructor(private readonly supabase: SupabaseProviderFactory) {}

  getUserById(id: string) {
    return this.supabase().auth.admin.getUserById(id);
  }
}
