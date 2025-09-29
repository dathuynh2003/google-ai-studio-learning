# Google AI Studio Learning

A Next.js application that integrates with Google AI Studio and Google Meet API to host meetings and extract summaries and to-do lists using Gemini AI.

## Features

- 🤖 **AI-Powered Meeting Summaries**: Generate concise summaries from meeting transcripts using Gemini AI
- 📝 **Automatic To-Do Extraction**: Extract and organize action items from meetings
- 🎥 **Google Meet Integration**: Seamlessly integrate with Google Meet for meeting hosting
- ⚡ **Next.js 15 + TypeScript**: Modern React framework with full TypeScript support
- 🎨 **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- 📱 **Responsive Design**: Mobile-first responsive design approach
- ☁️ **Vercel Ready**: Optimized for deployment on Vercel platform

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- Google AI Studio API key
- Google Meet API credentials (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dathuynh2003/google-ai-studio-learning.git
cd google-ai-studio-learning
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:
```env
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
GOOGLE_MEET_CLIENT_ID=your_google_meet_client_id_here
GOOGLE_MEET_CLIENT_SECRET=your_google_meet_client_secret_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                  # App Router pages and layouts
│   ├── api/             # API routes
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/          # Reusable UI components
│   ├── ui.tsx          # Basic UI components
│   └── TodoList.tsx    # Todo list component
├── lib/                # Utility functions and services
│   ├── utils.ts        # General utilities
│   └── gemini.ts       # Gemini AI service
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared types
└── styles/             # Additional stylesheets
```

## API Routes

- `GET /api/health` - Health check endpoint

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy automatically on every push to main branch

### Environment Variables for Production

Make sure to set these environment variables in your deployment platform:

- `GOOGLE_AI_API_KEY` - Your Google AI Studio API key
- `GOOGLE_MEET_CLIENT_ID` - Google Meet OAuth client ID
- `GOOGLE_MEET_CLIENT_SECRET` - Google Meet OAuth client secret

## Technologies Used

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google Generative AI SDK
- **Linting**: ESLint
- **Deployment**: Vercel

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.
