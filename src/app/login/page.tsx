import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-panel" aria-labelledby="login-title">
        <div className="login-header">
          <Link className="login-brand" href="/" aria-label="EmpresTI, voltar ao início">
            <span className="brand-mark" aria-hidden="true">E</span>
            <span>EmpresTI</span>
          </Link>
          <ThemeToggle />
        </div>

        <div className="login-copy">
          <p className="kicker"><span aria-hidden="true" /> Acesso ao sistema</p>
          <h1 id="login-title">Entre para acompanhar seus equipamentos.</h1>
          <p>Consulte solicitações, empréstimos e devoluções em um só lugar.</p>
        </div>

        <LoginForm />

        <Link className="back-link" href="/">← Voltar para a página inicial</Link>
      </section>
    </main>
  );
}
