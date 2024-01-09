'use client';

import { ReactNode } from 'react';
import { ResumeProvider } from '@/lib/context/resume-context';
import { Toaster } from '@/components/ui/sonner';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ResumeProvider>
      {children}
      <Toaster />
    </ResumeProvider>
  );
}