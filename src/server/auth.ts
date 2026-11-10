import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { env } from "@/env";
import { prisma } from "@/server/db";

async function ensureBootstrapAdmin(userId: string) {
  if (!env.BOOTSTRAP_ADMIN_AUTH_USER_ID || env.BOOTSTRAP_ADMIN_AUTH_USER_ID !== userId) return;
  try {
    const tenant = await prisma.tenant.findUnique({ where: { slug: "suporte_ti" } });
    if (!tenant) return;
    await prisma.membership.upsert({
      where: { tenantId_authUserId: { tenantId: tenant.id, authUserId: userId } },
      update: { role: "ADMIN" },
      create: { tenantId: tenant.id, authUserId: userId, role: "ADMIN" },
    });
  } catch {
    // A autenticação continua válida; o acesso ao tenant será negado até o banco voltar.
  }
}

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
  if (!data.user?.id) return null;
  await ensureBootstrapAdmin(data.user.id);
  return data.user.id;
}
