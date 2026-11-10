import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ membershipFindFirst: vi.fn(), equipmentFindMany: vi.fn(), loanFindMany: vi.fn(), createLoan: vi.fn(), returnLoan: vi.fn() }));

vi.mock("@/server/db", () => ({
  prisma: {
    membership: { findFirst: mocks.membershipFindFirst },
    equipment: { findMany: mocks.equipmentFindMany },
    loan: { findMany: mocks.loanFindMany, findFirst: vi.fn() },
  },
}));
vi.mock("@/server/services/loan-service", () => ({ createLoan: mocks.createLoan, returnLoan: mocks.returnLoan }));

import { appRouter } from "@/server/api/root";

const tenantId = "11111111-1111-4111-8111-111111111111";
const userId = "22222222-2222-4222-8222-222222222222";
const equipmentId = "33333333-3333-4333-8333-333333333333";
const membershipId = "44444444-4444-4444-8444-444444444444";

describe("procedures protegidas", () => {
  beforeEach(() => vi.clearAllMocks());

  it("CA-01 bloqueia catálogo sem sessão", async () => {
    const caller = appRouter.createCaller({ requestId: "test" });
    await expect(caller.catalog.list()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });

  it("CA-03 filtra catálogo pelo tenant da membership", async () => {
    mocks.membershipFindFirst.mockResolvedValue({ id: membershipId, tenantId, authUserId: userId, role: "COLLABORATOR" });
    mocks.equipmentFindMany.mockResolvedValue([]);
    const caller = appRouter.createCaller({ requestId: "test", userId });
    await caller.catalog.list();
    expect(mocks.equipmentFindMany).toHaveBeenCalledWith(expect.objectContaining({ where: { tenantId } }));
  });

  it("CA-04 e CA-06 encaminha solicitação autenticada ao serviço", async () => {
    mocks.membershipFindFirst.mockResolvedValue({ id: membershipId, tenantId, authUserId: userId, role: "COLLABORATOR" });
    mocks.createLoan.mockResolvedValue({ id: "00000000-0000-0000-0000-000000000005" });
    const caller = appRouter.createCaller({ requestId: "test", userId });
    await caller.loans.create({ tenantId, equipmentId });
    expect(mocks.createLoan).toHaveBeenCalledWith({ tenantId, equipmentId, borrowerMembershipId: membershipId });
  });

  it("CA-04 preserva a situação de manutenção no catálogo", async () => {
    mocks.membershipFindFirst.mockResolvedValue({ id: membershipId, tenantId, authUserId: userId, role: "COLLABORATOR" });
    mocks.equipmentFindMany.mockResolvedValue([{ id: equipmentId, patrimony: "TI-0001", name: "Notebook", category: "Notebook", situation: "MAINTENANCE", imageUrl: "https://example.test/image.jpg" }]);
    const caller = appRouter.createCaller({ requestId: "test", userId });
    const result = await caller.catalog.list();
    expect(result.equipment[0]?.situation).toBe("MAINTENANCE");
  });

  it("CA-07 bloqueia Operações para colaborador", async () => {
    mocks.membershipFindFirst.mockResolvedValue({ id: membershipId, tenantId, authUserId: userId, role: "COLLABORATOR" });
    const caller = appRouter.createCaller({ requestId: "test", userId });
    await expect(caller.operations.openLoans({ tenantId })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("CA-07 lista empréstimos do tenant para Operações", async () => {
    mocks.membershipFindFirst.mockResolvedValue({ id: membershipId, tenantId, authUserId: userId, role: "OPERATIONS" });
    mocks.loanFindMany.mockResolvedValue([]);
    const caller = appRouter.createCaller({ requestId: "test", userId });
    await caller.operations.openLoans({ tenantId });
    expect(mocks.loanFindMany).toHaveBeenCalledWith(expect.objectContaining({ where: { tenantId, status: "ACTIVE" } }));
  });

  it("CA-07 restringe o colaborador aos próprios empréstimos", async () => {
    mocks.membershipFindFirst.mockResolvedValue({ id: membershipId, tenantId, authUserId: userId, role: "COLLABORATOR" });
    mocks.loanFindMany.mockResolvedValue([]);
    const caller = appRouter.createCaller({ requestId: "test", userId });
    await caller.loans.mine({ tenantId });
    expect(mocks.loanFindMany).toHaveBeenCalledWith(expect.objectContaining({ where: { tenantId, borrowerMembershipId: membershipId, status: "ACTIVE" } }));
  });
});
