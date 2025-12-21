# Documentação do Sistema UNIENF

## Índice

1. [Visão Geral](#visão-geral)
2. [Objetivo do Sistema](#objetivo-do-sistema)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Arquitetura](#arquitetura)
5. [Sistema de Autenticação e Autorização](#sistema-de-autenticação-e-autorização)
6. [Perfis de Usuário](#perfis-de-usuário)
7. [Funcionalidades por Perfil](#funcionalidades-por-perfil)
8. [Regras de Negócio](#regras-de-negócio)
9. [Estrutura de Dados](#estrutura-de-dados)
10. [Fluxos Principais](#fluxos-principais)

---

## Visão Geral

O **UNIENF** é um sistema de gestão acadêmica desenvolvido para uma instituição de ensino superior focada em cursos de enfermagem (Técnico em Enfermagem, Auxiliar de Enfermagem e Especialização em Urgência). O sistema permite a gestão completa do ciclo acadêmico, desde o cadastro de alunos até o controle financeiro e emissão de documentos.

## Objetivo do Sistema

O sistema UNIENF foi desenvolvido para:

- **Centralizar a gestão acadêmica** de uma instituição de ensino de enfermagem
- **Facilitar o acompanhamento** do desempenho acadêmico dos alunos
- **Automatizar processos** de controle financeiro (mensalidades)
- **Gerenciar documentação** acadêmica de forma digital
- **Melhorar a comunicação** entre instituição, professores e alunos através de avisos
- **Otimizar operações** administrativas e de recepção
- **Fornecer dashboards** e métricas para tomada de decisão

## Tecnologias Utilizadas

### Frontend

- **Next.js 16** - Framework React com App Router
- **React 19** - Biblioteca de interface
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização
- **Radix UI** - Componentes acessíveis (Dialog, Select, Dropdown, etc.)
- **Shadcn/ui** - Componentes de UI
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Lucide React** - Ícones

### Backend/Infraestrutura

- **Supabase** - Backend as a Service (BaaS)
  - Autenticação (Auth)
  - Banco de dados PostgreSQL
  - Row Level Security (RLS)
- **Next.js Server Actions** - Server-side actions

### Ferramentas

- **ESLint** - Linting
- **Prettier** - Formatação de código
- **Lint-staged** - Git hooks

---

## Arquitetura

O projeto segue a arquitetura do Next.js App Router:

```
app/
├── (app)/              # Rotas protegidas (requerem autenticação)
│   ├── admin/          # Área administrativa
│   ├── aluno/          # Área do aluno
│   ├── professores/    # Área do professor
│   └── recepcao/       # Área de recepção
├── _components/        # Componentes reutilizáveis
├── _lib/              # Utilitários e actions
│   ├── actions/       # Server Actions
│   ├── supabase/      # Clientes Supabase
│   └── mockdata/      # Dados mock (desenvolvimento)
├── login/             # Página de login
├── signup/            # Página de cadastro
└── page.tsx           # Página inicial (pública)
```

---

## Sistema de Autenticação e Autorização

### Autenticação

O sistema utiliza **Supabase Auth** para autenticação:

1. **Registro de Usuários**:
   - Formulário de cadastro em `/signup`
   - Validação de senha (mínimo 6 caracteres, 1 maiúscula, 1 número)
   - Criação de conta com email e senha
   - Verificação de email obrigatória

2. **Login**:
   - Formulário em `/login`
   - Validação de credenciais via Supabase
   - Redirecionamento automático baseado no perfil do usuário

3. **Middleware de Proteção**:
   - Verifica autenticação em todas as rotas protegidas
   - Redireciona usuários não autenticados para `/login`
   - Rotas públicas: `/`, `/login`, `/signup`, `/auth`, `/verify-email`

### Autorização por Roles

O sistema implementa um modelo de **Role-Based Access Control (RBAC)** com os seguintes perfis:

1. **Aluno** (`aluno`)
2. **Professor** (`professor`)
3. **Recepção** (`recepção`)
4. **Administrativo** (`administrativo`)
5. **Coordenação** (`coordenação`)

Cada perfil possui permissões específicas e acessa apenas as funcionalidades permitidas.

---

## Perfis de Usuário

### 1. Aluno (`aluno`)

**Permissões:**

- Visualizar próprio perfil e dados acadêmicos
- Acessar documentos próprios (somente leitura)
- Visualizar notas
- Consultar situação financeira (mensalidades)
- Visualizar avisos direcionados

**Área de Acesso:** `/aluno`

**Menu de Navegação:**

- Visão Geral (Dashboard)
- Meus Documentos
- Minhas Notas
- Financeiro
- Avisos

### 2. Professor (`professor`)

**Permissões:**

- Gerenciar turmas próprias
- Criar e editar turmas
- Lançar notas dos alunos
- Criar avisos para turmas ou alunos específicos
- Visualizar avisos da coordenação/administração

**Área de Acesso:** `/professores`

**Menu de Navegação:**

- Visão Geral (Dashboard)
- Minhas Turmas
- Lançar Notas
- Avisos

### 3. Recepção (`recepção`)

**Permissões:**

- Cadastrar novos alunos
- Editar perfis de alunos
- Gerenciar documentos de alunos (marcar como entregue, adicionar observações)
- Registrar pagamentos de mensalidades
- Visualizar avisos (somente leitura)

**Área de Acesso:** `/recepcao`

**Menu de Navegação:**

- Visão Geral (Dashboard)
- Documentos
- Financeiro
- Avisos

### 4. Administrativo (`administrativo`)

**Permissões:**

- Acesso completo ao sistema
- Gerenciar todos os alunos
- Gerenciar professores
- Gerenciar turmas
- Gerenciar cursos
- Acesso completo ao financeiro
- Criar avisos gerais ou específicos

**Área de Acesso:** `/admin`

**Menu de Navegação:**

- Visão Geral (Dashboard)
- Alunos
- Professores
- Turmas
- Cursos
- Financeiro
- Avisos

### 5. Coordenação (`coordenação`)

**Permissões:**

- Mesmas permissões do perfil Administrativo
- Foco em gestão acadêmica e pedagógica

**Área de Acesso:** `/admin`

**Menu de Navegação:**

- Visão Geral (Dashboard)
- Alunos
- Professores
- Turmas
- Cursos
- Financeiro
- Avisos

---

## Funcionalidades por Perfil

### Funcionalidades Gerais (Todos os Perfis)

#### 1. Dashboard (Visão Geral)

- **Aluno**: Estatísticas pessoais, últimas notas, documentos pendentes, avisos recentes
- **Professor**: Turmas ativas, total de alunos, notas pendentes, próximas aulas
- **Recepção**: KPIs (total de alunos, mensalidades pendentes/pagas), atalhos rápidos
- **Admin**: Métricas gerais da instituição, gráficos de matrículas, atividades recentes

#### 2. Sistema de Avisos

- **Visualização**: Todos os perfis podem visualizar avisos direcionados a eles
- **Criação**: Professores, Coordenação e Administrativo podem criar avisos
- **Escopo**:
  - Para turma específica
  - Para alunos específicos
  - Para todos os alunos
- **Filtros**: Por data, autor, público-alvo

---

### Funcionalidades do Aluno

#### 1. Meus Documentos (`/aluno/documentos`)

- Visualização do checklist de documentos obrigatórios
- Status de cada documento: `pending` (pendente) ou `delivered` (entregue)
- Progresso percentual de documentação completa
- Observações da recepção sobre documentos

**Documentos Gerenciados:**

- RG (Identidade)
- CPF
- Histórico Escolar
- Comprovante de Residência
- Certidão de Nascimento
- Foto 3x4
- Outros documentos conforme necessário

#### 2. Minhas Notas (`/aluno/notas`)

- Visualização de notas por disciplina
- Histórico de avaliações
- Média geral
- Detalhamento por turma/disciplina

#### 3. Financeiro (`/aluno/financeiro`)

- Listagem de mensalidades
- Status de pagamento (pendente/pago)
- Valor da mensalidade
- Data de vencimento
- Histórico de pagamentos
- Detalhes de cada pagamento (data, forma de pagamento, valor pago)

---

### Funcionalidades do Professor

#### 1. Minhas Turmas (`/professores/turmas`)

- Listagem de turmas vinculadas ao professor
- Criar nova turma
- Editar informações da turma
- Visualizar alunos da turma
- Finalizar turma (encerrar período)
- Vincular disciplinas à turma
- Vincular alunos à turma

**Informações da Turma:**

- Nome
- Tag/Identificador
- Data de início
- Data de término
- Status (ativa/finalizada)
- Disciplinas vinculadas
- Lista de alunos

#### 2. Lançar Notas (`/professores/notas`)

- Selecionar turma e disciplina
- Lançar notas para avaliações
- Editar notas já lançadas
- Visualizar histórico de lançamentos
- Calcular médias automaticamente

#### 3. Avisos (`/professores/avisos`)

- Criar avisos
- Selecionar público-alvo:
  - Turma específica
  - Alunos selecionados
- Visualizar avisos criados
- Visualizar avisos da coordenação/administração

---

### Funcionalidades da Recepção

#### 1. Alunos (`/recepcao/alunos`)

- Listagem de todos os alunos cadastrados
- Cadastro de novos alunos
- Edição de dados de alunos (nome, telefone)
- Visualização de perfil completo do aluno

**Dados do Aluno:**

- Nome completo
- Email
- Telefone
- Status acadêmico
- Turma atual

#### 2. Documentos (`/recepcao/documentos`)

- Acesso aos documentos de qualquer aluno
- Marcar documentos como entregues
- Adicionar observações sobre documentos
- Rejeitar documentos (com motivo)
- Visualizar progresso de documentação por aluno

#### 3. Financeiro (`/recepcao/financeiro`)

- Listagem de mensalidades (pendentes/pagas/todas)
- Filtrar por aluno específico
- Registrar pagamento de mensalidade:
  - Valor pago
  - Forma de pagamento (dinheiro, PIX, débito, crédito)
  - Data de pagamento
- Visualizar histórico de pagamentos
- Gerar recibo de pagamento (futuro)

---

### Funcionalidades Administrativas

#### 1. Gestão de Alunos (`/admin/alunos`)

- Listagem completa de alunos
- Filtros e busca avançada
- Visualização de perfil detalhado
- Edição de dados acadêmicos
- Histórico acadêmico completo
- Vinculação a turmas

#### 2. Gestão de Professores (`/admin/professores`)

- Listagem de professores
- Cadastro de novos professores
- Edição de dados
- Vinculação a turmas
- Histórico de turmas ministradas

#### 3. Gestão de Turmas (`/admin/turmas`)

- Listagem de todas as turmas (ativas e finalizadas)
- Criação de novas turmas
- Edição de turmas
- Finalização de turmas
- Relatórios de turmas
- Vincular/desvincular professores
- Vincular/desvincular alunos

#### 4. Gestão de Cursos (`/admin/cursos`)

- Gerenciar cursos oferecidos:
  - Técnico em Enfermagem (18 meses)
  - Auxiliar de Enfermagem (12 meses)
  - Especialização em Urgência (6 meses)
- Editar informações dos cursos
- Configurar ementas
- Definir módulos

#### 5. Financeiro (`/admin/financeiro`)

- Visão completa do financeiro da instituição
- Controle de mensalidades
- Relatórios financeiros:
  - Receitas por mês
  - Mensalidades pendentes
  - Formas de pagamento
  - Análise de inadimplência
- Gestão de custos internos (futuro)
- Dashboard com métricas financeiras

#### 6. Avisos (`/admin/avisos`)

- Criar avisos gerais ou específicos
- Gerenciar todos os avisos do sistema
- Editar/Excluir avisos
- Histórico de avisos enviados

---

## Regras de Negócio

### Autenticação e Segurança

1. **Senha**:
   - Mínimo de 6 caracteres
   - Deve conter pelo menos 1 letra maiúscula
   - Deve conter pelo menos 1 número

2. **Sessão**:
   - Sessões são gerenciadas pelo Supabase
   - Refresh automático de sessão via middleware
   - Redirecionamento automático após login baseado no role

3. **Rotas Protegidas**:
   - Todas as rotas em `(app)/` requerem autenticação
   - Usuários não autenticados são redirecionados para `/login`
   - Usuários autenticados tentando acessar `/login` ou `/signup` são redirecionados para sua área

### Documentos

1. **Status de Documentos**:
   - `pending`: Documento ainda não entregue
   - `delivered`: Documento entregue e aprovado

2. **Permissões de Edição**:
   - Alunos podem apenas **visualizar** seus documentos
   - Recepção, Coordenação e Administrativo podem **editar** documentos (marcar como entregue, adicionar observações)

3. **Documentos Obrigatórios**:
   - Sistema diferencia documentos obrigatórios (`required: true`) e opcionais
   - Progresso calculado apenas com base em documentos obrigatórios

### Financeiro

1. **Mensalidades**:
   - Cada mensalidade pertence a um aluno
   - Possui competência (ano e mês)
   - Status: `pendente` ou `pago`
   - Valor previsto (`valor_mensalidade`) e valor pago (`valor_pago`)

2. **Registro de Pagamento**:
   - Apenas Recepção e Administrativo podem registrar pagamentos
   - Campos obrigatórios:
     - Valor pago
     - Forma de pagamento (dinheiro, PIX, débito, crédito)
     - Data de pagamento (formato YYYY-MM-DD)
   - Validação: valor deve ser maior que zero
   - Proteção: mensalidades já pagas só podem ser editadas por Administrativo

3. **Visualização**:
   - Alunos veem apenas suas próprias mensalidades
   - Recepção e Administrativo veem todas as mensalidades
   - Filtros disponíveis: por status, por aluno, por competência

### Turmas

1. **Criação**:
   - Apenas Professores podem criar turmas
   - Campos obrigatórios:
     - Nome
     - Tag/Identificador
     - Data de início
     - Data de término
   - Professor pode vincular disciplinas e alunos na criação

2. **Status**:
   - `ativa`: Turma em andamento
   - `finalizada`: Turma concluída

3. **Finalização**:
   - Apenas o professor responsável pode finalizar a turma
   - Após finalização, turma não pode ser editada

### Avisos

1. **Criação**:
   - Professores, Coordenação e Administrativo podem criar avisos
   - Campos obrigatórios:
     - Título
     - Mensagem
     - Público-alvo (turma ou alunos específicos)

2. **Visibilidade**:
   - Alunos veem avisos direcionados a eles ou suas turmas
   - Professores veem avisos próprios e avisos da coordenação/administração
   - Recepção vê avisos apenas como leitura

### Notas

1. **Lançamento**:
   - Apenas Professores podem lançar notas
   - Notas são vinculadas a turma, disciplina e aluno
   - Validação de valores (geralmente 0-10)

2. **Visualização**:
   - Alunos veem apenas suas próprias notas
   - Professores veem notas de suas turmas
   - Administrativo/Coordenação veem todas as notas

---

## Estrutura de Dados

### Tabelas Principais (Supabase)

#### `profiles`

Armazena informações dos usuários do sistema.

```typescript
{
  user_id: string; // FK para auth.users
  name: string | null;
  email: string | null;
  telefone: string | null;
  avatar_url: string | null;
  role: string | null; // 'aluno', 'professor', 'recepção', 'administrativo', 'coordenação'
}
```

#### `turma`

Armazena informações das turmas.

```typescript
{
  id: string;
  name: string;
  tag: string;
  start_date: string; // ISO date
  end_date: string; // ISO date
  status: "ativa" | "finalizada";
  created_by: string; // FK para profiles.user_id
}
```

#### `mensalidade` ou `mensalidades`

Armazena informações de mensalidades dos alunos.

```typescript
{
  id: string;
  student_id: string; // FK para profiles.user_id
  competence_year: number;
  competence_month: number; // 1-12
  status: "pendente" | "pago";
  valor_mensalidade: number;
  valor_pago: number | null;
  forma_pagamento: "dinheiro" | "pix" | "debito" | "credito" | null;
  data_pagamento: string | null; // YYYY-MM-DD
  updated_at: string; // ISO datetime
}
```

#### `aviso`

Armazena avisos do sistema.

```typescript
{
  id: string;
  title: string;
  message: string;
  author_id: string; // FK para profiles.user_id
  author_role: string; // 'professor' | 'coordenação' | 'administrativo'
  created_at: string; // ISO datetime
  scope_type: "turma" | "alunos";
  class_id: string | null; // FK para turma.id (se scope_type = 'turma')
}
```

#### Tabelas de Relacionamento (sugeridas)

- `turma_professor`: Vincula professores a turmas
- `turma_aluno`: Vincula alunos a turmas
- `turma_disciplina`: Vincula disciplinas a turmas
- `aviso_aluno`: Vincula avisos a alunos específicos (quando scope_type = 'alunos')
- `nota`: Armazena notas dos alunos (turma, disciplina, aluno, valor, data)
- `documento`: Armazena informações sobre documentos dos alunos
- `documento_tipo`: Tipos de documentos (RG, CPF, etc.)

---

## Fluxos Principais

### 1. Fluxo de Cadastro e Primeiro Acesso

1. Usuário acessa `/signup`
2. Preenche formulário (nome, email, senha)
3. Sistema valida senha (mínimo 6 caracteres, 1 maiúscula, 1 número)
4. Conta é criada no Supabase Auth
5. Email de verificação é enviado
6. Usuário acessa `/verify-email` e verifica email
7. Após verificação, usuário faz login
8. Sistema identifica o role do usuário no perfil
9. Redireciona para área correspondente:
   - Aluno → `/aluno`
   - Professor → `/professores`
   - Recepção → `/recepcao`
   - Admin/Coordenação → `/admin`

### 2. Fluxo de Gestão de Documentos

**Visão Aluno:**

1. Aluno acessa `/aluno/documentos`
2. Visualiza lista de documentos obrigatórios
3. Vê status de cada documento (pendente/entregue)
4. Lê observações da recepção (se houver)

**Visão Recepção:**

1. Recepção acessa `/recepcao/documentos`
2. Seleciona aluno
3. Visualiza documentos do aluno
4. Marca documentos como entregues quando recebidos
5. Adiciona observações sobre documentos

### 3. Fluxo de Gestão Financeira

**Registro de Pagamento:**

1. Recepção acessa `/recepcao/financeiro`
2. Visualiza lista de mensalidades pendentes
3. Seleciona mensalidade a pagar
4. Preenche formulário:
   - Valor pago
   - Forma de pagamento
   - Data de pagamento
5. Sistema atualiza status para "pago"
6. Aluno recebe notificação (futuro)

**Consulta do Aluno:**

1. Aluno acessa `/aluno/financeiro`
2. Visualiza suas mensalidades
3. Vê status de cada uma (pendente/pago)
4. Acessa histórico de pagamentos

### 4. Fluxo de Criação de Turma

1. Professor acessa `/professores/turmas`
2. Clica em "Criar Nova Turma"
3. Preenche formulário:
   - Nome da turma
   - Tag/Identificador
   - Data de início
   - Data de término
   - Seleciona disciplinas
   - Seleciona alunos
4. Sistema cria turma no banco
5. Vincula professor, disciplinas e alunos
6. Turma aparece na lista do professor

### 5. Fluxo de Lançamento de Notas

1. Professor acessa `/professores/notas`
2. Seleciona turma e disciplina
3. Visualiza lista de alunos da turma
4. Para cada aluno, insere nota da avaliação
5. Sistema valida e salva notas
6. Alunos podem visualizar notas em `/aluno/notas`

### 6. Fluxo de Criação de Aviso

1. Professor/Admin acessa área de avisos
2. Clica em "Criar Aviso"
3. Preenche:
   - Título
   - Mensagem
   - Seleciona público-alvo (turma ou alunos específicos)
4. Sistema cria aviso e vincula ao público-alvo
5. Alunos/Professores visualizam aviso em suas áreas

---

## Páginas Públicas

### Página Inicial (`/`)

- Apresentação da instituição
- Informações sobre cursos
- Seção "Sobre"
- Localização
- Links para login e cadastro

**Cursos Apresentados:**

- Técnico em Enfermagem (18 meses, 12 módulos)
- Auxiliar de Enfermagem (12 meses, 8 módulos)
- Especialização em Urgência (6 meses, 6 módulos)

---

## Componentes Principais

### Componentes de UI (Shadcn/ui)

- `Button`, `Input`, `Label`, `Select`
- `Table`, `Dialog`, `Dropdown Menu`
- `Form`, `Checkbox`, `Textarea`
- `Sidebar`, `Sheet`, `Tooltip`
- `Avatar`, `Separator`, `Skeleton`

### Componentes de Negócio

- `ProtectedRoute`: Protege rotas que requerem autenticação
- `AppSidebar`: Sidebar dinâmica baseada no role do usuário
- `DocumentsView`: Visualização e gestão de documentos
- `DocumentCard`: Card individual de documento
- `FinanceiroAdminView`: Dashboard financeiro para admin
- `FinanceiroRecepcaoView`: Interface financeira para recepção
- `FinanceiroAlunoView`: Interface financeira para alunos
- `TeacherClassesView`: Gestão de turmas para professores
- `CreateClassModal`: Modal para criação de turma
- `TeacherNoticesView`: Gestão de avisos para professores

---

## Configuração e Variáveis de Ambiente

O sistema requer as seguintes variáveis de ambiente:

```env
NEXT_PUBLIC_SUPABASE_URL=url_do_seu_projeto_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=chave_anonima_do_supabase
```

---

## Observações Importantes

### Status de Implementação

Muitas funcionalidades estão com **placeholders** ou **dados mock**. O sistema está preparado para integração completa com Supabase, mas algumas queries ainda precisam ser implementadas. Os arquivos de actions (`app/_lib/actions/*.ts`) contêm comentários `TODO SUPABASE` indicando onde a integração deve ser feita.

### Melhorias Futuras Sugeridas

1. **Sistema de Upload de Arquivos**: Permitir que alunos façam upload de documentos
2. **Geração de Recibos**: Emissão automática de recibos de pagamento
3. **Notificações**: Sistema de notificações em tempo real
4. **Relatórios**: Geração de relatórios em PDF
5. **Dashboard Analítico**: Gráficos e métricas avançadas
6. **Sistema de Frequência**: Controle de frequência de alunos
7. **Calendário Acadêmico**: Gestão de eventos e datas importantes
8. **Chat/Mensagens**: Comunicação direta entre usuários
9. **Backup Automático**: Backup periódico dos dados
10. **Auditoria**: Log de todas as ações importantes

---

## Conclusão

O sistema UNIENF é uma plataforma completa de gestão acadêmica desenvolvida com tecnologias modernas e seguindo boas práticas de desenvolvimento. O sistema está estruturado para suportar o crescimento da instituição e pode ser facilmente expandido com novas funcionalidades conforme necessário.

A arquitetura baseada em roles permite controle granular de acesso, garantindo que cada usuário tenha acesso apenas às funcionalidades apropriadas para seu perfil. A integração com Supabase fornece uma base sólida e escalável para o armazenamento de dados e autenticação.

---

**Última Atualização**: Janeiro 2025  
**Versão do Sistema**: 0.1.0
