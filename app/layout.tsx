import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Inkstone — Novel Writer", description: "An intelligent workspace for writing unforgettable novels." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
