import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ membershipFindFirst: vi.fn(), equipmentFindMany: vi.fn(), createLoan: vi.fn(), returnLoan: vi.fn() }));

vi.mock("@/server/db", () => ({
  prisma: {
    membership: { findFirst: mocks.membershipFindFirst },
    equipment: { findMany: mocks.equipmentFindMany },
    loan: { findMany: vi.fn(), findFirst: vi.fn() },
  },
}));
vi.mock("@/server/services/loan-service", () => ({ createLoan: mocks.createLoan, returnLoan: mocks.returnLoan }));

import { appRouter } from "@/server/api/root";

const tenantId = "00000000-0000-0000-0000-000000000001";
const userId = "00000000-0000-0000-0000-000000000002";
const equipmentId = "00000000-0000-0000-0000-000000000003";
const membershipId = "00000000-0000-0000-0000-000000000004";

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
});
