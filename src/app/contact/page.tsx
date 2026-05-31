'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { PageHero } from '@/components/ui/page-hero';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const subjects = [
  { value: 'general', label: 'General Enquiry' },
  { value: 'erp-demo', label: 'ERP Demo (Papyrus BP App)' },
  { value: 'consulting', label: 'Process / Compliance Consulting' },
  { value: 'partnership', label: 'Partnership' },
];

export default function ContactPage() {
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Send failed');
      setState('success');
    } catch {
      setState('error');
      setErrorMsg('Something went wrong. Please try again or email us directly.');
    }
  }

  if (state === 'success') {
    return (
      <div className="mx-auto max-w-lg px-4 sm:px-6 py-24 text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={26} className="text-emerald-400" />
        </div>
        <h1 className="text-2xl font-bold mb-3">Message sent</h1>
        <p className="text-text-2 mb-8">
          Thank you for reaching out. We&apos;ll get back to you within one business day.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors"
        >
          Back to home <ArrowRight size={14} />
        </a>
      </div>
    );
  }

  const inputClass =
    'w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-text-4 focus:outline-none focus:border-amber-500/60 transition-colors duration-200';

  return (
    <>
      <PageHero
        src="/images/contact/hero.png"
        alt="Contact Papyrus360"
        eyebrow="Contact"
        title="Start a conversation"
        description="Whether you're evaluating ERP for your paper mill, need deckle optimisation, or want to discuss compliance — we'd love to hear from you."
        height="sm"
      />
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left */}
        <div>

          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-text-3 mb-2">
                Email
              </p>
              <a
                href="mailto:info@papyrus360.com"
                className="text-sm text-text-2 hover:text-amber-400 transition-colors"
              >
                info@papyrus360.com
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-text-3 mb-2">
                Support
              </p>
              <a
                href="mailto:support@papyrus360.com"
                className="text-sm text-text-2 hover:text-amber-400 transition-colors"
              >
                support@papyrus360.com
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="amber-card rounded-2xl p-8 bg-surface">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-text-3 mb-1.5">
                  Full Name <span className="text-amber-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Vikram Singh"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-xs font-medium text-text-3 mb-1.5">
                  Company <span className="text-amber-500">*</span>
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  required
                  placeholder="Sunrise Paper Mills"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-text-3 mb-1.5">
                  Email <span className="text-amber-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="vikram@sunrisepaper.in"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs font-medium text-text-3 mb-1.5">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-medium text-text-3 mb-1.5">
                Subject <span className="text-amber-500">*</span>
              </label>
              <select
                id="subject"
                name="subject"
                required
                defaultValue=""
                className={`${inputClass} cursor-pointer`}
              >
                <option value="" disabled>
                  Select a subject
                </option>
                {subjects.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-medium text-text-3 mb-1.5">
                Message <span className="text-amber-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell us about your mill and what you're looking for..."
                className={`${inputClass} resize-none`}
              />
            </div>

            {state === 'error' && (
              <p className="text-sm text-red-400">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={state === 'submitting'}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-500 text-black font-semibold rounded-xl hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {state === 'submitting' ? 'Sending…' : 'Send Message'}
              {state !== 'submitting' && <ArrowRight size={16} />}
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
