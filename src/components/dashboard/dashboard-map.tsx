"use client";

import { CATEGORY_MAP, STATUS_META } from "@/lib/categories";
import { MOCK } from "@/lib/mock-data";
import { useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const CircleMarker = dynamic(
  () => import("react-leaflet").then((m) => m.CircleMarker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), {
  ssr: false,
});

type Layer = "all" | "mine" | "nearby";

export function DashboardMap() {
  const [layer, setLayer] = useState<Layer>("all");
  const user = MOCK.currentUser;
  const reports = MOCK.reports.filter((r) => {
    if (layer === "mine") return r.user_id === user.id;
    if (layer === "nearby") return r.city === user.city;
    return true;
  });

  const center: [number, number] = [12.9716, 77.5946];

  return (
    <div className="glass rounded-2xl overflow-hidden h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-white/5">
        <div>
          <div className="text-sm font-semibold">City issue map</div>
          <div className="text-xs text-text-muted">
            {reports.length} issues visible
          </div>
        </div>
        <div className="flex bg-bg-primary/60 rounded-lg p-1 border border-white/5">
          {(["all", "mine", "nearby"] as Layer[]).map((l) => (
            <button
              key={l}
              onClick={() => setLayer(l)}
              className={`px-3 py-1.5 text-xs rounded-md font-medium transition-all capitalize ${
                layer === l
                  ? "bg-civic-blue/20 text-civic-blue-glow shadow-[inset_0_0_0_1px_rgba(59,130,246,0.3)]"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 min-h-[360px]">
        <MapContainer
          center={center}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; OSM'
          />
          {reports.map((r) => {
            const color = CATEGORY_MAP[r.category]?.accent ?? "#3B82F6";
            return (
              <CircleMarker
                key={r.id}
                center={[r.latitude, r.longitude]}
                radius={6}
                pathOptions={{
                  color: STATUS_META[r.status].color,
                  fillColor: color,
                  fillOpacity: 0.8,
                  weight: 2,
                }}
              >
                <Popup>
                  <div className="text-xs font-semibold" style={{ color: "#040812" }}>
                    {r.title}
                  </div>
                  <div className="text-[10px]" style={{ color: "#475569" }}>
                    {r.area} • {STATUS_META[r.status].label}
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
