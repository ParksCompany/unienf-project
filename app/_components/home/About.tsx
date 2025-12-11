export default function About() {
  return (
    <section id="sobre" className="bg-muted/30 py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="animate-slide-up mx-auto mb-16 max-w-3xl text-center">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Sobre nós
          </span>
          <h2 className="text-foreground mt-3 mb-6 text-3xl font-bold md:text-4xl">
            Por que escolher a UNIENF?
          </h2>
          <p className="text-muted-foreground text-lg">
            Há mais de 15 anos formando profissionais de enfermagem qualificados
            e comprometidos com o cuidado humanizado. Nossa missão é transformar
            vidas através da educação de excelência.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-card border-border/50 shadow-soft hover-lift animate-scale-in rounded-2xl border p-6">
            <div className="bg-primary/10 mb-5 flex h-14 w-14 items-center justify-center rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-flask-conical text-primary h-7 w-7"
              >
                <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"></path>
                <path d="M8.5 2h7"></path>
                <path d="M7 16h10"></path>
              </svg>
            </div>
            <h3 className="text-foreground mb-3 text-lg font-semibold">
              Laboratórios Modernos
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Infraestrutura completa com equipamentos de última geração para
              prática supervisionada.
            </p>
          </div>
          <div className="bg-card border-border/50 shadow-soft hover-lift animate-scale-in rounded-2xl border p-6">
            <div className="bg-primary/10 mb-5 flex h-14 w-14 items-center justify-center rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-book-open text-primary h-7 w-7"
              >
                <path d="M12 7v14"></path>
                <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
              </svg>
            </div>
            <h3 className="text-foreground mb-3 text-lg font-semibold">
              Professores Experientes
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Corpo docente formado por profissionais atuantes no mercado com
              ampla experiência.
            </p>
          </div>
          <div className="bg-card border-border/50 shadow-soft hover-lift animate-scale-in rounded-2xl border p-6">
            <div className="bg-primary/10 mb-5 flex h-14 w-14 items-center justify-center rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-trophy text-primary h-7 w-7"
              >
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                <path d="M4 22h16"></path>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
              </svg>
            </div>
            <h3 className="text-foreground mb-3 text-lg font-semibold">
              Alta Taxa de Aprovação
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Mais de 98% dos nossos alunos são aprovados em processos seletivos
              da área.
            </p>
          </div>
          <div className="bg-card border-border/50 shadow-soft hover-lift animate-scale-in rounded-2xl border p-6">
            <div className="bg-primary/10 mb-5 flex h-14 w-14 items-center justify-center rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-users text-primary h-7 w-7"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="text-foreground mb-3 text-lg font-semibold">
              Estágio Garantido
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Parcerias com hospitais e clínicas para garantir experiência
              prática aos alunos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
