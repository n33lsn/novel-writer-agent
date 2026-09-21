import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { manuscript } = await request.json();
    if (!manuscript?.trim()) return NextResponse.json({ error: "Manuscript text is required." }, { status: 400 });
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ text: "Add OPENAI_API_KEY to .env.local to run a live continuity check.", fallback: true });
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const result = await client.chat.completions.create({
      model: "gpt-4o-mini", temperature: 0.2,
      messages: [
        { role: "system", content: "You are a meticulous fiction continuity editor. Find contradictions, unresolved setup, timeline problems, character motivation changes, and world-rule violations. Return valid JSON with keys: score (number 0-100), strengths (array), issues (array of objects with severity, location, problem, fix), threads (array of objects with thread, status, nextStep). If evidence is missing, say so rather than inventing facts. Do not use markdown fences." },
        { role: "user", content: manuscript.slice(0, 50000) }
      ],
      response_format: { type: "json_object" }
    });
    return NextResponse.json({ text: result.choices[0]?.message?.content || "{}" });
  } catch { return NextResponse.json({ error: "The continuity checker could not complete that request." }, { status: 500 }); }
}
