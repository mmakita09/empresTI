"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export function LoginForm() {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const supabase = createSupabaseBrowserClient();
    if (!supabase) {
      setMessage("Autenticação indisponível: configure as variáveis públicas do Supabase.");
      return;
    }
    setPending(true);
    setMessage(null);
    const { error } = await supabase.auth.signInWithPassword({ email: String(form.get("email")), password: String(form.get("password")) });
    setPending(false);
    if (error) {
      setMessage("Não foi possível entrar com esses dados.");
      return;
    }
    router.push("/catalogo");
    router.refresh();
  }

  return (
    <form className="login-form" onSubmit={submit} aria-describedby="login-note">
      <label htmlFor="email">E-mail corporativo</label>
      <input id="email" name="email" type="email" autoComplete="email" placeholder="nome@empresa.com" required />
      <label htmlFor="password">Senha</label>
      <input id="password" name="password" type="password" autoComplete="current-password" placeholder="Digite sua senha" required />
      <button type="submit" disabled={pending}>{pending ? "Entrando…" : "Entrar"}</button>
      <p className="login-note" id="login-note">{message ?? "Use uma conta convidada pelo administrador."}</p>
    </form>
  );
}
