import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { env } from "@/env";

export async function getAuthenticatedUserId(): Promise<string | null> {
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return null;
  const cookieStore = await cookies();
  const supabase = createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (values) => {
        try {
          values.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Route handlers without a writable cookie context still can read the session.
        }
      },
    },
  });
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}
