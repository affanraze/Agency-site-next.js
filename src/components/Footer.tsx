'use client';

import Link from 'next/link';
import Image from 'next/image';

const footerLinks = {
  navigation: [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/work', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  services: [
    { href: '/services', label: 'Brand Strategy' },
    { href: '/services', label: 'Performance Marketing' },
    { href: '/services', label: 'Content Architecture' },
    { href: '/services', label: 'Web & Digital Product' },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-ink text-ivory border-t border-ivory/15">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-28">
        {/* Top Giant Brand Headline */}
        <div className="mb-20 pb-16 border-b border-ivory/10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/agency-logo-circle.png"
                alt="Branvoy"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full border border-primary/40"
              />
              <span className="font-serif text-3xl text-ivory">Branvoy</span>
            </div>
            <p className="font-serif text-3xl md:text-5xl text-ivory/90 max-w-2xl font-normal leading-tight">
              Evidence over noise. <span className="text-primary italic">Quiet authority.</span>
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-xs uppercase font-mono tracking-widest text-ivory/60 hover:text-primary transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <span className="w-10 h-10 rounded-full border border-ivory/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-ivory transition-all">
              ↑
            </span>
          </button>
        </div>

        {/* Middle Navigation & Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase font-mono tracking-[0.25em] text-primary mb-6 font-bold">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/70 hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase font-mono tracking-[0.25em] text-primary mb-6 font-bold">
              Capabilities
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/70 hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase font-mono tracking-[0.25em] text-primary mb-6 font-bold">
              Direct Contact
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:branvoy.agency@gmail.com"
                className="block text-ivory/70 hover:text-primary transition-colors"
              >
                branvoy.agency@gmail.com
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-ivory/70 hover:text-primary transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                <span>WhatsApp chat</span>
              </a>
            </div>
          </div>

          {/* Headquarters */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase font-mono tracking-[0.25em] text-primary mb-6 font-bold">
              Headquarters
            </h4>
            <div className="text-xs font-mono">
              <div className="text-ivory font-semibold mb-1">FAISALABAD, PK</div>
              <div className="text-ivory/50">PKT / UTC+5</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Socials & Icons */}
        <div className="pt-8 border-t border-ivory/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-ivory/40">
          <p>&copy; {new Date().getFullYear()} Branvoy Agency Ltd. All rights reserved.</p>

          {/* Social Links with Premium Inline SVGs */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/branvoy.agency"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-primary transition-colors duration-300"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>

            <a
              href="https://www.facebook.com/branvoy.agency"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-primary transition-colors duration-300"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/company/branvoy/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-primary transition-colors duration-300"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z" />
              </svg>
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
}
