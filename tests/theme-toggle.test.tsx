// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ThemeToggle } from "@/app/theme-toggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove("theme-dark");
  });

  afterEach(() => cleanup());

  it("CA-03 e CA-04 persiste o tema e expõe o estado acessível", () => {
    render(<ThemeToggle />);

    const toggle = screen.getByRole("button", { name: "Modo escuro" });
    expect(toggle.getAttribute("aria-pressed")).toBe("false");

    fireEvent.click(toggle);

    expect(window.localStorage.getItem("empres-ti-theme")).toBe("dark");
    expect(document.documentElement.classList.contains("theme-dark")).toBe(true);
    expect(screen.getByRole("button", { name: "Modo claro" }).getAttribute("aria-pressed")).toBe("true");
  });
});
