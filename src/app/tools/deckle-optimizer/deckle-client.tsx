'use client';

import { useState, useCallback } from 'react';
import { Plus, Trash2, Scissors, AlertCircle } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface OrderRow {
  id: number;
  width: string;
  demand: string;
}

interface Pattern {
  pieces: number[];          // widths in this pattern (sorted)
  counts: Record<number, number>; // width → count in this pattern
  sum: number;
  trim: number;
  trimPct: number;
}

interface SolutionRow {
  pattern: Pattern;
  sets: number;
  useful: Record<number, number>; // width → reels produced
}

// ─── Algorithm ───────────────────────────────────────────────────────────────

const MIN_UTILISATION = 0.80; // patterns below 80% deckle use are rejected

function generatePatterns(
  uniqueWidths: number[],
  deckle: number,
  maxKnives: number,
): Pattern[] {
  const results: Pattern[] = [];
  const sorted = [...uniqueWidths].sort((a, b) => a - b);
  const minSum = deckle * MIN_UTILISATION;
  const minWidth = sorted[0]; // smallest demanded width = max allowable trim

  function recurse(current: number[], startIdx: number) {
    if (current.length > 0) {
      const sum = current.reduce((a, b) => a + b, 0);
      const trim = deckle - sum;
      // Reject: below 80% utilisation OR trim >= smallest demanded width
      // (trim >= minWidth means another piece could have fit)
      if (sum >= minSum && trim < minWidth) {
        const counts: Record<number, number> = {};
        for (const w of current) counts[w] = (counts[w] ?? 0) + 1;
        results.push({ pieces: [...current].sort((a, b) => a - b), counts, sum, trim, trimPct: (trim / deckle) * 100 });
      }
    }
    if (current.length >= maxKnives) return;
    const currentSum = current.reduce((a, b) => a + b, 0);
    for (let i = startIdx; i < sorted.length; i++) {
      if (currentSum + sorted[i] <= deckle) {
        recurse([...current, sorted[i]], i);
      }
    }
  }

  recurse([], 0);
  return results;
}

const MAX_EXCESS_RATIO = 1.10; // total produced per width ≤ demand × 110%

function solve(
  patterns: Pattern[],
  demands: Record<number, number>,
): SolutionRow[] {
  const remaining = { ...demands };
  // Track total produced per width across all runs to enforce the 110% cap
  const totalProduced: Record<number, number> = {};
  const solution: SolutionRow[] = [];
  const MAX_ITER = 500;
  let iter = 0;

  const mergeIntoSolution = (pat: Pattern, runs: number, useful: Record<number, number>) => {
    const key = JSON.stringify(pat.pieces);
    const idx = solution.findIndex((r) => JSON.stringify(r.pattern.pieces) === key);
    if (idx >= 0) {
      solution[idx].sets += runs;
      for (const [wStr, u] of Object.entries(useful)) {
        const w = Number(wStr);
        solution[idx].useful[w] = (solution[idx].useful[w] ?? 0) + u;
      }
    } else {
      solution.push({ pattern: pat, sets: runs, useful });
    }
  };

  // Max additional runs a pattern can take before breaching 110% cap for any width
  const maxRunsByCap = (pat: Pattern): number => {
    let cap = Infinity;
    for (const [wStr, cnt] of Object.entries(pat.counts)) {
      const w = Number(wStr);
      const allowed = Math.floor((demands[w] * MAX_EXCESS_RATIO - (totalProduced[w] ?? 0)) / cnt);
      cap = Math.min(cap, Math.max(0, allowed));
    }
    return isFinite(cap) ? cap : 0;
  };

  while (iter++ < MAX_ITER) {
    if (Object.values(remaining).every((d) => d <= 0)) break;

    const deckleWidth = patterns.reduce((max, p) => Math.max(max, p.sum + p.trim), 1);
    let bestPattern: Pattern | null = null;
    let bestScore = -Infinity;

    for (const pat of patterns) {
      // Skip patterns that have already hit the 110% cap on any width
      if (maxRunsByCap(pat) === 0) continue;

      let useful = 0;
      let excess = 0;
      for (const [wStr, cnt] of Object.entries(pat.counts)) {
        const w = Number(wStr);
        const rem = remaining[w] ?? 0;
        useful += Math.min(cnt, rem);
        excess += Math.max(0, cnt - rem);
      }
      const trimPenalty = pat.trim / deckleWidth;
      const score = useful - 0.5 * excess - trimPenalty;
      if (score > bestScore) {
        bestScore = score;
        bestPattern = pat;
      }
    }

    if (!bestPattern || bestScore <= 0) break;

    // ── Run count ────────────────────────────────────────────────────────────
    // Lower of: floor-bulk runs (zero excess) and 110%-cap ceiling.
    let bulkRuns = Infinity;
    for (const [wStr, cnt] of Object.entries(bestPattern.counts)) {
      const w = Number(wStr);
      const rem = remaining[w] ?? 0;
      if (rem >= cnt) bulkRuns = Math.min(bulkRuns, Math.floor(rem / cnt));
    }
    const capRuns = maxRunsByCap(bestPattern);
    const runs = Math.min(isFinite(bulkRuns) && bulkRuns > 0 ? bulkRuns : 1, capRuns);
    if (runs <= 0) break;

    // Apply
    const useful: Record<number, number> = {};
    for (const [wStr, cnt] of Object.entries(bestPattern.counts)) {
      const w = Number(wStr);
      const produced = cnt * runs;
      totalProduced[w] = (totalProduced[w] ?? 0) + produced;
      const actualUseful = Math.min(produced, remaining[w] ?? 0);
      useful[w] = actualUseful;
      remaining[w] = Math.max(0, (remaining[w] ?? 0) - produced);
    }

    mergeIntoSolution(bestPattern, runs, useful);
  }

  return solution;
}

// ─── Colors ──────────────────────────────────────────────────────────────────

const PIECE_COLORS = [
  'bg-amber-500 text-black',
  'bg-sky-500 text-white',
  'bg-emerald-500 text-white',
  'bg-violet-500 text-white',
  'bg-rose-500 text-white',
  'bg-orange-400 text-black',
  'bg-teal-500 text-white',
  'bg-indigo-500 text-white',
];


// ─── Visual Pattern Bar ───────────────────────────────────────────────────────

function PatternBar({
  pattern,
  deckle,
  colorMap,
}: {
  pattern: Pattern;
  deckle: number;
  colorMap: Record<number, number>;
}) {
  return (
    <div className="relative w-full h-12 rounded-lg overflow-hidden border border-border flex">
      {pattern.pieces.map((w, i) => {
        const pct = (w / deckle) * 100;
        const colorIdx = colorMap[w] % PIECE_COLORS.length;
        return (
          <div
            key={i}
            className={`h-full flex items-center justify-center text-[10px] font-bold shrink-0 border-r border-black/20 ${PIECE_COLORS[colorIdx]}`}
            style={{ width: `${pct}%` }}
            title={`${w} mm`}
          >
            {pct > 6 ? `${w}` : ''}
          </div>
        );
      })}
      {/* Trim loss */}
      {pattern.trim > 0 && (
        <div
          className="h-full shrink-0 bg-repeating-linear flex items-center justify-center"
          style={{
            width: `${(pattern.trim / deckle) * 100}%`,
            background: 'repeating-linear-gradient(45deg, #333 0px, #333 2px, #1a1a1a 2px, #1a1a1a 8px)',
          }}
          title={`Trim: ${pattern.trim} mm`}
        >
          {(pattern.trim / deckle) * 100 > 5 && (
            <span className="text-[9px] text-text-3 font-mono">{pattern.trim}</span>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Knife Positions ─────────────────────────────────────────────────────────

function KnifePositions({ pattern }: { pattern: Pattern }) {
  let pos = 0;
  const positions: number[] = [];
  for (const w of pattern.pieces) {
    pos += w;
    positions.push(pos);
  }
  // Last position is deckle edge, not a real knife
  positions.pop();
  return (
    <span className="font-mono text-xs text-text-2">
      {positions.length === 0 ? '—' : positions.join(' | ')} mm
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

let _id = 0;
const newRow = (width = '', demand = ''): OrderRow => ({ id: ++_id, width, demand });

// Pool of plausible mill widths — 450 mm to 1200 mm in 50 mm steps
const WIDTH_POOL = [450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950,
  1000, 1050, 1100, 1150, 1200];

function randomSamples(): OrderRow[] {
  const pool = [...WIDTH_POOL].sort(() => Math.random() - 0.5).slice(0, 4);
  pool.sort((a, b) => a - b);
  return pool.map((w) => newRow(String(w), String(Math.floor(Math.random() * 25 + 5) * 5)));
}

export function DeckleClient() {
  const [deckle, setDeckle] = useState('4200');
  const [knives, setKnives] = useState('8');
  const [orders, setOrders] = useState<OrderRow[]>(() => randomSamples());
  const [solution, setSolution] = useState<SolutionRow[] | null>(null);
  const [demands, setDemands] = useState<Record<number, number>>({});
  const [error, setError] = useState('');
  const [colorMap, setColorMap] = useState<Record<number, number>>({});
  const [patternsOpen, setPatternsOpen] = useState(false);

  const addOrder = () => setOrders((o) => {
    if (o.length >= 10) return o;
    const used = new Set(o.map((r) => r.width));
    const candidates: number[] = [];
    for (let w = 400; w <= 800; w += 10) {
      if (!used.has(String(w))) candidates.push(w);
    }
    const width = candidates.length > 0
      ? String(candidates[Math.floor(Math.random() * candidates.length)])
      : '';
    const demand = String(Math.floor(Math.random() * 10 + 1) * 10); // 10–100 in multiples of 10
    return [...o, newRow(width, demand)];
  });
  const removeOrder = (id: number) => setOrders((o) => o.filter((r) => r.id !== id));
  const updateOrder = (id: number, field: 'width' | 'demand', val: string) =>
    setOrders((o) => o.map((r) => (r.id === id ? { ...r, [field]: val } : r)));

  const run = useCallback(() => {
    setError('');
    setSolution(null);
    setDemands({});

    const d = parseFloat(deckle);
    const k = parseInt(knives);
    if (!d || d <= 0) return setError('Enter valid deckle width.');
    if (!k || k <= 0 || k > 20) return setError('Knives must be 1–20.');

    const validOrders = orders
      .map((r) => ({ width: parseFloat(r.width), demand: parseInt(r.demand) }))
      .filter((r) => r.width > 0 && r.demand > 0);

    if (validOrders.length === 0) return setError('Add at least one order with width and demand.');
    if (validOrders.length > 10) return setError('Maximum 10 order widths allowed.');

    const tooWide = validOrders.find((r) => r.width > d);
    if (tooWide) return setError(`Width ${tooWide.width} mm exceeds deckle ${d} mm.`);

    const uniqueWidths = [...new Set(validOrders.map((r) => r.width))];
    const demands: Record<number, number> = {};
    for (const o of validOrders) {
      demands[o.width] = (demands[o.width] ?? 0) + o.demand;
    }

    // Build color map
    const cm: Record<number, number> = {};
    uniqueWidths.forEach((w, i) => { cm[w] = i; });
    setColorMap(cm);
    setDemands(demands);

    const patterns = generatePatterns(uniqueWidths, d, k);
    if (patterns.length === 0) return setError(`No patterns reach 80% deckle utilisation (≥${Math.round(d * MIN_UTILISATION)} mm). Add wider widths or reduce deckle.`);

    patterns.sort((a, b) => a.trim - b.trim);

    const sol = solve(patterns, demands);
    if (sol.length === 0) return setError('No solution found.');
    setSolution(sol);
  }, [deckle, knives, orders]);

  const totalSets = solution?.reduce((a, r) => a + r.sets, 0) ?? 0;
  const totalTrim = solution?.reduce((a, r) => a + r.sets * r.pattern.trim, 0) ?? 0;
  const totalArea = solution ? parseFloat(deckle) * totalSets : 0;
  const trimPct = totalArea > 0 ? ((totalTrim / totalArea) * 100).toFixed(1) : '0';

  const validOrderWidths = orders
    .map((r) => parseFloat(r.width))
    .filter((w) => w > 0 && !isNaN(w));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 space-y-10">
      {/* ── Inputs ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Machine params */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-surface p-6 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Scissors size={18} />
            </span>
            <h2 className="font-semibold text-foreground">Machine Settings</h2>
          </div>

          <div className="space-y-4">
            <label className="block">
              <span className="text-xs text-text-3 uppercase tracking-wider font-semibold">
                Deckle Width (mm)
              </span>
              <input
                type="number"
                min={100}
                max={20000}
                className="mt-1.5 block w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-foreground text-sm outline-none focus:border-amber-500/60 transition-colors"
                placeholder="e.g. 4200"
                value={deckle}
                onChange={(e) => setDeckle(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-xs text-text-3 uppercase tracking-wider font-semibold">
                Number of Knives
              </span>
              <input
                type="number"
                min={1}
                max={20}
                className="mt-1.5 block w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-foreground text-sm outline-none focus:border-amber-500/60 transition-colors"
                placeholder="e.g. 6"
                value={knives}
                onChange={(e) => setKnives(e.target.value)}
              />
              <p className="mt-1 text-[11px] text-text-3">
                Max pieces per set = number of knives
              </p>
            </label>
          </div>

          {/* Legend */}
          {validOrderWidths.length > 0 && (
            <div className="pt-2 border-t border-border space-y-1.5">
              <p className="text-xs text-text-3 uppercase tracking-wider font-semibold mb-2">
                Width Legend
              </p>
              {validOrderWidths.map((w) => {
                const idx = (colorMap[w] ?? 0) % PIECE_COLORS.length;
                return (
                  <div key={w} className="flex items-center gap-2">
                    <span className={`w-4 h-4 rounded ${PIECE_COLORS[idx].split(' ')[0]} shrink-0`} />
                    <span className="text-sm text-text-2 tabular-nums">{w} mm</span>
                  </div>
                );
              })}
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="w-4 h-4 rounded shrink-0"
                  style={{
                    background: 'repeating-linear-gradient(45deg, #333 0px, #333 2px, #1a1a1a 2px, #1a1a1a 8px)',
                  }}
                />
                <span className="text-sm text-text-3">Trim Loss</span>
              </div>
            </div>
          )}
        </div>

        {/* Order widths */}
        <div className="lg:col-span-3 rounded-2xl border border-border bg-surface p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Order Widths</h2>
            <button
              onClick={addOrder}
              disabled={orders.length >= 10}
              className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors border border-amber-500/30 rounded-lg px-3 py-1.5 hover:border-amber-500/60 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus size={13} />
              Add Width
            </button>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-[1fr_1fr_auto] gap-3 pb-1">
              <span className="text-[11px] text-text-3 uppercase tracking-wider font-semibold px-1">
                Width (mm)
              </span>
              <span className="text-[11px] text-text-3 uppercase tracking-wider font-semibold px-1">
                Demand (reels)
              </span>
              <span />
            </div>

            {orders.map((row) => (
              <div key={row.id} className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center">
                <input
                  type="number"
                  min={1}
                  placeholder="e.g. 1000"
                  className="rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-foreground outline-none focus:border-amber-500/60 transition-colors w-full"
                  value={row.width}
                  onChange={(e) => updateOrder(row.id, 'width', e.target.value)}
                />
                <input
                  type="number"
                  min={1}
                  placeholder="e.g. 20"
                  className="rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-foreground outline-none focus:border-amber-500/60 transition-colors w-full"
                  value={row.demand}
                  onChange={(e) => updateOrder(row.id, 'demand', e.target.value)}
                />
                <button
                  onClick={() => removeOrder(row.id)}
                  className="text-text-3 hover:text-rose-400 transition-colors p-2"
                  disabled={orders.length <= 1}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
              <AlertCircle size={14} className="shrink-0" />
              {error}
            </div>
          )}

          <button
            onClick={run}
            className="mt-auto w-full rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm py-2.5 transition-colors"
          >
            Optimize Patterns
          </button>
        </div>
      </div>

      {/* ── Solution ── */}
      {solution && (
        <div className="space-y-6">
          {/* Summary stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Patterns', value: solution.length },
              { label: 'Total Sets', value: totalSets },
              { label: 'Total Trim (mm)', value: totalTrim.toLocaleString() },
              { label: 'Avg Trim Loss', value: `${trimPct}%` },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border bg-surface p-4 text-center"
              >
                <div className="text-2xl font-bold text-amber-400 tabular-nums">{s.value}</div>
                <div className="text-xs text-text-3 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Pattern cards */}
          <div className="rounded-2xl border border-border bg-surface overflow-hidden">
            <button
              onClick={() => setPatternsOpen((v) => !v)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-surface-2 transition-colors"
            >
              <div className="flex items-center gap-3">
                <h2 className="text-base font-semibold text-foreground">Slitter Patterns</h2>
                <span className="text-xs text-text-3 bg-surface-2 border border-border rounded-full px-2 py-0.5">
                  {solution.length} pattern{solution.length !== 1 ? 's' : ''} · {totalSets} sets
                </span>
              </div>
              <svg
                className={`w-4 h-4 text-text-3 transition-transform ${patternsOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {patternsOpen && (
            <div className="border-t border-border p-5 space-y-4">
            <div className="space-y-4">
              {solution.map((row, i) => {
                const excess = Object.entries(row.pattern.counts)
                  .map(([wStr, cnt]) => {
                    const w = Number(wStr);
                    const produced = cnt * row.sets;
                    const useful = row.useful[w] ?? 0;
                    return produced - useful;
                  })
                  .reduce((a, b) => a + b, 0);

                return (
                  <div
                    key={i}
                    className="rounded-2xl border border-border bg-surface p-5 space-y-4"
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-0.5">
                          Pattern {i + 1}
                        </span>
                        <span className="text-sm font-semibold text-foreground tabular-nums">
                          × {row.sets} sets
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="text-text-2">
                          Trim:{' '}
                          <span
                            className={
                              row.pattern.trimPct < 2
                                ? 'text-emerald-400'
                                : row.pattern.trimPct < 5
                                ? 'text-amber-400'
                                : 'text-rose-400'
                            }
                          >
                            {row.pattern.trim} mm ({row.pattern.trimPct.toFixed(1)}%)
                          </span>
                        </span>
                        {excess > 0 && (
                          <span className="text-text-3 text-xs">+{excess} excess reels</span>
                        )}
                      </div>
                    </div>

                    {/* Visual bar */}
                    <PatternBar
                      pattern={row.pattern}
                      deckle={parseFloat(deckle)}
                      colorMap={colorMap}
                    />

                    {/* Knife positions */}
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <span className="text-text-3 text-xs uppercase tracking-wider font-semibold">
                        Knife positions:
                      </span>
                      <KnifePositions pattern={row.pattern} />
                    </div>

                    {/* Pieces table */}
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border text-left">
                            <th className="pb-2 pr-4 text-xs font-semibold text-text-3 uppercase tracking-wide">
                              Width
                            </th>
                            <th className="pb-2 pr-4 text-xs font-semibold text-text-3 uppercase tracking-wide">
                              Qty/Set
                            </th>
                            <th className="pb-2 pr-4 text-xs font-semibold text-text-3 uppercase tracking-wide">
                              Total Produced
                            </th>
                            <th className="pb-2 text-xs font-semibold text-text-3 uppercase tracking-wide">
                              Excess
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(row.pattern.counts).map(([wStr, cnt]) => {
                            const w = Number(wStr);
                            const produced = cnt * row.sets;
                            const useful = row.useful[w] ?? 0;
                            const exc = produced - useful;
                            const colorIdx = (colorMap[w] ?? 0) % PIECE_COLORS.length;
                            return (
                              <tr key={w} className="border-b border-border/40">
                                <td className="py-2 pr-4">
                                  <span
                                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold ${PIECE_COLORS[colorIdx]}`}
                                  >
                                    {w} mm
                                  </span>
                                </td>
                                <td className="py-2 pr-4 tabular-nums text-foreground">{cnt}</td>
                                <td className="py-2 pr-4 tabular-nums text-foreground">
                                  {produced}
                                </td>
                                <td className="py-2 tabular-nums">
                                  <span
                                    className={
                                      exc > 0 ? 'text-amber-400' : 'text-emerald-400'
                                    }
                                  >
                                    {exc > 0 ? `+${exc}` : '0'}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
            </div>
            )}
          </div>

          {/* Demand & Fulfillment */}
          {Object.keys(demands).length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Demand &amp; Fulfillment</h2>
              <div className="rounded-2xl border border-border bg-surface overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-surface-2">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-text-3 uppercase tracking-wide">Width</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-text-3 uppercase tracking-wide">Demanded</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-text-3 uppercase tracking-wide">Produced</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-text-3 uppercase tracking-wide">Fulfilled</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-text-3 uppercase tracking-wide">Excess</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-text-3 uppercase tracking-wide min-w-[140px]">Fulfillment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(demands).map(([wStr, demanded]) => {
                        const w = Number(wStr);
                        const colorIdx = (colorMap[w] ?? 0) % PIECE_COLORS.length;
                        const produced = solution!.reduce((acc, r) => acc + (r.pattern.counts[w] ?? 0) * r.sets, 0);
                        const fulfilled = solution!.reduce((acc, r) => acc + (r.useful[w] ?? 0), 0);
                        const excess = produced - fulfilled;
                        const pct = Math.min((fulfilled / demanded) * 100, 100);
                        const isCritical = pct < 90;
                        const isShort = pct < 100;
                        const barColor = isCritical ? 'bg-rose-500' : isShort ? 'bg-amber-500' : 'bg-emerald-500';
                        const textColor = isCritical ? 'text-rose-400' : isShort ? 'text-amber-400' : 'text-emerald-400';
                        return (
                          <tr key={w} className="border-b border-border/50">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${PIECE_COLORS[colorIdx]}`}>
                                  {w} mm
                                </span>
                                {isCritical && (
                                  <span className="text-[10px] font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded px-1.5 py-0.5">
                                    &lt;90%
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3 tabular-nums text-right text-foreground">{demanded}</td>
                            <td className="px-4 py-3 tabular-nums text-right text-foreground">{produced}</td>
                            <td className={`px-4 py-3 tabular-nums text-right font-semibold ${textColor}`}>
                              {fulfilled}
                            </td>
                            <td className="px-4 py-3 tabular-nums text-right text-text-2">
                              {excess > 0 ? `+${excess}` : '—'}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 rounded-full bg-surface-3 overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all ${barColor}`}
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                                <span className={`text-xs tabular-nums font-medium w-10 text-right ${textColor}`}>
                                  {Math.floor(pct)}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 py-3 border-t border-border bg-surface-2/60 text-xs text-text-4">
                  Target: ≥90% fulfillment per width. Amber = short but ≥90%. Red badge = below 90% — adjust order mix or increase knife count.
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Info ── */}
      <div className="rounded-2xl border border-border bg-surface-2 p-6 space-y-3">
        <h3 className="font-semibold text-foreground">How it works</h3>
        <p className="text-sm text-text-2 leading-relaxed">
          The optimizer generates all valid knife-setting combinations that fit within your deckle
          width (using at most the specified number of knives), then solves the{' '}
          <span className="text-text-1">cutting stock problem</span> using a greedy algorithm —
          repeatedly selecting the pattern with the lowest trim loss that reduces remaining demand.
        </p>
        <ul className="text-sm text-text-3 space-y-1 list-disc list-inside">
          <li>Knife positions show cumulative widths from the operator side</li>
          <li>Excess reels are produced when demand is not divisible evenly</li>
          <li>Only patterns using ≥80% of deckle width are considered — patterns below that threshold are discarded</li>
          <li>Green trim (&lt;2%) is excellent; amber (2–5%) is typical; red (&gt;5%) review order mix</li>
        </ul>
      </div>
    </div>
  );
}
