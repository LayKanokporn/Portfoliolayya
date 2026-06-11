"use client";
import { ThemeProvider } from "./ThemeProvider";
import { PageTransition } from "./PageTransition";
import { BackToTop } from "./BackToTop";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <PageTransition>{children}</PageTransition>
      <BackToTop />
    </ThemeProvider>
  );
}
