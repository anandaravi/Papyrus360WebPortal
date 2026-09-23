'use client';

import { useEffect, useRef, useState } from 'react';

type Status = 'loading' | 'ready' | 'error';

/**
 * Renders each PDF page to a <canvas> instead of embedding the file in a
 * native <iframe>/<object> viewer. Canvases don't expose the browser's
 * built-in "Save As" / download controls that a native PDF viewer does.
 */
export function PoshPdfViewer({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

      try {
        const pdf = await pdfjsLib.getDocument(src).promise;
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = '';

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.className = 'w-full h-auto rounded-lg border border-border-dim mb-4 select-none pointer-events-none';
          const ctx = canvas.getContext('2d');
          if (!ctx) continue;
          await page.render({ canvasContext: ctx, viewport }).promise;
          if (cancelled) return;
          containerRef.current.appendChild(canvas);
        }

        if (!cancelled) setStatus('ready');
      } catch {
        if (!cancelled) setStatus('error');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [src]);

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className="max-h-[900px] overflow-y-auto rounded-xl border border-border bg-surface-2 p-4"
    >
      {status === 'loading' && (
        <p className="text-sm text-text-3 text-center py-24">Loading document&hellip;</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-400 text-center py-24">
          Could not load the document. Please try again later.
        </p>
      )}
      <div ref={containerRef} />
    </div>
  );
}
