"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Client } from "@/lib/clients";

const HQ: [number, number] = [12.9716, 77.5946];

// Custom HQ icon (amber)
const hqIcon = L.divIcon({
  className: "",
  html: `<div style="
    width:18px;height:18px;border-radius:50%;
    background:#F59E0B;border:3px solid #0a0a0a;
    box-shadow:0 0 0 6px rgba(245,158,11,0.25), 0 0 0 12px rgba(245,158,11,0.1);
  "></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const indiaIcon = L.divIcon({
  className: "",
  html: `<div style="
    width:12px;height:12px;border-radius:50%;
    background:#10B981;border:2px solid #0a0a0a;
    box-shadow:0 0 0 4px rgba(16,185,129,0.2);
  "></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

const gulfIcon = L.divIcon({
  className: "",
  html: `<div style="
    width:12px;height:12px;border-radius:50%;
    background:#FBBF24;border:2px solid #0a0a0a;
    box-shadow:0 0 0 4px rgba(251,191,36,0.2);
  "></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

export default function LeafletMap({ clients }: { clients: Client[] }) {
  // Group by city
  const byCity = new Map<string, Client[]>();
  for (const c of clients) {
    const key = `${c.city}-${c.country}`;
    if (!byCity.has(key)) byCity.set(key, []);
    byCity.get(key)!.push(c);
  }

  // Fix default-icon issue (Leaflet 1.x asset URL workaround)
  useEffect(() => {
    delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => string })._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);

  return (
    <div className="rounded-2xl overflow-hidden border border-border-dim" style={{ height: 840 }}>
      <MapContainer
        center={[20, 76]}
        zoom={4}
        minZoom={3}
        maxZoom={10}
        scrollWheelZoom
        style={{ height: "100%", width: "100%", background: "#0a0a0a" }}
        worldCopyJump
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
        />

        {/* Connection lines HQ → each city */}
        {Array.from(byCity.entries()).map(([key, group]) => {
          const c = group[0];
          return (
            <Polyline
              key={`line-${key}`}
              positions={[HQ, [c.lat, c.lon]]}
              pathOptions={{
                color: "#F59E0B",
                weight: 1.2,
                opacity: 0.45,
                dashArray: "4 5",
              }}
            />
          );
        })}

        {/* HQ marker */}
        <Marker position={HQ} icon={hqIcon}>
          <Tooltip permanent direction="top" offset={[0, -12]} className="!bg-background !border-amber-500/40 !text-amber-300 !shadow-lg">
            <span style={{ fontWeight: 700, fontSize: 11 }}>NETIQUE HQ · Bangalore</span>
          </Tooltip>
        </Marker>

        {/* Client city markers */}
        {Array.from(byCity.entries()).map(([key, group]) => {
          const c = group[0];
          const icon = c.country === "India" ? indiaIcon : gulfIcon;
          return (
            <Marker key={key} position={[c.lat, c.lon]} icon={icon}>
              <Tooltip direction="right" offset={[8, 0]} className="!bg-background !border-border-dim !text-text-2">
                <div>
                  <p style={{ fontWeight: 700, fontSize: 11, color: "#fff" }}>
                    {c.city}{group.length > 1 ? ` (${group.length} mills)` : ""}
                  </p>
                  <p style={{ fontSize: 10, color: "#a1a1aa", marginTop: 2 }}>
                    {c.state}, {c.country}
                  </p>
                </div>
              </Tooltip>
              <Popup className="!bg-background">
                <div style={{ minWidth: 200 }}>
                  <p style={{ fontWeight: 800, fontSize: 13, marginBottom: 4 }}>{c.city}</p>
                  <p style={{ fontSize: 11, color: "#666", marginBottom: 8 }}>{c.state}, {c.country}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {group.map((g) => (
                      <li key={g.slug} style={{ fontSize: 12, padding: "2px 0", borderTop: "1px solid #eee" }}>
                        <strong>{g.short}</strong>
                        {g.grade && <span style={{ color: "#888", fontSize: 10 }}> · {g.grade}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
