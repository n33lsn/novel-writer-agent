import OpenAI from "openai";
import { NextResponse } from "next/server";
import { rateLimit, requestKey } from "../../../lib/rate-limit";

export const maxDuration = 60;
type Action = "extract" | "retrieve" | "quality";

export async function POST(request: Request) {
  const gate = rateLimit(`memory:${requestKey(request)}`, 12);
  if (!gate.ok) return NextResponse.json({ error: "Too many memory requests. Try again shortly." }, { status: 429 });
  try {
    const body = await request.json();
    const action = body.action as Action;
    if (!["extract", "retrieve", "quality"].includes(action)) return NextResponse.json({ error: "Invalid memory action." }, { status: 400 });
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: "Add OPENAI_API_KEY to enable memory intelligence." }, { status: 503 });
    const source = String(body.source || body.query || "").slice(0, 50000);
    if (!source.trim()) return NextResponse.json({ error: "Source text is required." }, { status: 400 });
    const jobs = {
      extract: "Extract durable novel facts from this scene. Return JSON with summary, characters (name, state, facts), locations, objects, events, openThreads, promises, and styleSignals. Only record facts supported by the text.",
      retrieve: "Select the most relevant facts from the memory for the requested scene. Return JSON with relevantFacts, warnings, and requiredContinuityChecks. Do not invent facts.",
      quality: "Run a strict quality-control audit. Return JSON with score, repetitionFlags, clicheFlags, pacing, voiceDrift, continuityRisks, strengths, and priorityFixes. Be specific and evidence-based."
    }[action];
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.chat.completions.create({ model: "gpt-4o-mini", temperature: action === "extract" ? 0.15 : 0.25, response_format: { type: "json_object" }, messages: [
      { role: "system", content: `You are Inkstone's long-term memory and quality-control engine. ${jobs} Return valid JSON only.` },
      { role: "user", content: JSON.stringify({ source, memory: body.memory || {}, query: body.query || "" }) }
    ] });
    return NextResponse.json({ result: response.choices[0]?.message?.content || "{}" });
  } catch (error) {
    console.error("memory engine error", error);
    return NextResponse.json({ error: "Memory processing failed." }, { status: 500 });
  }
}
