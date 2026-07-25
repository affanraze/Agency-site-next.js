import type { Metadata } from 'next';
import "../globals.css"
export const metadata: Metadata = {
  title: 'Capabilities & Services — Branvoy Agency',
  description: 'Explore Branvoy capabilities: Brand Strategy & Positioning, Performance Marketing & Paid Media, Content Architecture, and Web & Digital Product Design.',
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
