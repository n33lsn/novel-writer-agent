"use client";
import { useState } from "react";
import { BookOpen, FileText, Users, Globe2, Settings, Plus, Sparkles, Search, MoreHorizontal, Clock3 } from "lucide-react";

const chapters = ["The Last Garden", "A Door in the Rain", "The Cartographer's Secret", "Ashes and Honey", "The Shape of Home"];
const sample = `The rain had been falling for three days when Mara found the door.

It stood at the end of the orchard, where the old pear trees bent toward one another like conspirators. No wall surrounded it. No house waited on the other side. Just a door: green paint blistered by weather, brass handle bright as a coin at the bottom of a well.

Mara should have walked past. She had spent her whole life learning the difference between an invitation and a warning. But the door was humming, and beneath the rain she could hear someone whispering her name.`;

export default function Home() {
  const [view, setView] = useState("dashboard");
  const [prompt, setPrompt] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [selected, setSelected] = useState(0);
  const [wordCount, setWordCount] = useState(18420);
  const generate = async () => { if (!prompt.trim()) return; setSuggestion("Thinking about your story...\n\n" + prompt + "\n\nTry grounding this beat in a specific sensory detail, then let Mara make a choice that creates a new problem."); };
  return <div className="app">
    <aside className="sidebar"><div className="brand"><div className="brand-mark">i</div><span>inkstone</span></div><nav className="nav">
      <button className={view === "dashboard" ? "active" : ""} onClick={() => setView("dashboard")}><BookOpen size={17}/><span>My novels</span></button>
      <button className={view === "editor" ? "active" : ""} onClick={() => setView("editor")}><FileText size={17}/><span>Writer</span></button>
      <button><Users size={17}/><span>Characters</span></button><button><Globe2 size={17}/><span>World bible</span></button>
    </nav><div className="sidebar-bottom"><button className="nav"><Settings size={17}/><span>Settings</span></button></div></aside>
    <main className="main">
      {view === "dashboard" ? <><div className="topbar"><div><div className="eyebrow">Good evening, writer</div><h1>Your stories, in progress.</h1><div className="subtitle">Pick up where you left off or begin a new world.</div></div><div className="avatar">N</div></div>
        <div className="stats"><div className="card"><div className="stat-label">Words written</div><div className="stat-value">18,420</div><div className="stat-note">↑ 12% this week</div></div><div className="card"><div className="stat-label">Current streak</div><div className="stat-value">6 days</div><div className="stat-note">Keep the thread alive</div></div><div className="card"><div className="stat-label">Story progress</div><div className="stat-value">24%</div><div className="stat-note">Act I · The setup</div></div></div>
        <div className="section-head"><h2>Recent novels</h2><button className="link-btn">View all →</button></div><div className="projects"><div className="card project" onClick={() => setView("editor")}><span className="badge">FANTASY · DRAFT</span><h3>The Orchard at the End of Rain</h3><p>A girl discovers a door to a city that remembers every promise ever made.</p><div className="project-meta"><Clock3 size={13} style={{verticalAlign:"-2px"}}/> Edited 18 min ago</div></div><div className="card project"><span className="badge">LITERARY · IDEA</span><h3>The Quiet Between Trains</h3><p>Two strangers share a lifetime through notes left on a station bench.</p><div className="project-meta">Created yesterday</div></div><div className="card new-card" onClick={() => setView("editor")}><Plus className="plus" size={32}/><strong>Start a new novel</strong><small>Begin with a spark</small></div></div>
      </> : <><div className="topbar"><div><div className="eyebrow">The Orchard at the End of Rain</div><h1>Writer's room</h1><div className="subtitle">Chapter 1 · The Last Garden</div></div><div style={{display:"flex",gap:16,alignItems:"center"}}><button className="link-btn" onClick={() => setView("dashboard")}>← My novels</button><div className="avatar">N</div></div></div>
        <div className="workspace"><div className="card outline"><div className="panel-title">Manuscript · 5 chapters</div>{chapters.map((c,i)=><div key={c} className={`outline-item ${selected===i?"selected":""}`} onClick={()=>setSelected(i)}>{i+1}. {c}<span>{i===0?"1,248 words":"Outline ready"}</span></div>)}<button className="link-btn" style={{marginTop:16}}><Plus size={14} style={{verticalAlign:"-3px"}}/> Add chapter</button></div>
        <div className="card editor"><div className="editor-tools"><div className="tool-group"><button className="tool"><b>B</b></button><button className="tool"><i>I</i></button><button className="tool">☷</button></div><div className="tool-group"><button className="tool"><Search size={15}/></button><button className="tool"><MoreHorizontal size={17}/></button></div></div><h2>{chapters[selected]}</h2><div className="editor-text">{sample.split("\n\n").map((p,i)=><p key={i}>{p}</p>)}</div><div style={{color:"#98a39c",fontSize:12,marginTop:35}}>{wordCount.toLocaleString()} words · Saved just now</div></div>
        <div className="card ai-panel"><div className="ai-head"><div className="ai-icon"><Sparkles size={14}/></div> Story partner</div><p>I'm here to help you find the next true thing in the story. Ask me to brainstorm, deepen a character, or rewrite a passage.</p><textarea className="prompt" placeholder="What would you like to explore?" value={prompt} onChange={e=>setPrompt(e.target.value)}/><button className="primary" onClick={generate}><Sparkles size={14} style={{verticalAlign:"-2px"}}/> Ask Inkstone</button>{suggestion && <div style={{whiteSpace:"pre-wrap",marginTop:18,fontSize:13,lineHeight:1.6,color:"#496452"}}>{suggestion}</div>}</div></div></>}
    </main>
  </div>;
}
