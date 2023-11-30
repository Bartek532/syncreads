import { supabase } from "../../utils/supabase/server";

export default async function Register() {
  const email = "bartzagr@gmail.com";
  const password = "12345678";
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log(data);

  if (error) {
    throw error;
  }

  return <h1>Register</h1>;
}
