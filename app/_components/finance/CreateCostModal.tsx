"use client";

import { useState } from "react";

type Props = {
  competenceYear: number;
  competenceMonth: number;
};

export default function CreateCostModal({
  competenceYear,
  competenceMonth,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-10 rounded-md bg-sky-500 px-4 text-sm font-medium text-white hover:bg-sky-600"
      >
        Lançar custo
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-lg">
            <div className="flex items-start justify-between gap-3 border-b p-5">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Novo custo interno
                </h3>
                <p className="text-sm text-slate-600">
                  Competência: {String(competenceMonth).padStart(2, "0")}/
                  {competenceYear}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50"
              >
                Fechar
              </button>
            </div>

            <form
              className="flex flex-col gap-4 p-5"
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);

                const payload = {
                  competenceYear,
                  competenceMonth,
                  category: String(fd.get("category") ?? "").trim(),
                  description: String(fd.get("description") ?? "").trim(),
                  amount: Number(
                    String(fd.get("amount") ?? "0").replace(",", "."),
                  ),
                  incurredAt: String(fd.get("incurredAt") ?? "").trim(),
                };

                // Aqui você vai trocar para Server Action:
                // await createInternalCost(payload);
                // router.refresh();

                console.log("Novo custo (mock):", payload);
                setOpen(false);
              }}
            >
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">
                  Categoria
                </label>
                <input
                  name="category"
                  className="h-10 rounded-md border border-slate-200 px-3 text-sm"
                  placeholder="Ex.: Aluguel, Energia, Internet"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">
                  Descrição
                </label>
                <input
                  name="description"
                  className="h-10 rounded-md border border-slate-200 px-3 text-sm"
                  placeholder="Detalhe do custo"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-slate-700">
                    Valor (R$)
                  </label>
                  <input
                    name="amount"
                    className="h-10 rounded-md border border-slate-200 px-3 text-sm"
                    placeholder="Ex.: 380,00"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-slate-700">
                    Data do custo
                  </label>
                  <input
                    type="date"
                    name="incurredAt"
                    className="h-10 rounded-md border border-slate-200 px-3 text-sm"
                    defaultValue={new Date().toISOString().slice(0, 10)}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="h-10 rounded-md border border-slate-200 px-4 text-sm font-medium text-slate-900 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="h-10 rounded-md bg-sky-500 px-4 text-sm font-medium text-white hover:bg-sky-600"
                >
                  Salvar custo
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
