'use client';

import { ReactNode } from 'react';
import { ResumeProvider } from '@/lib/context/resume-context';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ResumeProvider>
        {children}
        <Toaster />
      </ResumeProvider>
    </ThemeProvider>
  );
}