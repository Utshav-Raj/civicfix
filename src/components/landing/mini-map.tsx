"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MOCK } from "@/lib/mock-data";
import { CATEGORY_MAP, STATUS_META } from "@/lib/categories";

const BLR = [12.9716, 77.5946] as [number, number];

export function MiniMap() {
  const reports = MOCK.reports.filter((r) => r.city === "Bengaluru").slice(0, 24);
  return (
    <MapContainer
      center={BLR}
      zoom={12}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
      />
      {reports.map((r) => {
        const color = CATEGORY_MAP[r.category]?.accent ?? "#3B82F6";
        const statusColor = STATUS_META[r.status].color;
        return (
          <CircleMarker
            key={r.id}
            center={[r.latitude, r.longitude]}
            radius={7}
            pathOptions={{
              color: statusColor,
              fillColor: color,
              fillOpacity: 0.8,
              weight: 2,
            }}
          >
            <Popup>
              <div className="text-xs font-medium" style={{ color: "#040812" }}>
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
  );
}
