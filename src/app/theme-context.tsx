"use client";
import { createContext, useState, useEffect } from "react";

export type Theme = "default" | "retro";

export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
  themes: Theme[];
}>({
  theme: "default",
  setTheme: () => {},
  themes: ["default", "retro"],
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("default");
  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: ["default", "retro"] }}>
      {children}
    </ThemeContext.Provider>
  );
}
