"use client";

import { FormEvent, useState } from "react";
import { createClient } from "../../lib/supabase-browser";
import Link from "next/link";

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [message, setMessage] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent) { event.preventDefault(); setBusy(true); setMessage("");
    const supabase = createClient(); const result = mode === "signin" ? await supabase.auth.signInWithPassword({ email, password }) : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth/callback` } });
    setBusy(false); if (result.error) setMessage(result.error.message); else setMessage(mode === "signup" ? "Check your email to confirm your account." : "Signed in. Return to your writing workspace.");
  }
  return <main className="auth-page"><div className="auth-card"><Link href="/" className="auth-brand"><span className="brand-mark">i</span> inkstone</Link><div className="eyebrow">Your private writing room</div><h1>{mode === "signin" ? "Welcome back." : "Create your writing room."}</h1><p className="subtitle">Your novels, characters, and story worlds—synced securely across devices.</p><form onSubmit={submit}><label>Email<input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></label><label>Password<input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 6 characters" /></label><button className="primary auth-submit" disabled={busy}>{busy ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"}</button></form>{message && <div className="auth-message">{message}</div>}<button className="auth-switch" onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setMessage(""); }}>{mode === "signin" ? "Need an account? Create one" : "Already have an account? Sign in"}</button></div></main>;
}
