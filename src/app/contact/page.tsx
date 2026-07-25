'use client';

import { useState, FormEvent } from 'react';
import { FadeUp } from '@/components/animations/FadeUp';
import { RevealText } from '@/components/animations/RevealText';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'Brand Strategy',
    budget: '$10k - $25k',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-ivory text-ink min-h-screen">
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-16">
          <FadeUp>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-primary font-bold">
              Start A Project
            </span>
          </FadeUp>
          <RevealText
            text="Let's talk about growth."
            as="h1"
            className="font-serif text-5xl sm:text-7xl lg:text-8xl mt-6 leading-[0.98]"
            delay={0.1}
            stagger={0.06}
          />
          <FadeUp delay={0.3}>
            <p className="mt-6 text-ink/85 text-lg md:text-xl font-light max-w-2xl">
              Tell us about your brand goals. We evaluate every inquiry within 24 business hours.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.4}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Form Container */}
            <div className="lg:col-span-7 bg-white/80 border border-ink/10 p-8 md:p-12 rounded-sm shadow-lg">
              {submitted ? (
                <div className="py-16 text-center space-y-6" aria-live="polite">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto text-2xl">
                    ✓
                  </div>
                  <h3 className="font-serif text-4xl text-ink">Inquiry Received</h3>
                  <p className="text-ink/70 max-w-md mx-auto text-sm leading-relaxed font-light">
                    Thank you for reaching out. A senior partner will review your brand details and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-mono font-bold uppercase tracking-wider text-primary hover:underline pt-4 cursor-pointer"
                  >
                    Send another message →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-xs uppercase font-mono tracking-wider font-bold text-ink/70 mb-2">
                        Your Name *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3.5 bg-sage-tint/30 border border-ink/15 rounded-sm text-ink placeholder-ink/30 focus:outline-none focus:border-primary transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs uppercase font-mono tracking-wider font-bold text-ink/70 mb-2">
                        Work Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="jane@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 bg-sage-tint/30 border border-ink/15 rounded-sm text-ink placeholder-ink/30 focus:outline-none focus:border-primary transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-xs uppercase font-mono tracking-wider font-bold text-ink/70 mb-2">
                        Company / Brand
                      </label>
                      <input
                        id="company"
                        type="text"
                        placeholder="Acme Corp"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3.5 bg-sage-tint/30 border border-ink/15 rounded-sm text-ink placeholder-ink/30 focus:outline-none focus:border-primary transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-xs uppercase font-mono tracking-wider font-bold text-ink/70 mb-2">
                        Primary Capability Needed
                      </label>
                      <select
                        id="service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3.5 bg-sage-tint/30 border border-ink/15 rounded-sm text-ink focus:outline-none focus:border-primary transition-colors text-sm"
                      >
                        <option>Brand Strategy</option>
                        <option>Performance Marketing</option>
                        <option>Content Architecture</option>
                        <option>Web &amp; Digital Experience</option>
                        <option>Full Agency Retainer</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-mono tracking-wider font-bold text-ink/70 mb-3">
                      Estimated Monthly Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {['$10k - $25k', '$25k - $50k', '$50k - $100k+', 'Project ($30k+)'].map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setFormData({ ...formData, budget: b })}
                          className={`py-2.5 px-3 text-xs font-mono rounded-sm border transition-all cursor-pointer ${
                            formData.budget === b
                              ? 'bg-ink text-ivory border-ink shadow-md'
                              : 'bg-sage-tint/30 text-ink/70 border-ink/15 hover:border-primary'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs uppercase font-mono tracking-wider font-bold text-ink/70 mb-2">
                      Project Overview *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      placeholder="Briefly describe your objectives, current channels, and timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3.5 bg-sage-tint/30 border border-ink/15 rounded-sm text-ink placeholder-ink/30 focus:outline-none focus:border-primary transition-colors text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-primary text-ivory font-semibold uppercase font-mono tracking-widest text-xs rounded-full hover:bg-ink transition-colors duration-300 shadow-xl shadow-primary/20 cursor-pointer"
                  >
                    Submit Inquiry →
                  </button>
                </form>
              )}
            </div>

            {/* Direct Details & Contact Info */}
            <div className="lg:col-span-5 space-y-10">
              <div className="bg-white/60 border border-ink/10 p-8 rounded-sm">
                <h3 className="font-serif text-3xl text-ink mb-4">Direct Inquiry</h3>
                <p className="text-ink/70 text-sm font-light leading-relaxed mb-6">
                  Prefer direct communication? Reach out via email or connect with our team on WhatsApp.
                </p>
                <div className="space-y-6 text-sm">
                  <div>
                    <span className="block text-xs font-mono text-ink/50 uppercase tracking-widest mb-1">Email</span>
                    <a href="mailto:branvoy.agency@gmail.com" className="text-lg font-serif text-primary hover:underline">
                      branvoy.agency@gmail.com
                    </a>
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-ink/60 uppercase tracking-widest mb-1">WhatsApp Direct</span>
                    <a
                      href="https://wa.me/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-primary hover:text-ivory transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      <span>Chat on WhatsApp →</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-ink text-ivory p-8 rounded-sm border border-ivory/10">
                <h3 className="font-serif text-3xl text-ivory mb-6">Agency Headquarters</h3>
                <div className="space-y-6 text-sm">
                  <div>
                    <span className="font-serif text-xl block text-primary mb-1">Faisalabad Studio</span>
                    <span className="text-ivory/60 text-xs block font-light">Faisalabad, Punjab, Pakistan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
