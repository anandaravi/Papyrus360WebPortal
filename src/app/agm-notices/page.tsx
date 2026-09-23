import { Download, FileText } from 'lucide-react';
import { pageMeta } from '@/lib/seo';
import { SITE } from '@/lib/constants';
import { agmNotices, formatAgmDate } from '@/lib/agm';

export const metadata = pageMeta({
  title: 'AGM Notices & Updates',
  path: '/agm-notices',
  description:
    'Annual General Meeting notices, postal ballot notices, annual reports, and shareholder updates published by Netique Infotech Pvt Ltd. (Papyrus360).',
});

export default function AgmNoticesPage() {
  return (
    <>
      {/* Hero */}
      <div className="border-b border-border bg-surface-2">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">
            Investor Relations
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            AGM Notices &amp; Updates
          </h1>
          <p className="text-text-2 text-base md:text-lg max-w-2xl leading-relaxed">
            Annual General Meeting notices, postal ballot notices, annual reports, and other
            statutory shareholder communications published by {SITE.company}.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        {agmNotices.length > 0 ? (
          <div className="rounded-2xl border border-border bg-surface divide-y divide-border overflow-hidden">
            {agmNotices.map((notice) => (
              <a
                key={notice.pdfUrl}
                href={notice.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-5 py-4 hover:bg-surface-2 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                  <FileText size={18} className="text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground group-hover:text-amber-400 transition-colors truncate">
                    {notice.title}
                  </p>
                  <p className="text-xs text-text-3 mt-0.5">
                    {notice.category} &middot; {formatAgmDate(notice.date)}
                  </p>
                </div>
                <Download size={16} className="text-text-3 shrink-0" />
              </a>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-surface p-16 text-center max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-5">
              <FileText size={22} className="text-amber-400" />
            </div>
            <h2 className="text-xl font-semibold mb-3">No notices published yet</h2>
            <p className="text-sm text-text-2 leading-relaxed">
              AGM notices, postal ballots, and shareholder updates will be published here as they
              are issued.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
