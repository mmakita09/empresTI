import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/server/services/health", () => ({ getHealth: vi.fn() }));

import { getHealth } from "@/server/services/health";
import { appRouter } from "@/server/api/root";

const mockedGetHealth = vi.mocked(getHealth);

describe("health router", () => {
  beforeEach(() => vi.clearAllMocks());

  it("AZ-05 devolve o estado do banco pelo tRPC", async () => {
    mockedGetHealth.mockResolvedValue({
      status: "ok",
      database: "conexão disponível",
    });

    const caller = appRouter.createCaller({ requestId: "test-request" });

    await expect(caller.health.check()).resolves.toEqual({
      status: "ok",
      database: "conexão disponível",
    });
  });
});
