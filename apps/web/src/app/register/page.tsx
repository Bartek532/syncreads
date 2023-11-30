import { supabase } from "../../utils/supabase/server";

export default async function Register() {
  const email = "bartzagr@gmail.com";
  const password = "12345678";
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return <h1>Register</h1>;
}
