import FinanceiroAlunoView from "@/app/_components/finance/FinanceiroAlunoview";
import { createServerSupabaseClient } from "@/app/_lib/supabase/server";

export default async function Financeiro() {
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

  if (!profile || profile.role !== "aluno") {
    return <div className="flex-1 p-6">Sem acesso ao Financeiro do aluno.</div>;
  }

  return (
    <div className="flex-1 p-6">
      <FinanceiroAlunoView
        studentId={user.id}
        studentName={profile.name ?? user.email ?? "Aluno"}
      />
    </div>
  );
}
