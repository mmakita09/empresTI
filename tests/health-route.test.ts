import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/server/services/health", () => ({ getHealth: vi.fn() }));

import { GET } from "@/app/api/health/route";
import { getHealth } from "@/server/services/health";

const mockedGetHealth = vi.mocked(getHealth);

describe("GET /api/health", () => {
  beforeEach(() => vi.clearAllMocks());

  it("AZ-04 e AZ-06 responde 200 e informa banco disponível", async () => {
    mockedGetHealth.mockResolvedValue({ status: "ok", database: "conexão disponível" });

    const response = await GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      status: "ok",
      database: "conexão disponível",
    });
  });

  it("AZ-02 e AZ-06 responde 503 e informa banco indisponível", async () => {
    mockedGetHealth.mockResolvedValue({
      status: "unavailable",
      database: "não foi possível conectar ao banco",
    });

    const response = await GET();

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      status: "unavailable",
      database: "não foi possível conectar ao banco",
    });
  });
});
