"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/app/_lib/supabase/server";
import { getUserProfile } from "@/app/_lib/actions/profile";

type PickerItem = { id: string; label: string };

type ClassRow = {
  id: string;
  name: string;
  tag: string;
  start_date: string;
  end_date: string;
  status: "ativa" | "finalizada";
};

export async function listTeacherClasses(
  teacherId: string,
): Promise<ClassRow[]> {
  const profile = await getUserProfile();
  if (!profile) throw new Error("Sessão inválida.");
  if (profile.role !== "professor") throw new Error("Sem permissão.");
  if (profile.user_id !== teacherId) throw new Error("Acesso inválido.");

  const supabase = await createServerSupabaseClient();

  // TODO SUPABASE:
  // Você precisa decidir seu modelagem. Recomendo:
  // - tabela "turma" com: id, name, tag, start_date, end_date, status, created_by
  // - tabela "turma_professor" (vinculo) com: turma_id, professor_id
  //
  // Regra: professor vê turmas onde (created_by = teacherId) OR (existe vinculo em turma_professor).

  // Exemplo de retorno placeholder, até você plugar o select real:
  // const { data, error } = await supabase
  //   .from("turma")
  //   .select("id, name, tag, start_date, end_date, status")
  //   .or(`created_by.eq.${teacherId},id.in.(select turma_id from turma_professor where professor_id = '${teacherId}')`);
  // if (error) throw new Error(error.message);
  // return (data ?? []) as ClassRow[];

  return [];
}

export async function listSubjectsForPicker(): Promise<PickerItem[]> {
  const supabase = await createServerSupabaseClient();

  // TODO SUPABASE:
  // Tabela sugerida: "disciplina" com: id, name (ou title)
  // const { data, error } = await supabase
  //   .from("disciplina")
  //   .select("id, name")
  //   .order("name");
  // if (error) throw new Error(error.message);
  // return (data ?? []).map(d => ({ id: d.id, label: d.name }));

  return [];
}

export async function listStudentsForPicker(): Promise<PickerItem[]> {
  const supabase = await createServerSupabaseClient();

  // TODO SUPABASE:
  // Você pode listar a partir de "profiles" filtrando role = 'aluno'
  // const { data, error } = await supabase
  //   .from("profiles")
  //   .select("user_id, name, email")
  //   .eq("role", "aluno")
  //   .order("name");
  // if (error) throw new Error(error.message);
  // return (data ?? []).map(p => ({
  //   id: p.user_id,
  //   label: p.name ?? p.email ?? p.user_id
  // }));

  return [];
}

export async function createClass(input: {
  teacherId: string;
  name: string;
  tag: string;
  startDate: string;
  endDate: string;
  subjectIds: string[];
  studentIds: string[];
}) {
  const profile = await getUserProfile();
  if (!profile) throw new Error("Sessão inválida.");
  if (profile.role !== "professor") throw new Error("Sem permissão.");
  if (profile.user_id !== input.teacherId) throw new Error("Acesso inválido.");

  const supabase = await createServerSupabaseClient();

  // TODO SUPABASE:
  // 1) Inserir turma na tabela "turma"
  // const { data: turma, error: turmaError } = await supabase
  //   .from("turma")
  //   .insert({
  //     name: input.name,
  //     tag: input.tag,
  //     start_date: input.startDate,
  //     end_date: input.endDate,
  //     status: "ativa",
  //     created_by: input.teacherId,
  //   })
  //   .select("id")
  //   .single();
  // if (turmaError) throw new Error(turmaError.message);

  // 2) Vincular professor à turma (se você usar tabela de vínculo)
  // await supabase.from("turma_professor").insert({ turma_id: turma.id, professor_id: input.teacherId });

  // 3) Vincular disciplinas (tabela "turma_disciplina": turma_id, disciplina_id)
  // await supabase.from("turma_disciplina").insert(input.subjectIds.map(id => ({ turma_id: turma.id, disciplina_id: id })));

  // 4) Vincular alunos (tabela "turma_aluno": turma_id, aluno_id)
  // await supabase.from("turma_aluno").insert(input.studentIds.map(id => ({ turma_id: turma.id, aluno_id: id })));

  revalidatePath("/professores/turmas");
}

export async function finalizeClass(input: {
  classId: string;
  teacherId: string;
}) {
  const profile = await getUserProfile();
  if (!profile) throw new Error("Sessão inválida.");
  if (profile.role !== "professor") throw new Error("Sem permissão.");
  if (profile.user_id !== input.teacherId) throw new Error("Acesso inválido.");

  const supabase = await createServerSupabaseClient();

  // TODO SUPABASE:
  // 1) Marcar turma como finalizada na tabela "turma"
  // const { error } = await supabase
  //   .from("turma")
  //   .update({ status: "finalizada", finalized_at: new Date().toISOString() })
  //   .eq("id", input.classId);
  // if (error) throw new Error(error.message);

  // TODO SUPABASE:
  // 2) Gerar "relatório" persistido (opcional):
  // - tabela "relatorio_turma" com snapshot da ementa, alunos, datas, disciplinas
  // ou gerar sob demanda em uma rota /admin/relatorios/turmas/[id]

  revalidatePath("/professores/turmas");
}
