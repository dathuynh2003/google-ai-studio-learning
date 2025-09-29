export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <h1 className="text-4xl font-bold text-center sm:text-left">
            Google AI Studio Learning
          </h1>
        </div>
        
        <div className="text-center sm:text-left">
          <p className="text-lg mb-4">
            Welcome to Google AI Studio Learning Platform
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
            Use Google AI Studio and Google Meet API/Embed to host meetings and extract 
            summaries and to-do lists from Gemini AI. This platform provides tools to 
            integrate AI-powered meeting analysis and task management.
          </p>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="#"
          >
            Get Started
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://github.com/dathuynh2003/google-ai-studio-learning"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </main>
      
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Built with Next.js, TypeScript, and Google AI Studio
        </p>
      </footer>
    </div>
  );
}