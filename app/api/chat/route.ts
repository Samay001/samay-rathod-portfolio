import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { portfolioContext } from "@/lib/portfolio-data";

export const maxDuration = 30;

type IncomingMessage = { role: "user" | "assistant"; content: string };

const system = `You are Samay Rathod's concise portfolio assistant. Answer on Samay's behalf in a confident, warm, professional tone. Use only the verified context below. Never invent experience, metrics, employers, links, or availability. If the answer is not in the context, say so and offer to connect the visitor with Samay at samayrathod1@gmail.com. Keep most answers under 110 words.\n\n${portfolioContext}`;

function demoAnswer(question: string) {
  const prompt = question.toLowerCase();
  if (prompt.includes("contact") || prompt.includes("email") || prompt.includes("available")) return "You can reach Samay at samayrathod1@gmail.com or use the email form here. He is also available on LinkedIn at linkedin.com/in/samayrathod.";
  if (prompt.includes("experience") || prompt.includes("edmo") || prompt.includes("work")) return "Samay is an Associate Software Engineer at EDMO. His work includes a Genesys-to-VAPI call-routing platform serving 3,000+ daily calls, an NYU RAG assistant built over 300+ pages, a Kafka video pipeline, and an Amazon Textract transfer-credit evaluation system. He previously worked as a Backend Developer Intern at Sarvm.ai.";
  if (prompt.includes("technolog") || prompt.includes("skill") || prompt.includes("stack")) return "Samay's core stack includes TypeScript, Java, Node.js, Nest.js, Spring Boot, Next.js, PostgreSQL, MongoDB, Kafka, Elasticsearch, Docker, Kubernetes, and GCP. His applied-AI work includes RAG, VAPI, Genesys AudioHook, OpenAI, Gemini, pgvector, and Amazon Textract.";
  if (prompt.includes("wealth")) return "Wealth One aggregates investment data from CoinDCX, Upstox, and CoinGecko into portfolio visualizations. It also includes a Gemini-powered assistant for mutual-fund analysis.";
  if (prompt.includes("interview")) return "AI Interviewer is a technical-screening platform with JWT authentication, role-based access, resume parsing, AI-generated questions, scoring, speech interaction, and result emails.";
  return "Samay has built Wealth One, AI Interviewer, Content Creation Automation, and JoinSparks. His production work focuses on scalable backend systems, voice AI, RAG, and event-driven services. Ask me about a specific project or his experience at EDMO.";
}

export async function POST(request: Request) {
  const body = await request.json() as { messages?: IncomingMessage[] };
  const messages = (body.messages ?? []).filter((message) => message.content?.trim()).slice(-12);
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    const answer = demoAnswer(messages.at(-1)?.content ?? "");
    const encoder = new TextEncoder();
    const words = answer.split(" ");
    const stream = new ReadableStream({
      async start(controller) {
        for (const [index, word] of words.entries()) {
          controller.enqueue(encoder.encode(`${index ? " " : ""}${word}`));
          await new Promise((resolve) => setTimeout(resolve, 14));
        }
        controller.close();
      },
    });
    return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }

  const openai = createOpenAI({ apiKey });
  const result = streamText({ model: openai("gpt-4o-mini"), system, messages });
  return result.toTextStreamResponse();
}
