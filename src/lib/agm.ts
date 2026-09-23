export type AgmNotice = {
  title: string;
  /** ISO date, e.g. "2026-09-01" */
  date: string;
  category: 'AGM Notice' | 'Postal Ballot' | 'Annual Report' | 'Board Resolution' | 'Other';
  /** Path to the PDF under /public/documents/agm/, e.g. "/documents/agm/agm-2026-notice.pdf" */
  pdfUrl: string;
};

// Registry of published AGM notices and updates. To publish a new notice: drop
// the PDF into public/documents/agm/ and add an entry here (newest first).
export const agmNotices: AgmNotice[] = [];

export function formatAgmDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${d} ${months[m - 1]} ${y}`;
}
