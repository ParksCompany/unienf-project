import { createServerSupabaseClient } from "@/app/_lib/supabase/server";

import FinanceiroAlunoView from "@/app/_components/finance/FinanceiroAlunoview";
import FinanceiroRecepcaoView from "@/app/_components/finance/FinanceiroRecepcaoView";
import FinanceiroAdminView from "@/app/_components/finance/FinanceiroAdminView";

export default async function FinanceiroPage() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex-1 p-6">Sessão inválida. Faça login novamente.</div>
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, role")
    .eq("user_id", user.id)
    .single();

  if (!profile) {
    return <div className="flex-1 p-6">Perfil não encontrado.</div>;
  }

  if (profile.role === "aluno") {
    return (
      <div className="flex-1 p-6">
        <FinanceiroAlunoView
          studentId={user.id}
          studentName={profile.name ?? user.email ?? "Aluno"}
        />
      </div>
    );
  }

  if (profile.role === "recepção") {
    return (
      <div className="flex-1 p-6">
        <FinanceiroRecepcaoView />
      </div>
    );
  }

  if (profile.role === "administrativo") {
    return (
      <div className="flex-1 p-6">
        <FinanceiroAdminView />
      </div>
    );
  }

  // professor e coordenação não acessam o financeiro (conforme seu escopo atual)
  return <div className="flex-1 p-6">Sem acesso ao Financeiro.</div>;
}
