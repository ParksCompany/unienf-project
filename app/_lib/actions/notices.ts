"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/app/_lib/supabase/server";
import { getUserProfile } from "@/app/_lib/actions/profile";

type PickerItem = { id: string; label: string };

export type NoticeRow = {
  id: string;
  title: string;
  message: string;
  created_at: string; // ISO
  author_role: "professor" | "coordenação" | "administrativo";
  author_name: string;
  audience:
    | { type: "turma"; classId: string; classLabel: string }
    | { type: "alunos"; studentCount: number };
};

export async function listNoticesForTeacher(teacherId: string) {
  const profile = await getUserProfile();
  if (!profile) throw new Error("Sessão inválida.");
  if (profile.role !== "professor") throw new Error("Sem permissão.");
  if (profile.user_id !== teacherId) throw new Error("Acesso inválido.");

  const supabase = await createServerSupabaseClient();

  // TODO SUPABASE:
  // Modelagem recomendada:
  // - tabela "aviso" com: id, title, message, author_id, author_role, created_at, scope_type('turma'|'alunos'), class_id (nullable)
  // - tabela "aviso_aluno" com: aviso_id, student_id (para quando for seleção manual)
  // - Para "avisos visíveis ao professor": mostrar
  //   a) avisos do próprio professor (author_id = teacherId)
  //   b) avisos de coordenação e administrativo (author_role in ('coordenação','administrativo')) com escopo que inclua turmas onde o professor atua
  //
  // Exemplo simplificado (placeholder) para evitar travar:
  // const { data, error } = await supabase
  //   .from("aviso")
  //   .select("id, title, message, created_at, author_role, author_id");
  // if (error) throw new Error(error.message);
  // return data ?? [];

  return [];
}

export async function listTeacherClassesForPicker(
  teacherId: string,
): Promise<PickerItem[]> {
  const profile = await getUserProfile();
  if (!profile) throw new Error("Sessão inválida.");
  if (profile.role !== "professor") throw new Error("Sem permissão.");
  if (profile.user_id !== teacherId) throw new Error("Acesso inválido.");

  const supabase = await createServerSupabaseClient();

  // TODO SUPABASE:
  // Buscar turmas onde o professor está vinculado (criadas ou vinculadas)
  // - tabela: turma (id, name, tag)
  // - filtro: created_by = teacherId OR join em turma_professor
  // const { data, error } = await supabase
  //   .from("turma")
  //   .select("id, name, tag")
  //   .or(`created_by.eq.${teacherId}`);
  // if (error) throw new Error(error.message);
  // return (data ?? []).map(t => ({ id: t.id, label: `${t.name} (${t.tag})` }));

  return [];
}

export async function listStudentsForPicker(): Promise<PickerItem[]> {
  const supabase = await createServerSupabaseClient();

  // TODO SUPABASE:
  // Listar perfis com role = 'aluno'
  // const { data, error } = await supabase
  //   .from("profiles")
  //   .select("user_id, name, email")
  //   .eq("role", "aluno")
  //   .order("name");
  // if (error) throw new Error(error.message);
  // return (data ?? []).map(p => ({ id: p.user_id, label: p.name ?? p.email ?? p.user_id }));

  return [];
}

export async function createNotice(input: {
  teacherId: string;
  title: string;
  message: string;
  target:
    | { type: "turma"; classId: string }
    | { type: "alunos"; studentIds: string[] };
}) {
  const profile = await getUserProfile();
  if (!profile) throw new Error("Sessão inválida.");
  if (profile.role !== "professor") throw new Error("Sem permissão.");
  if (profile.user_id !== input.teacherId) throw new Error("Acesso inválido.");

  const supabase = await createServerSupabaseClient();

  // TODO SUPABASE:
  // 1) Inserir em "aviso"
  // const { data: aviso, error: avisoError } = await supabase
  //   .from("aviso")
  //   .insert({
  //     title: input.title,
  //     message: input.message,
  //     author_id: input.teacherId,
  //     author_role: "professor",
  //     scope_type: input.target.type,
  //     class_id: input.target.type === "turma" ? input.target.classId : null,
  //   })
  //   .select("id")
  //   .single();
  // if (avisoError) throw new Error(avisoError.message);

  // 2) Se for seleção manual, inserir em "aviso_aluno"
  // if (input.target.type === "alunos") {
  //   const rows = input.target.studentIds.map((studentId) => ({
  //     aviso_id: aviso.id,
  //     student_id: studentId,
  //   }));
  //   const { error } = await supabase.from("aviso_aluno").insert(rows);
  //   if (error) throw new Error(error.message);
  // }

  // 3) Se você também for disparar e-mail real:
  // TODO SUPABASE/EMAIL:
  // - Criar fila de envio: "aviso_outbox" e um worker (Edge Function) para enviar emails
  // - Evitar enviar email direto na action (pode travar UX)

  revalidatePath("/professores/avisos");
}
