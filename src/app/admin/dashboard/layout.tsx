'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

const navItems = [
  { href: '/admin/dashboard', label: 'Overview', icon: '◈' },
  { href: '/admin/dashboard/team', label: 'Team', icon: '👤' },
  { href: '/admin/dashboard/services', label: 'Services', icon: '⚡' },
  { href: '/admin/dashboard/projects', label: 'Projects', icon: '◎' },
  { href: '/admin/dashboard/pricing', label: 'Pricing', icon: '$' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin');
  };

  const currentNav = navItems.find((item) => item.href === pathname) || navItems[0];

  return (
    <div className="min-h-screen bg-[#0a120a] text-ivory flex flex-col md:flex-row">
      {/* Mobile Top Navigation Header (< md) */}
      <header className="md:hidden sticky top-0 z-50 bg-ink border-b border-ivory/10 px-4 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <Image
            src="/agency-logo-circle.png"
            alt="Branvoy"
            width={32}
            height={32}
            className="rounded-full border border-primary/40"
          />
          <div>
            <div className="font-serif text-base text-ivory leading-tight">Branvoy</div>
            <div className="text-[9px] font-mono uppercase tracking-widest text-primary">
              {currentNav.label}
            </div>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded bg-ivory/10 text-ivory text-xs font-mono flex items-center gap-1.5 focus:outline-none"
          aria-label="Toggle Dashboard Menu"
        >
          <span>{mobileMenuOpen ? '✕ Close' : '☰ Menu'}</span>
        </button>
      </header>

      {/* Mobile Menu Drawer Overlay (< md) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[57px] bg-ink/95 backdrop-blur-md z-40 flex flex-col justify-between p-6 border-b border-ivory/10">
          <nav className="space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-widest text-ivory/40 mb-3">
              Dashboard Navigation
            </div>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded text-sm transition-all ${
                    isActive
                      ? 'bg-primary text-ivory font-semibold shadow-md'
                      : 'text-ivory/70 hover:text-ivory hover:bg-ivory/5'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-ivory/10 flex items-center justify-between">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-mono text-primary hover:underline"
            >
              View Live Site ↗
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono rounded"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Desktop Sidebar (≥ md) */}
      <aside className="hidden md:flex w-64 bg-ink border-r border-ivory/10 flex-col fixed inset-y-0 z-40">
        <div className="p-6 border-b border-ivory/10">
          <div className="flex items-center gap-3">
            <Image
              src="/agency-logo-circle.png"
              alt="Branvoy"
              width={36}
              height={36}
              className="rounded-full border border-primary/40"
            />
            <div>
              <div className="font-serif text-lg text-ivory">Branvoy</div>
              <div className="text-[9px] font-mono uppercase tracking-widest text-primary">
                Site Manager
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/20 text-primary border border-primary/30 font-semibold'
                    : 'text-ivory/60 hover:text-ivory hover:bg-ivory/5'
                }`}
              >
                <span className="text-base w-5 text-center">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-ivory/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="block text-center text-xs font-mono text-ivory/40 hover:text-primary transition-colors py-1"
          >
            View Live Site ↗
          </Link>
          <button
            onClick={handleLogout}
            className="w-full py-2.5 text-xs font-mono uppercase tracking-widest text-ivory/40 hover:text-red-400 transition-colors text-left px-3.5 rounded hover:bg-red-500/10"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area — responsive margin on desktop */}
      <main className="flex-1 md:ml-64 min-h-screen p-4 sm:p-6 md:p-8 lg:p-10 w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
