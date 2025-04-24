A web application based on shadcn's OpenAI and AI SDK Chatbot that generates engaging LinkedIn posts based on content from a Sanity CMS embeddings API. The application uses Vercel's AI SDK and OpenAI's API to create contextually relevant posts and provides a chat-like interface for users to interact with the content generation system.

## Prerequisites

Before you begin, ensure you have the following:

- Node.js (v18+ recommended)
- npm or yarn
- Sanity CMS project, embeddings index, and API credentials
- OpenAI API key

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
OPENAI_API_KEY=your_openai_api_key
SANITY_PROJECT_ID=your_sanity_project_id
SANITY_DATASET=your_sanity_dataset
SANITY_INDEX_NAME=your_sanity_index_name
SANITY_API_KEY=your_sanity_api_key
SANITY_API_VERSION=your_sanity_api_version_number
```

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd [repository-name]
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
bun install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

- `/app` - Next.js app directory
  - `layout.tsx` - Root layout component
  - `page.tsx` - Main page component
  - `globals.css` - Global styles
  - `/api/chat/route.ts` - API route for handling chat interactions with OpenAI and Sanity. You can edit the prompt here (defaults to generating LinkedIn posts).
- `/components` - React components
  - `chat-form.tsx` - Main chat interface component
  - `autoresize-textarea.tsx` - Auto-resizing textarea component
  - `/ui/` - Reusable UI components
- `/lib` - Utility functions and configurations
  - `sanity.ts` - Sanity CMS integration and query functions
  - `utils.ts` - Helper functions and utilities
  - `errorMessages.ts` - Error message configurations and handling

## Usage

1. Open the application in your browser
2. Enter a topic or subject you'd like to create a LinkedIn post about
3. The system will search through the Sanity CMS content and generate a relevant post
4. You can continue the conversation to refine or modify the generated content
