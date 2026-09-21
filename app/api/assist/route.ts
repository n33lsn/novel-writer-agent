import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { prompt, context } = await request.json();
    if (typeof prompt !== "string" || !prompt.trim()) return NextResponse.json({ error: "A prompt is required." }, { status: 400 });
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ text: "Add OPENAI_API_KEY to .env.local to enable live story collaboration." });
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await client.chat.completions.create({ model: "gpt-4o-mini", temperature: 0.8, messages: [{ role: "system", content: "You are Inkstone, an elite novelist and developmental editor. Give specific, emotionally intelligent, practical writing help. Preserve the writer's voice. Avoid generic advice." }, { role: "user", content: `Current chapter:\n${String(context || "No context provided").slice(0, 12000)}\n\nWriter request:\n${prompt.slice(0, 4000)}` }] });
    return NextResponse.json({ text: completion.choices[0]?.message?.content || "No suggestion generated." });
  } catch { return NextResponse.json({ error: "The story partner could not complete that request." }, { status: 500 }); }
}
