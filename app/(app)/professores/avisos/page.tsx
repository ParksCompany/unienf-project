import { getUserProfile } from "@/app/_lib/actions/profile";
import TeacherNoticesView from "@/app/_components/professor/avisos/TeacherNoticesView";
import {
  listNoticesForTeacher,
  listTeacherClassesForPicker,
  listStudentsForPicker,
} from "@/app/_lib/actions/notices";

export default async function ProfessorAvisosPage() {
  const profile = await getUserProfile();

  if (!profile) {
    return <div className="p-6">Sessão inválida. Faça login novamente.</div>;
  }

  if (profile.role !== "professor") {
    return (
      <div className="p-6">
        Sem acesso. Esta página é exclusiva do professor.
      </div>
    );
  }

  // TODO SUPABASE: buscar avisos visíveis ao professor (autor=professor OU autor=coordenação/admin)
  const notices = await listNoticesForTeacher(profile.user_id);

  // TODO SUPABASE: buscar turmas que o professor pode selecionar (criadas/vinculadas)
  const classes = await listTeacherClassesForPicker(profile.user_id);

  // TODO SUPABASE: buscar alunos (para seleção manual) – pode ser perfis role=aluno
  const students = await listStudentsForPicker();

  return (
    <div className="flex flex-col">
      <TeacherNoticesView
        teacherId={profile.user_id}
        teacherName={profile.name ?? profile.email ?? "Professor"}
        notices={notices}
        classes={classes}
        students={students}
      />
    </div>
  );
}
