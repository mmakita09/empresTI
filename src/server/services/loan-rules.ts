export const OPEN_LOAN_LIMIT = 5;
export const LOAN_BUSINESS_DAYS = 14;

export type LoanSummary = {
  dueAt: Date;
  status: "ACTIVE" | "RETURNED";
};

export type BorrowerState = {
  openLoans: LoanSummary[];
  now?: Date;
};

export function addBusinessDays(start: Date, days: number): Date {
  if (!Number.isInteger(days) || days < 0) throw new Error("days deve ser um inteiro não negativo");
  const result = new Date(start);
  let remaining = days;
  while (remaining > 0) {
    result.setUTCDate(result.getUTCDate() + 1);
    const weekday = result.getUTCDay();
    if (weekday !== 0 && weekday !== 6) remaining -= 1;
  }
  return result;
}

export function calculateDueAt(start = new Date()): Date {
  return addBusinessDays(start, LOAN_BUSINESS_DAYS);
}

export function canBorrow({ openLoans, now = new Date() }: BorrowerState):
  | { allowed: true }
  | { allowed: false; reason: "OPEN_LIMIT" | "OVERDUE" } {
  const activeLoans = openLoans.filter((loan) => loan.status === "ACTIVE");
  if (activeLoans.length >= OPEN_LOAN_LIMIT) return { allowed: false, reason: "OPEN_LIMIT" };
  if (activeLoans.some((loan) => loan.dueAt.getTime() < now.getTime())) return { allowed: false, reason: "OVERDUE" };
  return { allowed: true };
}

