'use client';

import { ReactNode } from 'react';
import { ResumeProvider } from '@/lib/context/resume-context';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ResumeProvider>
      {children}
    </ResumeProvider>
  );
}