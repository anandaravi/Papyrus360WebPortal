"use client";

import { useRef, useState } from "react";
import { Plus, Minus, RotateCcw } from "lucide-react";
import type { Client } from "@/lib/clients";
import { INDIA_BBOX } from "@/lib/clients";

const MAP_W = 900;
const MAP_H = 480;

function project(lat: number, lon: number) {
  const { minLon, maxLon, minLat, maxLat } = INDIA_BBOX;
  const x = ((lon - minLon) / (maxLon - minLon)) * MAP_W;
  const y = MAP_H - ((lat - minLat) / (maxLat - minLat)) * MAP_H;
  return { x, y };
}

function poly(points: [number, number][]) {
  return (
    points
      .map(([lat, lon], i) => {
        const { x, y } = project(lat, lon);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ") + " Z"
  );
}

// India outline per Government of India norms (Karakoram → Aksai Chin → Arunachal)
const INDIA_OUTLINE: [number, number][] = [
  [37.0, 75.0], [37.0, 76.0], [36.5, 76.5], [36.0, 77.0], [35.7, 77.5], [35.5, 78.0],
  [35.4, 78.6], [35.2, 79.4], [34.9, 79.7], [34.6, 79.5], [34.2, 79.0], [33.8, 78.7], [33.5, 79.0], [33.0, 78.8],
  [32.5, 78.5], [32.0, 78.6], [31.5, 78.9], [31.0, 79.2],
  [30.5, 80.0], [30.0, 80.3], [29.5, 80.5], [28.8, 81.0], [28.3, 82.0], [27.8, 83.5], [27.5, 85.0], [27.2, 86.5], [27.0, 87.0], [27.0, 88.0],
  [27.3, 88.4], [27.6, 88.6], [27.3, 89.0], [27.0, 89.5], [27.0, 90.5], [26.8, 91.5], [26.7, 92.0],
  [27.2, 92.5], [27.8, 93.5], [28.4, 94.5], [28.8, 95.5], [29.3, 96.5], [29.0, 97.0], [28.3, 97.4], [27.8, 97.2], [27.0, 96.7], [26.5, 95.5],
  [25.7, 95.2], [24.8, 94.7], [24.0, 94.2], [23.4, 93.8], [22.8, 93.4], [22.0, 93.0], [21.9, 92.7], [22.0, 92.3], [22.5, 92.0], [23.5, 92.2], [24.2, 92.5],
  [24.5, 92.2], [24.7, 91.5], [25.0, 90.7], [25.2, 89.8], [24.7, 89.0], [23.5, 88.7], [22.8, 88.5], [22.0, 88.6],
  [21.5, 88.0], [21.6, 87.0], [20.7, 86.7], [19.7, 85.5], [19.0, 85.0], [18.0, 83.8],
  [17.5, 83.3], [16.5, 82.0], [15.7, 80.7], [14.5, 80.2], [13.5, 80.3], [13.0, 80.3],
  [12.0, 80.0], [11.0, 79.8], [10.3, 79.8], [9.5, 79.0], [8.8, 78.5], [8.3, 77.9], [8.07, 77.55],
  [8.3, 77.0], [8.7, 76.7], [9.5, 76.4], [10.5, 76.0], [11.5, 75.5], [12.3, 75.0], [13.0, 74.7],
  [13.8, 74.5], [14.5, 74.2], [15.2, 73.8], [15.8, 73.5], [16.7, 73.2], [17.5, 73.0], [18.5, 72.9], [19.0, 72.8], [19.7, 72.7], [20.4, 72.8],
  [20.8, 72.7], [21.2, 72.5], [21.7, 72.2], [22.0, 71.5], [22.0, 70.0], [22.3, 69.0], [22.0, 68.7], [21.8, 68.3], [22.3, 68.5], [22.8, 68.5], [23.4, 68.5],
  [23.6, 69.0], [23.7, 70.0], [24.0, 70.5], [24.5, 71.0], [25.0, 70.5], [25.5, 70.5], [26.0, 70.3],
  [26.8, 70.0], [27.5, 70.2], [28.2, 70.5], [29.0, 71.5], [29.7, 73.0], [30.2, 73.8], [30.8, 74.5],
  [31.5, 74.8], [32.0, 74.5], [32.5, 74.0], [33.0, 73.8], [33.5, 73.7], [34.0, 73.8], [34.5, 73.5], [35.0, 73.5], [35.5, 74.0], [36.0, 74.5], [36.5, 74.8], [37.0, 75.0],
];

const SAUDI_OUTLINE: [number, number][] = [
  [32, 39], [32, 47], [29, 48], [26, 50], [22, 52], [19, 52], [17, 51],
  [16, 47], [17, 43], [21, 39], [25, 36], [29, 35], [31, 36], [32, 39],
];

const UAE_OUTLINE: [number, number][] = [
  [26, 51], [26, 56], [25, 56], [23, 56], [22, 55], [22, 51], [24, 51], [26, 51],
];

const HQ = { lat: 12.9716, lon: 77.5946 };

const ZOOM_MIN = 1;
const ZOOM_MAX = 5;
const ZOOM_STEP = 0.5;

export function InteractiveMap({ clients }: { clients: Client[] }) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);

  // Group clients by city
  const byCity = new Map<string, Client[]>();
  for (const c of clients) {
    const key = `${c.city}-${c.country}`;
    const arr = byCity.get(key) || [];
    arr.push(c);
    byCity.set(key, arr);
  }

  const zoomIn = () => setZoom((z) => Math.min(z + ZOOM_STEP, ZOOM_MAX));
  const zoomOut = () => setZoom((z) => Math.max(z - ZOOM_STEP, ZOOM_MIN));
  const reset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // ViewBox tracks zoom + pan
  const vbW = MAP_W / zoom;
  const vbH = MAP_H / zoom;
  const vbX = (MAP_W - vbW) / 2 - pan.x / zoom;
  const vbY = (MAP_H - vbH) / 2 - pan.y / zoom;

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
    setZoom((z) => Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, z + delta)));
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !dragStart.current) return;
    setPan({
      x: dragStart.current.panX + (e.clientX - dragStart.current.x),
      y: dragStart.current.panY + (e.clientY - dragStart.current.y),
    });
  };
  const onMouseUp = () => {
    setDragging(false);
    dragStart.current = null;
  };

  const hq = project(HQ.lat, HQ.lon);

  return (
    <div className="relative">
      <svg
        viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
        className="w-full h-auto select-none"
        style={{ maxHeight: 560, cursor: dragging ? "grabbing" : "grab" }}
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <defs>
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#ffffff05" strokeWidth="1" />
          </pattern>
        </defs>
        <rect x={vbX} y={vbY} width={vbW} height={vbH} fill="url(#grid)" />

        {/* Country bodies */}
        <path d={poly(INDIA_OUTLINE)} fill="#10B98114" stroke="#10B981" strokeWidth={1.5 / zoom} strokeOpacity="0.75" />
        <path d={poly(SAUDI_OUTLINE)} fill="#FBBF2412" stroke="#FBBF24" strokeWidth={1.5 / zoom} strokeOpacity="0.7" />
        <path d={poly(UAE_OUTLINE)} fill="#F9731612" stroke="#F97316" strokeWidth={1.5 / zoom} strokeOpacity="0.8" />

        {/* Country labels */}
        {(() => {
          const i = project(22, 79);
          const s = project(24, 44);
          const u = project(24.5, 54.5);
          return (
            <g>
              <text x={i.x} y={i.y} fontSize={22 / zoom} fontWeight="900" fill="#10B981" opacity="0.5" letterSpacing={6 / zoom}>INDIA</text>
              <text x={s.x} y={s.y} fontSize={13 / zoom} fontWeight="700" fill="#FBBF24" opacity="0.55" letterSpacing={2.5 / zoom}>SAUDI ARABIA</text>
              <text x={u.x - 18 / zoom} y={u.y + 24 / zoom} fontSize={10 / zoom} fontWeight="700" fill="#F97316" opacity="0.7" letterSpacing={2 / zoom}>UAE</text>
            </g>
          );
        })()}

        {/* HQ → City lines */}
        {Array.from(byCity.entries()).map(([key, group]) => {
          const c = group[0];
          const p = project(c.lat, c.lon);
          return (
            <line
              key={`line-${key}`}
              x1={hq.x}
              y1={hq.y}
              x2={p.x}
              y2={p.y}
              stroke="#F59E0B"
              strokeWidth={0.7 / zoom}
              strokeOpacity="0.35"
              strokeDasharray={`${2 / zoom} ${3 / zoom}`}
            />
          );
        })}

        {/* Client city markers */}
        {Array.from(byCity.entries()).map(([key, group]) => {
          const c = group[0];
          const p = project(c.lat, c.lon);
          const size = (6 + Math.min(group.length * 2, 8)) / zoom;
          const color = c.country === "India" ? "#10B981" : "#FBBF24";
          const pulseColor = c.country === "India" ? "#10B98115" : "#FBBF2418";
          return (
            <g key={key}>
              <circle cx={p.x} cy={p.y} r={size + 6 / zoom} fill={pulseColor} />
              <circle cx={p.x} cy={p.y} r={size} fill={color} stroke="#0a0a0a" strokeWidth={2 / zoom} />
              {group.length > 1 && (
                <text
                  x={p.x}
                  y={p.y + 3 / zoom}
                  textAnchor="middle"
                  fontSize={9 / zoom}
                  fontWeight="700"
                  fill="#0a0a0a"
                >
                  {group.length}
                </text>
              )}
              <text
                x={p.x + size + 6 / zoom}
                y={p.y + 4 / zoom}
                fontSize={11 / zoom}
                fontWeight="600"
                fill="#a1a1aa"
              >
                {c.city}
              </text>
            </g>
          );
        })}

        {/* HQ marker */}
        <g>
          <circle cx={hq.x} cy={hq.y} r={18 / zoom} fill="#F59E0B12" />
          <circle cx={hq.x} cy={hq.y} r={12 / zoom} fill="#F59E0B25" />
          <circle cx={hq.x} cy={hq.y} r={7 / zoom} fill="#F59E0B" stroke="#0a0a0a" strokeWidth={2.5 / zoom} />
          <text x={hq.x + 12 / zoom} y={hq.y - 8 / zoom} fontSize={11 / zoom} fontWeight="800" fill="#FBBF24" letterSpacing={1 / zoom}>
            NETIQUE HQ
          </text>
          <text x={hq.x + 12 / zoom} y={hq.y + 5 / zoom} fontSize={10 / zoom} fontWeight="600" fill="#a1a1aa">
            Bangalore
          </text>
        </g>
      </svg>

      {/* Zoom controls */}
      <div className="absolute top-3 right-3 flex flex-col gap-1.5 bg-background/90 backdrop-blur border border-border-dim rounded-lg p-1.5 shadow-lg">
        <button
          onClick={zoomIn}
          disabled={zoom >= ZOOM_MAX}
          className="w-8 h-8 flex items-center justify-center rounded text-text-2 hover:bg-amber-500/10 hover:text-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Zoom in"
        >
          <Plus size={14} />
        </button>
        <div className="text-[9px] font-mono text-text-4 text-center">{zoom.toFixed(1)}×</div>
        <button
          onClick={zoomOut}
          disabled={zoom <= ZOOM_MIN}
          className="w-8 h-8 flex items-center justify-center rounded text-text-2 hover:bg-amber-500/10 hover:text-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Zoom out"
        >
          <Minus size={14} />
        </button>
        <div className="h-px bg-surface-3 my-0.5" />
        <button
          onClick={reset}
          className="w-8 h-8 flex items-center justify-center rounded text-text-2 hover:bg-amber-500/10 hover:text-amber-400 transition-colors"
          aria-label="Reset view"
        >
          <RotateCcw size={12} />
        </button>
      </div>

      <p className="text-[10px] text-text-4 font-mono mt-2 text-center">
        Scroll to zoom · drag to pan · or use buttons ↗
      </p>
    </div>
  );
}
