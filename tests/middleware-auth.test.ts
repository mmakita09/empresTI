import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "../middleware";

describe("proteção de rotas", () => {
  it.each(["/catalogo", "/devolucoes", "/operacoes"])("CA-02 redireciona %s sem configuração/sessão", async (path) => {
    const response = await middleware(new NextRequest(`http://localhost${path}`));
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost/login");
  });
});
