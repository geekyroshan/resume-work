"use client";

import { Container } from "@/components/ui/container";

export default function EditorPage() {
  return (
    <div className="py-10">
      <Container>
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Resume Editor</h1>
            <div className="flex items-center gap-4">
              <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
                Preview
              </button>
              <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
                Export
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-3 bg-card p-6 rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Sections</h2>
              <div className="space-y-2">
                <div className="p-3 bg-background rounded-md border cursor-pointer hover:bg-accent/50">
                  Contact Information
                </div>
                <div className="p-3 bg-background rounded-md border cursor-pointer hover:bg-accent/50">
                  Professional Summary
                </div>
                <div className="p-3 bg-background rounded-md border cursor-pointer hover:bg-accent/50">
                  Work Experience
                </div>
                <div className="p-3 bg-background rounded-md border cursor-pointer hover:bg-accent/50">
                  Education
                </div>
                <div className="p-3 bg-background rounded-md border cursor-pointer hover:bg-accent/50">
                  Skills
                </div>
                <div className="p-3 bg-background rounded-md border cursor-pointer hover:bg-accent/50">
                  Projects
                </div>
              </div>
              <div className="mt-6">
                <button className="w-full inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm hover:bg-secondary/80">
                  + Add Section
                </button>
              </div>
            </div>
            
            {/* Main Editor Area */}
            <div className="md:col-span-9 bg-card p-6 rounded-lg border shadow-sm">
              <div className="bg-background border rounded-lg p-8 min-h-[800px] w-full">
                <p className="text-center text-muted-foreground">
                  Select a section from the sidebar to begin editing your resume
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
} 