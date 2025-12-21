import { getUserProfile } from "@/app/_lib/actions/profile";
import TeacherClassesView from "@/app/_components/professor/turmas/TeacherClassesView";
import {
  listTeacherClasses,
  listStudentsForPicker,
  listSubjectsForPicker,
} from "@/app/_lib/actions/classes";

export default async function ProfessorTurmasPage() {
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

  // Turmas do professor cadastradas no supabase
  const classes = await listTeacherClasses(profile.user_id);

  // Disciplinas cadastradas no supabase
  const subjects = await listSubjectsForPicker();

  // Alunos cadastrados no supabase
  const students = await listStudentsForPicker();

  return (
    <div className="flex flex-col">
      <TeacherClassesView
        teacherId={profile.user_id}
        teacherName={profile.name ?? profile.email ?? "Professor"}
        classes={classes}
        subjects={subjects}
        students={students}
      />
    </div>
  );
}
