import { Inter } from "next/font/google"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"
import './globals.css'

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Basic AI Chatbot + Sanity CMS Embeddings RAG Template",
  description: "A basic AI chatbot that uses Next.js, the Vercel AI SDK, and Sanity CMS embeddings to generate content using headless CMS data. \n Connect API keys from your provider and Sanity CMS and send a message to get started. \n This chatbot is based on shadcn's OpenAI and AI SDK Chatbot v0 template.",
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={cn("flex min-h-svh flex-col antialiased", inter.className)}>
        <TooltipProvider delayDuration={0}>
          {children}
        </TooltipProvider>
      </body>
    </html>
  )
}