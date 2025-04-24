import { type CoreMessage } from "ai";
import { querySanity } from "@/lib/sanity";
import { z } from "zod";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages, chatHistory = [] } = await req.json();
  // Combine chat history with current messages
  const combinedMessages = [...chatHistory, ...messages];
  // Get the latest user message
  const latestMessage = combinedMessages[messages.length - 1];
  const userMessage =
    typeof latestMessage.content === "string"
      ? latestMessage.content
      : latestMessage.content.map((c: any) => String(c)).join(" ");

  // Query relevant content from Sanity
  const relevantContent = await querySanity(userMessage);

  // If no relevant content is found, return an error
  if (
    combinedMessages.length < 2 &&
    (!relevantContent || relevantContent.length < 1)
  ) {
    return new Response("ERROR: CONTENT NOT FOUND", {
      status: 404,
    });
  } else {
    const context = relevantContent?.map((page) => {
      return `Title: ${page?.title}. Content: ${page?._markdown}`;
    });

    const result = await streamText({
      model: openai("gpt-4o-mini"),
      prompt: `You are a LinkedIn post writer that creates engaging content using frameworks like PAS (Problem, Agitate, Solve), ACCA (Awareness, Comprehension, Conviction, Action), or QUEST (Question, Unique, Explain, Story, Tie-back). 
  
      Context from website:
      ${context}
  
      Guidelines:
      - Only write about content from Rangle's website. If there isn't relevant context, then say you don't have any information about that topic.
      - Use emojis instead of bullet points for structure (maximum 5 emojis)
      - Avoid using asterisks
      - Keep the tone professional yet engaging
      - Use concise language
      - End with a clear call-to-action or thought-provoking insight
      - Reference specific points from the provided context
      - Begin your response with "Context: " followed by the page URL and a brief summary of the context used, then start a new line for the LinkedIn post
      `,
    });

    return result.toDataStreamResponse();
  }
}
