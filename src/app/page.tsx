const features = [
  { number: "01", title: "Consulte o catálogo", description: "Encontre os equipamentos internos e acompanhe a situação de cada item." },
  { number: "02", title: "Solicite um empréstimo", description: "Faça a solicitação de um item disponível em um único lugar." },
  { number: "03", title: "Acompanhe devoluções", description: "Veja seus empréstimos e registre a devolução quando o item voltar." },
];

export default function Home() {
  return (
    <main className="home-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="EmpresTI, início"><span className="brand-mark" aria-hidden="true">E</span><span>EmpresTI</span></a>
        <nav aria-label="Navegação principal"><a href="#como-funciona">Como funciona</a><a href="#recursos">Recursos</a></nav>
        <button className="login-button" type="button" disabled title="Login será disponibilizado em uma próxima tela">Entrar</button>
      </header>

      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="kicker"><span aria-hidden="true" /> Empréstimo de equipamentos</p>
          <h1 id="hero-title">O equipamento certo, no momento em que você precisa.</h1>
          <p className="hero-description">Um lugar simples para consultar, solicitar e devolver os equipamentos internos da empresa.</p>
          <div className="hero-actions">
            <button className="primary-action" type="button" disabled title="O catálogo será disponibilizado em uma próxima tela">Ver catálogo <span aria-hidden="true">→</span></button>
            <a className="text-action" href="#como-funciona">Entenda como funciona <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="orbit orbit-large" /><div className="orbit orbit-small" />
          <div className="equipment-card laptop-card"><div className="device laptop"><i /></div><span>Notebook</span></div>
          <div className="equipment-card camera-card"><div className="device camera" /><span>Câmera</span></div>
          <div className="equipment-card cable-card"><div className="device cable" /><span>Cabo</span></div>
          <div className="status-pill"><span /> Empréstimo organizado</div>
        </div>
      </section>

      <section className="process" id="como-funciona" aria-labelledby="process-title">
        <p className="section-label">COMO FUNCIONA</p><h2 id="process-title">Menos planilha. Mais clareza.</h2><p>O EmpresTI reúne o acompanhamento dos equipamentos em um só espaço.</p>
      </section>
      <section className="features" id="recursos" aria-label="Recursos previstos">
        {features.map((feature) => <article className="feature-card" key={feature.number}><span className="feature-number">{feature.number}</span><h3>{feature.title}</h3><p>{feature.description}</p></article>)}
      </section>
      <footer><span>EmpresTI</span><span>Sistema interno de empréstimo de equipamentos</span></footer>
    </main>
  );
}
