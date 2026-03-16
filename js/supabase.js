const SUPABASE_URL = "https://utwjvkooifuitpttrglw.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_cOaIZv2uOu16ix7YJx3T_A_BXI-Vdb5";

const sb = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

async function getCurrentUser() {
  const { data, error } = await sb.auth.getUser();
  if (error) throw error;
  return data.user;
}

async function getMyProfile() {
  const user = await getCurrentUser();

  if (!user) return null;

  const { data, error } = await sb
    .from("employees")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) throw error;

  return data;
}

async function logoutUser() {
  const { error } = await sb.auth.signOut();

  if (error) throw error;

  location.href = "login.html";
}
