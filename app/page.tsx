"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpen, FileText, Users, Globe2, Settings, Plus, Sparkles, Download, Save, Menu, X } from "lucide-react";

type Chapter = { title: string; text: string };
const initialChapters: Chapter[] = [
  { title: "The Last Garden", text: "The rain had been falling for three days when Mara found the door.\n\nIt stood at the end of the orchard, where the old pear trees bent toward one another like conspirators. No wall surrounded it. No house waited on the other side. Just a door: green paint blistered by weather, brass handle bright as a coin at the bottom of a well.\n\nMara should have walked past. She had spent her whole life learning the difference between an invitation and a warning. But the door was humming, and beneath the rain she could hear someone whispering her name." },
  { title: "A Door in the Rain", text: "The key was warm in Mara's palm, though she had found it beneath the frozen roots." },
  { title: "The Cartographer's Secret", text: "Every map in the archive showed a different shape for the city." },
  { title: "Ashes and Honey", text: "By morning, the orchard smelled of smoke and summer." },
  { title: "The Shape of Home", text: "Some doors only open after you stop trying to return." },
];

const defaultCharacters = [{ name: "Mara Vale", role: "Protagonist", detail: "A guarded orchard keeper who can hear promises." }, { name: "Ilan", role: "Ally", detail: "A cartographer searching for the city he erased." }];

export default function Home() {
  const [view, setView] = useState("dashboard");
  const [chapters, setChapters] = useState<Chapter[]>(initialChapters);
  const [selected, setSelected] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);
  const [characters, setCharacters] = useState(defaultCharacters);
  const [newCharacter, setNewCharacter] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("inkstone-project");
    if (raw) { try { const data = JSON.parse(raw); setChapters(data.chapters || initialChapters); setCharacters(data.characters || defaultCharacters); } catch { /* use defaults */ } }
  }, []);
  const persist = (nextChapters = chapters, nextCharacters = characters) => { localStorage.setItem("inkstone-project", JSON.stringify({ chapters: nextChapters, characters: nextCharacters })); setSaved(true); };
  const current = chapters[selected];
  const words = useMemo(() => chapters.reduce((n, c) => n + c.text.trim().split(/\s+/).filter(Boolean).length, 0), [chapters]);
  const updateText = (text: string) => { const next = chapters.map((c, i) => i === selected ? { ...c, text } : c); setChapters(next); setSaved(false); };
  const addChapter = () => { const next = [...chapters, { title: `Chapter ${chapters.length + 1}`, text: "" }]; setChapters(next); setSelected(next.length - 1); persist(next); };
  const askInkstone = async () => {
    if (!prompt.trim()) return; setLoading(true); setSuggestion("");
    try { const response = await fetch("/api/assist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt, context: current.text }) }); const data = await response.json(); setSuggestion(data.text || "No suggestion generated."); } catch { setSuggestion("I couldn't reach the story partner. Check your connection and try again."); } finally { setLoading(false); }
  };
  const exportNovel = () => { const content = chapters.map((c, i) => `# Chapter ${i + 1}: ${c.title}\n\n${c.text}`).join("\n\n"); const url = URL.createObjectURL(new Blob([content], { type: "text/markdown" })); const a = document.createElement("a"); a.href = url; a.download = "the-orchard-at-the-end-of-rain.md"; a.click(); URL.revokeObjectURL(url); };
  const addCharacter = () => { if (!newCharacter.trim()) return; const next = [...characters, { name: newCharacter.trim(), role: "New character", detail: "Add this character's desire, wound, and contradiction." }]; setCharacters(next); setNewCharacter(""); persist(chapters, next); };
  const navigate = (next: string) => { setView(next); setMobileNav(false); };

  return <div className="app">
    <aside className={`sidebar ${mobileNav ? "open" : ""}`}><div className="brand"><div className="brand-mark">i</div><span>inkstone</span><button className="close-nav" onClick={() => setMobileNav(false)}><X size={18}/></button></div><nav className="nav">
      <button className={view === "dashboard" ? "active" : ""} onClick={() => navigate("dashboard")}><BookOpen size={17}/><span>My novels</span></button>
      <button className={view === "editor" ? "active" : ""} onClick={() => navigate("editor")}><FileText size={17}/><span>Writer</span></button>
      <button className={view === "characters" ? "active" : ""} onClick={() => navigate("characters")}><Users size={17}/><span>Characters</span></button>
      <button className={view === "world" ? "active" : ""} onClick={() => navigate("world")}><Globe2 size={17}/><span>World bible</span></button>
    </nav><div className="sidebar-bottom"><button className="nav"><Settings size={17}/><span>Settings</span></button></div></aside>
    {mobileNav && <div className="nav-overlay" onClick={() => setMobileNav(false)} />}
    <main className="main"><button className="mobile-menu" onClick={() => setMobileNav(true)}><Menu size={20}/></button>
      {view === "dashboard" && <><Header eyebrow="Good evening, writer" title="Your stories, in progress." subtitle="Pick up where you left off or begin a new world."/><div className="stats"><Stat label="Words written" value={words.toLocaleString()} note="↑ 12% this week"/><Stat label="Current streak" value="6 days" note="Keep the thread alive"/><Stat label="Story progress" value="24%" note="Act I · The setup"/></div><div className="section-head"><h2>Recent novels</h2></div><div className="projects"><div className="card project" onClick={() => navigate("editor")}><span className="badge">FANTASY · DRAFT</span><h3>The Orchard at the End of Rain</h3><p>A girl discovers a door to a city that remembers every promise ever made.</p><div className="project-meta">Edited just now</div></div><div className="card project"><span className="badge">LITERARY · IDEA</span><h3>The Quiet Between Trains</h3><p>Two strangers share a lifetime through notes left on a station bench.</p><div className="project-meta">Created yesterday</div></div><div className="card new-card" onClick={() => navigate("editor")}><Plus className="plus" size={32}/><strong>Start a new novel</strong><small>Begin with a spark</small></div></div></>}
      {view === "editor" && <><Header eyebrow="The Orchard at the End of Rain" title="Writer's room" subtitle={`Chapter ${selected + 1} · ${current.title}`} action={<><button className="link-btn" onClick={exportNovel}><Download size={15}/> Export</button><div className="avatar">N</div></>}/><div className="workspace"><div className="card outline"><div className="panel-title">Manuscript · {chapters.length} chapters</div>{chapters.map((c, i) => <div key={`${c.title}-${i}`} className={`outline-item ${selected === i ? "selected" : ""}`} onClick={() => setSelected(i)}>{i + 1}. {c.title}<span>{c.text.trim().split(/\s+/).filter(Boolean).length} words</span></div>)}<button className="link-btn add-button" onClick={addChapter}><Plus size={14}/> Add chapter</button></div><div className="card editor"><div className="editor-tools"><div className="tool-group"><button className="tool"><b>B</b></button><button className="tool"><i>I</i></button></div><div className="tool-group"><button className="tool" onClick={() => persist()} title="Save"><Save size={15}/></button><button className="tool" onClick={exportNovel} title="Export"><Download size={15}/></button></div></div><input className="chapter-title" value={current.title} onChange={e => { const next = chapters.map((c, i) => i === selected ? { ...c, title: e.target.value } : c); setChapters(next); setSaved(false); }}/><textarea className="editor-textarea" value={current.text} onChange={e => updateText(e.target.value)} onBlur={() => persist()} /><div className="editor-footer">{current.text.trim().split(/\s+/).filter(Boolean).length.toLocaleString()} words · {saved ? "Saved" : "Unsaved changes"}</div></div><div className="card ai-panel"><div className="ai-head"><div className="ai-icon"><Sparkles size={14}/></div> Story partner</div><p>Brainstorm, deepen a character, or revise a passage with context from this chapter.</p><textarea className="prompt" placeholder="What would you like to explore?" value={prompt} onChange={e => setPrompt(e.target.value)}/><button className="primary" onClick={askInkstone} disabled={loading}><Sparkles size={14}/> {loading ? "Thinking..." : "Ask Inkstone"}</button>{suggestion && <div className="suggestion">{suggestion}</div>}</div></div></>}
      {view === "characters" && <><Header eyebrow="Story bible" title="Characters" subtitle="Track the people who make your story matter."/><div className="section-head"><h2>Cast of characters</h2><div className="inline-form"><input value={newCharacter} onChange={e => setNewCharacter(e.target.value)} placeholder="Character name"/><button className="primary small" onClick={addCharacter}><Plus size={14}/> Add</button></div></div><div className="library-grid">{characters.map(c => <div className="card library-card" key={c.name}><span className="badge">{c.role}</span><h3>{c.name}</h3><p>{c.detail}</p></div>)}</div></>}
      {view === "world" && <><Header eyebrow="Story bible" title="World bible" subtitle="Keep the rules of your world close at hand."/><div className="library-grid"><div className="card library-card"><span className="badge">SETTING</span><h3>The Orchard</h3><p>An impossible garden at the border of the remembered and forgotten worlds. Its trees grow fruit containing other people's promises.</p></div><div className="card library-card"><span className="badge">RULE</span><h3>Promises have weight</h3><p>Every promise made in the city becomes physical. Broken promises return to the speaker as rain.</p></div><div className="card library-card"><span className="badge">OPEN THREAD</span><h3>The humming door</h3><p>What is on the other side, and why does it know Mara's name?</p></div></div></>}
    </main>
  </div>;
}

function Header({ eyebrow, title, subtitle, action }: { eyebrow: string; title: string; subtitle: string; action?: React.ReactNode }) { return <div className="topbar"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><div className="subtitle">{subtitle}</div></div><div className="top-actions">{action || <div className="avatar">N</div>}</div></div>; }
function Stat({ label, value, note }: { label: string; value: string; note: string }) { return <div className="card"><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className="stat-note">{note}</div></div>; }
