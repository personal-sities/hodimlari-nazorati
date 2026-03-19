const SUPABASE_URL = "";
const SUPABASE_ANON_KEY = "";

const sb = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

async function getCurrentUser(){
  const { data, error } = await sb.auth.getUser();
  if(error) throw error;
  return data.user;
}

async function getMyProfile(){
  const user = await getCurrentUser();
  if(!user) return null;

  const { data, error } = await sb
  .from("employees")
  .select("*")
  .eq("id", user.id)
  .single();

  if(error) throw error;

  return data;
}

async function logoutUser(){
  await sb.auth.signOut();
  location.href="login.html";
}
