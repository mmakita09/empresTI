"use client";

import { useEffect, useSyncExternalStore } from "react";

const themeStorageKey = "empres-ti-theme";
const themeChangedEvent = "empres-ti-theme-changed";

function applyTheme(isDark: boolean) {
  document.documentElement.classList.toggle("theme-dark", isDark);
}

function subscribeToTheme(onStoreChange: () => void) {
  window.addEventListener(themeChangedEvent, onStoreChange);
  return () => window.removeEventListener(themeChangedEvent, onStoreChange);
}

function getSavedTheme() {
  return window.localStorage.getItem(themeStorageKey) === "dark";
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribeToTheme, getSavedTheme, () => false);

  useEffect(() => {
    applyTheme(isDark);
  }, [isDark]);

  function toggleTheme() {
    const nextThemeIsDark = !isDark;

    applyTheme(nextThemeIsDark);
    window.localStorage.setItem(themeStorageKey, nextThemeIsDark ? "dark" : "light");
    window.dispatchEvent(new Event(themeChangedEvent));
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-pressed={isDark}>
      <span aria-hidden="true">{isDark ? "☀" : "◐"}</span>
      {isDark ? "Modo claro" : "Modo escuro"}
    </button>
  );
}
