import type { Metadata } from 'next';
import "../globals.css";
export const metadata: Metadata = {
  title: 'About — Branvoy Editorial Digital Marketing Agency',
  description: 'Learn about Branvoy\'s operating principles, quiet authority philosophy, and senior leadership team based in Dubai, UAE.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
