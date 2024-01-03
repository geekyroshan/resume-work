import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Create professional resumes with
                <span className="text-primary"> AI-powered</span> optimization
              </h1>
              <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
                Our AI resume builder helps you craft the perfect resume with smart suggestions,
                job description analyzers, and professional templates.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/editor">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link href="/templates">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Explore Templates
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/40">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Key Features</h2>
            <p className="mt-4 text-muted-foreground">Everything you need to build a professional resume</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-background p-6 rounded-lg shadow-sm border">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                  <path d="M10 9H8" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Dynamic Sections</h3>
              <p className="text-muted-foreground">Drag-and-drop sections with real-time WYSIWYG formatting and professional templates.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-background p-6 rounded-lg shadow-sm border">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <path d="M14 9h.01" />
                  <path d="M10 9h.01" />
                  <path d="M7 13h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Enhancements</h3>
              <p className="text-muted-foreground">Get smart bullet point suggestions and job description analyzer for keyword optimization.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-background p-6 rounded-lg shadow-sm border">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Export Options</h3>
              <p className="text-muted-foreground">Export to PDF, DOCX, or plaintext for ATS compatibility, plus JSON for backup.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <div className="rounded-lg bg-primary/5 p-8 md:p-12 border shadow-sm text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
              Ready to build your professional resume?
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground mb-8">
              Start creating your resume with our AI-powered tools and get noticed by employers.
            </p>
            <Link href="/editor">
              <Button size="lg">
                Create Your Resume
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
