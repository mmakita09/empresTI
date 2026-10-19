import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";

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

        <form className="login-form" aria-describedby="login-note">
          <label htmlFor="email">E-mail corporativo</label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="nome@empresa.com" />

          <label htmlFor="password">Senha</label>
          <input id="password" name="password" type="password" autoComplete="current-password" placeholder="Digite sua senha" />

          <button type="button" disabled title="O primeiro acesso ainda precisa ser definido">Entrar</button>
          <p className="login-note" id="login-note">A autenticação será conectada depois que o processo de primeiro acesso for definido.</p>
        </form>

        <Link className="back-link" href="/">← Voltar para a página inicial</Link>
      </section>
    </main>
  );
}
