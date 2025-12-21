export type MensalidadeStatus = "pendente" | "pago";
export type FormaPagamento = "dinheiro" | "pix" | "debito" | "credito";

export type MensalidadeRow = {
  id: string;
  studentId: string;
  studentName: string;

  competenceYear: number;
  competenceMonth: number;

  status: MensalidadeStatus;

  valor_mensalidade: number;

  valorPago: number | null;
  formaPagamento: FormaPagamento | null;

  dataPagamento: string | null;
};

export type MonthlySummary = {
  year: number;
  month: number; // 1-12
  totalPaid: number;
  prevMonthTotalPaid: number;
  delta: number;
  deltaPct: number | null;
};

export type InternalCost = {
  id: string;
  competenceYear: number;
  competenceMonth: number; // 1-12
  category: string;
  description: string;
  amount: number;

  // ISO datetime para custos
  incurredAt: string; // ISO
};
