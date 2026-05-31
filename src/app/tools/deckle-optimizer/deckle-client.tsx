'use client';

import { useState, useCallback } from 'react';
import { Plus, Trash2, Scissors, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

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

function generatePatterns(
  uniqueWidths: number[],
  deckle: number,
  maxKnives: number,
): Pattern[] {
  const results: Pattern[] = [];
  const sorted = [...uniqueWidths].sort((a, b) => a - b);

  function recurse(current: number[], startIdx: number) {
    if (current.length > 0) {
      const sum = current.reduce((a, b) => a + b, 0);
      const trim = deckle - sum;
      const counts: Record<number, number> = {};
      for (const w of current) counts[w] = (counts[w] ?? 0) + 1;
      results.push({ pieces: [...current].sort((a, b) => a - b), counts, sum, trim, trimPct: (trim / deckle) * 100 });
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

function solve(
  patterns: Pattern[],
  demands: Record<number, number>,
): SolutionRow[] {
  const remaining = { ...demands };
  const solution: SolutionRow[] = [];
  const MAX_ITER = 500;
  let iter = 0;

  while (iter++ < MAX_ITER) {
    const anyLeft = Object.values(remaining).some((d) => d > 0);
    if (!anyLeft) break;

    // Score each pattern: useful pieces = sum of min(count, remaining demand) for each width
    let bestPattern: Pattern | null = null;
    let bestScore = -1;
    let bestTrim = Infinity;

    for (const pat of patterns) {
      let score = 0;
      for (const [wStr, cnt] of Object.entries(pat.counts)) {
        const w = Number(wStr);
        score += Math.min(cnt, remaining[w] ?? 0);
      }
      if (score > bestScore || (score === bestScore && pat.trim < bestTrim)) {
        bestScore = score;
        bestTrim = pat.trim;
        bestPattern = pat;
      }
    }

    if (!bestPattern || bestScore === 0) break;

    // How many times to run: limited by the most constrained useful width
    let runs = Infinity;
    for (const [wStr, cnt] of Object.entries(bestPattern.counts)) {
      const w = Number(wStr);
      if ((remaining[w] ?? 0) > 0) {
        runs = Math.min(runs, Math.ceil((remaining[w] ?? 0) / cnt));
      }
    }
    if (!isFinite(runs) || runs <= 0) runs = 1;

    // Record useful production
    const useful: Record<number, number> = {};
    for (const [wStr, cnt] of Object.entries(bestPattern.counts)) {
      const w = Number(wStr);
      const produced = cnt * runs;
      const actualUseful = Math.min(produced, remaining[w] ?? 0);
      useful[w] = actualUseful;
      remaining[w] = Math.max(0, (remaining[w] ?? 0) - produced);
    }

    // Merge into existing solution row if same pattern
    const existingIdx = solution.findIndex(
      (r) => JSON.stringify(r.pattern.pieces) === JSON.stringify(bestPattern!.pieces),
    );
    if (existingIdx >= 0) {
      solution[existingIdx].sets += runs;
      for (const [wStr, u] of Object.entries(useful)) {
        const w = Number(wStr);
        solution[existingIdx].useful[w] = (solution[existingIdx].useful[w] ?? 0) + u;
      }
    } else {
      solution.push({ pattern: bestPattern, sets: runs, useful });
    }
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

const PIECE_BORDER_COLORS = [
  'border-amber-500/60',
  'border-sky-500/60',
  'border-emerald-500/60',
  'border-violet-500/60',
  'border-rose-500/60',
  'border-orange-400/60',
  'border-teal-500/60',
  'border-indigo-500/60',
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
const newRow = (): OrderRow => ({ id: ++_id, width: '', demand: '' });

export function DeckleClient() {
  const [deckle, setDeckle] = useState('4200');
  const [knives, setKnives] = useState('6');
  const [orders, setOrders] = useState<OrderRow[]>([newRow(), newRow()]);
  const [solution, setSolution] = useState<SolutionRow[] | null>(null);
  const [error, setError] = useState('');
  const [showAllPatterns, setShowAllPatterns] = useState(false);
  const [allPatterns, setAllPatterns] = useState<Pattern[]>([]);
  const [colorMap, setColorMap] = useState<Record<number, number>>({});

  const addOrder = () => setOrders((o) => o.length < 10 ? [...o, newRow()] : o);
  const removeOrder = (id: number) => setOrders((o) => o.filter((r) => r.id !== id));
  const updateOrder = (id: number, field: 'width' | 'demand', val: string) =>
    setOrders((o) => o.map((r) => (r.id === id ? { ...r, [field]: val } : r)));

  const run = useCallback(() => {
    setError('');
    setSolution(null);
    setAllPatterns([]);

    const d = parseFloat(deckle);
    const k = parseInt(knives);
    if (!d || d <= 0) return setError('Enter valid deckle width.');
    if (!k || k <= 0 || k > 20) return setError('Knives must be 1–20.');

    const validOrders = orders
      .map((r) => ({ width: parseFloat(r.width), demand: parseInt(r.demand) }))
      .filter((r) => r.width > 0 && r.demand > 0);

    if (validOrders.length === 0) return setError('Add at least one order with width and demand.');

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

    const patterns = generatePatterns(uniqueWidths, d, k);
    if (patterns.length === 0) return setError('No valid patterns found. Check that widths fit within deckle.');

    // Sort patterns by trim asc
    patterns.sort((a, b) => a.trim - b.trim);
    setAllPatterns(patterns);

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
          <div>
            <h2 className="text-xl font-bold mb-4">Slitter Patterns</h2>
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

          {/* All patterns toggle */}
          {allPatterns.length > 0 && (
            <div className="rounded-2xl border border-border bg-surface overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-foreground hover:bg-surface-2 transition-colors"
                onClick={() => setShowAllPatterns((v) => !v)}
              >
                <span>
                  All Valid Patterns ({allPatterns.length} total)
                </span>
                {showAllPatterns ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {showAllPatterns && (
                <div className="border-t border-border overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left bg-surface-2">
                        <th className="px-4 py-2.5 text-xs font-semibold text-text-3 uppercase tracking-wide">#</th>
                        <th className="px-4 py-2.5 text-xs font-semibold text-text-3 uppercase tracking-wide">Widths (mm)</th>
                        <th className="px-4 py-2.5 text-xs font-semibold text-text-3 uppercase tracking-wide">Sum</th>
                        <th className="px-4 py-2.5 text-xs font-semibold text-text-3 uppercase tracking-wide">Trim</th>
                        <th className="px-4 py-2.5 text-xs font-semibold text-text-3 uppercase tracking-wide">Trim %</th>
                        <th className="px-4 py-2.5 text-xs font-semibold text-text-3 uppercase tracking-wide">Knife Positions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allPatterns.map((pat, i) => (
                        <tr key={i} className="border-b border-border/50 hover:bg-surface-2 transition-colors">
                          <td className="px-4 py-2.5 tabular-nums text-text-3">{i + 1}</td>
                          <td className="px-4 py-2.5">
                            <div className="flex flex-wrap gap-1">
                              {Object.entries(pat.counts).map(([wStr, cnt]) => {
                                const w = Number(wStr);
                                const colorIdx = (colorMap[w] ?? 0) % PIECE_COLORS.length;
                                return (
                                  <span
                                    key={w}
                                    className={`text-xs px-1.5 py-0.5 rounded font-bold ${PIECE_COLORS[colorIdx]}`}
                                  >
                                    {cnt > 1 ? `${cnt}×` : ''}{w}
                                  </span>
                                );
                              })}
                            </div>
                          </td>
                          <td className="px-4 py-2.5 tabular-nums text-text-2">{pat.sum}</td>
                          <td className="px-4 py-2.5 tabular-nums text-text-2">{pat.trim}</td>
                          <td className={`px-4 py-2.5 tabular-nums font-medium ${pat.trimPct < 2 ? 'text-emerald-400' : pat.trimPct < 5 ? 'text-amber-400' : 'text-rose-400'}`}>
                            {pat.trimPct.toFixed(1)}%
                          </td>
                          <td className="px-4 py-2.5 font-mono text-xs text-text-3">
                            <KnifePositions pattern={pat} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
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
          <li>Green trim (&lt;2%) is excellent; amber (2–5%) is typical; red (&gt;5%) review order mix</li>
        </ul>
      </div>
    </div>
  );
}
