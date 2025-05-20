"use client";
import { createContext, useState, useEffect } from "react";

type Theme = "default" | "hacker8bit";

export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
  themes: Theme[];
}>({
  theme: "default",
  setTheme: () => {},
  themes: ["default", "hacker8bit"],
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("default");
  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: ["default", "hacker8bit"] }}>
      {children}
    </ThemeContext.Provider>
  );
}
