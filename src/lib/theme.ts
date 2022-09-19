import create from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  colorscheme: "light" | "dark";
  setColorscheme: (colorscheme: "light" | "dark") => void;
}

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      colorscheme: "light",
      setColorscheme: (colorscheme) => set({ colorscheme }),
    }),
    {
      name: "theme",
    },
  ),
);
