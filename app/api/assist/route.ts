import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { prompt, context } = await request.json();
  if (!process.env.OPENAI_API_KEY) return NextResponse.json({ text: "Add OPENAI_API_KEY to .env.local to enable live story collaboration." });
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await client.chat.completions.create({ model: "gpt-4o-mini", temperature: 0.8, messages: [{ role: "system", content: "You are Inkstone, an elite novelist and developmental editor. Give specific, emotionally intelligent, practical writing help. Avoid generic advice." }, { role: "user", content: `Story context:\n${context || "No context provided"}\n\nWriter request:\n${prompt}` }] });
  return NextResponse.json({ text: completion.choices[0]?.message?.content || "No suggestion generated." });
}
