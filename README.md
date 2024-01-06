# ResumeAI - AI-Powered Resume Builder

A modern web application built with Next.js that helps users create professional resumes with AI-powered optimization and suggestions.

## Features

- **Dynamic Resume Editor**: Drag-and-drop section reordering with WYSIWYG formatting
- **AI-Powered Enhancements**: Smart bullet point suggestions, job description analyzer, and writing improvements
- **Multiple Export Options**: PDF, DOCX, plaintext for ATS compatibility, and JSON for backup
- **Modern UI/UX**: Responsive design with dark/light mode support and autosave functionality
- **Resume Analytics**: Score based on completeness, ATS compatibility check, and keyword analysis

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **UI**: TailwindCSS with shadcn/ui components
- **State Management**: Zustand with React Context API
- **AI Integration**: OpenAI API (GPT-4)
- **PDF Generation**: React-PDF (coming soon)

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- NPM or Yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/resumeai.git
cd resumeai
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with your OpenAI API key (optional for AI features):
```
OPENAI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `/app` - Next.js app router pages
- `/components` - Reusable UI components
  - `/ui` - Base UI components from shadcn/ui
  - `/resume` - Resume-specific components
- `/lib` - Utility functions, types, and Zustand store
- `/public` - Static assets

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
