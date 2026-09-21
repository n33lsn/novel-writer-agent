import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { premise, genre, tone, length } = await request.json();
    if (!premise?.trim()) return NextResponse.json({ error: "A premise is required." }, { status: 400 });
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ text: "Add OPENAI_API_KEY to .env.local to generate a live outline.", fallback: true });
    }
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const result = await client.chat.completions.create({
      model: "gpt-4o-mini", temperature: 0.75,
      messages: [
        { role: "system", content: "You are an expert novel architect. Design commercially compelling but original fiction. Return valid JSON with keys: logline, themes (array), characters (array of objects with name, role, desire, wound, arc), acts (array of objects with title, purpose, beats (array of objects with chapter, title, summary, turningPoint))). Do not use markdown fences." },
        { role: "user", content: JSON.stringify({ premise, genre, tone, length }) }
      ],
      response_format: { type: "json_object" }
    });
    return NextResponse.json({ text: result.choices[0]?.message?.content || "{}" });
  } catch { return NextResponse.json({ error: "The outline generator could not complete that request." }, { status: 500 }); }
}
