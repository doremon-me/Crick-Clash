import { z } from "zod";
import { signinSchema, signupSchema } from "./schema";

export type Theme = "dark" | "light" | "system";

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export type TSingin = z.infer<typeof signinSchema>;
export type TSingup = z.infer<typeof signupSchema>;
