import Link from "next/link";
import { Button } from "../_components/ui/button";
import { Input } from "../_components/ui/input";

export default function Login() {
  return (
    <div className="bg-background flex min-h-screen">
      <div className="bg-primary relative hidden overflow-hidden lg:flex lg:w-1/2">
        <div className="from-primary to-primary/80 absolute inset-0 bg-gradient-to-br"></div>
        <div className="bg-primary-htmlForeground/10 transhtmlForm absolute top-0 right-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"></div>
        <div className="bg-primary-htmlForeground/10 transhtmlForm absolute bottom-0 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col justify-center px-16">
          <Link className="mb-12 flex items-center gap-3" href="/">
            <div className="bg-primary-htmlForeground flex h-12 w-12 items-center justify-center rounded-xl">
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
                className="lucide lucide-graduation-cap text-primary h-7 w-7"
              >
                <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
                <path d="M22 10v6"></path>
                <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
              </svg>
            </div>
            <span className="text-primary-htmlForeground text-2xl font-bold">
              UNIENF
            </span>
          </Link>
          <h1 className="text-primary-htmlForeground mb-4 text-4xl font-bold">
            Bem-vindo de volta!
          </h1>
          <p className="text-primary-htmlForeground/80 max-w-md text-lg">
            Acesse sua conta para continuar sua jornada de aprendizado e fazer a
            diferença na área da saúde.
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center px-6 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <Link
            className="text-muted-htmlForeground hover:text-primary mb-8 inline-flex items-center gap-2 text-sm transition-colors"
            href="/"
          >
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
              className="lucide lucide-arrow-left h-4 w-4"
            >
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
            Voltar para o site
          </Link>
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-xl">
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
                className="lucide lucide-graduation-cap text-primary-htmlForeground h-6 w-6"
              >
                <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
                <path d="M22 10v6"></path>
                <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
              </svg>
            </div>
            <span className="text-htmlForeground text-xl font-bold">
              UNIENF
            </span>
          </div>
          <div className="mb-8">
            <h2 className="text-htmlForeground mb-2 text-2xl font-bold">
              Login Sistema
            </h2>
            <p className="text-muted-htmlForeground">
              Digite suas credenciais para acessar o sistema
            </p>
          </div>
          <form className="space-y-5">
            <div className="space-y-2">
              <label
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="email"
              >
                E-mail
              </label>
              <div className="relative">
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
                  className="lucide lucide-mail text-muted-htmlForeground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <Input
                  type="email"
                  className="border-input bg-background ring-offset-background file:text-htmlForeground placeholder:text-muted-htmlForeground focus-visible:ring-ring flex h-12 w-full rounded-md border px-3 py-2 pl-11 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="email"
                  placeholder="seu@email.com"
                  value=""
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="password"
                >
                  Senha
                </label>
                <a href="#" className="text-primary text-sm hover:underline">
                  Esqueceu a senha?
                </a>
              </div>
              <div className="relative">
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
                  className="lucide lucide-lock text-muted-htmlForeground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2"
                >
                  <rect
                    width="18"
                    height="11"
                    x="3"
                    y="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <Input
                  type="password"
                  className="border-input bg-background ring-offset-background file:text-htmlForeground placeholder:text-muted-htmlForeground focus-visible:ring-ring flex h-12 w-full rounded-md border px-3 py-2 pl-11 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="password"
                  placeholder="••••••••"
                  value=""
                />
              </div>
            </div>
            <Button
              className="ring-offset-background focus-visible:ring-ring [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-htmlForeground hover:bg-primary/90 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-base font-medium whitespace-nowrap shadow-sm transition-all duration-200 hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
              type="submit"
            >
              Entrar
            </Button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-muted-htmlForeground text-sm">
              Precisa de ajuda?
              <Link href="#" className="text-primary hover:underline">
                Entre em contato
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
