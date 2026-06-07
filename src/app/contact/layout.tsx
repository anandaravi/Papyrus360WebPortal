import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Contact',
  path: '/contact',
  description:
    'Get in touch with Papyrus360 — talk to our team about ERP, deckle optimisation, consulting, compliance, and raw-material imports for your paper mill.',
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
