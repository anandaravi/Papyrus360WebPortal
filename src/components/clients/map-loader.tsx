"use client";

import dynamic from "next/dynamic";
import type { Client } from "@/lib/clients";

const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => (
    <div
      className="rounded-2xl border border-border-dim bg-background flex items-center justify-center"
      style={{ height: 840 }}
    >
      <p className="text-text-3 text-sm font-mono">Loading map…</p>
    </div>
  ),
});

export function MapLoader({ clients }: { clients: Client[] }) {
  return <LeafletMap clients={clients} />;
}
