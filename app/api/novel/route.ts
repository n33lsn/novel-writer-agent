import OpenAI from "openai";
import { NextResponse } from "next/server";
import { rateLimit, requestKey } from "../../../../lib/rate-limit";

export const maxDuration = 60;

type Action = "plan" | "draft" | "critique" | "revise";

const schemas: Record<Action, string> = {
  plan: `{"title":"string","logline":"string","styleGuide":"string","characters":[{"name":"string","role":"string","desire":"string","wound":"string","arc":"string"}],"acts":[{"title":"string","purpose":"string","scenes":[{"title":"string","goal":"string","conflict":"string","turn":"string","consequence":"string"}]}]}`,
  draft: `{"sceneTitle":"string","text":"string","summary":"string","continuityNotes":["string"]}`,
  critique: `{"overall":"string","score":0,"structure":["string"],"character":["string"],"prose":["string"],"continuity":["string"],"priorityFixes":["string"]}`,
  revise: `{"text":"string","changes":["string"],"continuityNotes":["string"]}`
};

export async function POST(request: Request) {
  const limit = rateLimit(`novel:${requestKey(request)}`, 10);
  if (!limit.ok) return NextResponse.json({ error: "Too many requests. Try again in a minute." }, { status: 429 });
  try {
    const body = await request.json();
    const action = body.action as Action;
    if (!["plan", "draft", "critique", "revise"].includes(action)) return NextResponse.json({ error: "Invalid action." }, { status: 400 });
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({ error: "Add OPENAI_API_KEY to enable the autonomous novelist." }, { status: 503 });
    const input = JSON.stringify({ premise: body.premise, memory: body.memory, scene: body.scene, text: body.text, instruction: body.instruction });
    if (input.length > 70000) return NextResponse.json({ error: "Novel context is too large. Send a focused scene and memory." }, { status: 413 });
    const instructions = {
      plan: "Architect an original novel. Build causal, escalating fiction with active characters and irreversible consequences. Design scenes, not vague summaries.",
      draft: "Write polished literary genre fiction for exactly one scene. Use concrete sensory detail, subtext, varied rhythm, active characterization, and a consequential turn. Do not summarize events that should be dramatized.",
      critique: "Be a demanding developmental editor. Diagnose specific craft problems and prioritize fixes. Do not praise vaguely or invent continuity facts.",
      revise: "Rewrite the supplied scene, applying the instruction and the most important craft fixes. Preserve the author's intended events, voice, and continuity unless a fix requires change. Return only the revised scene in text."
    }[action];
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.chat.completions.create({ model: "gpt-4o-mini", temperature: action === "critique" ? 0.25 : 0.8, response_format: { type: "json_object" }, messages: [
      { role: "system", content: `You are Inkstone Autonomous Novelist, an elite novelist, story architect, and ruthless editor. ${instructions} Maintain a private mental model of every fact in the supplied memory. Never contradict it. Avoid generic AI prose, cliches, melodrama, repetitive sentence openings, and exposition dumps. Return valid JSON matching this exact shape: ${schemas[action]}` },
      { role: "user", content: input }
    ] });
    return NextResponse.json({ result: response.choices[0]?.message?.content || "{}" });
  } catch (error) {
    console.error("autonomous novelist error", error);
    return NextResponse.json({ error: "The autonomous novelist could not complete that step." }, { status: 500 });
  }
}
