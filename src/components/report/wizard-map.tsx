"use client";

import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = new L.DivIcon({
  className: "civic-pin",
  html: `<div style="
    width: 22px; height: 22px; border-radius: 999px;
    background: radial-gradient(circle, #FB923C, #F97316);
    border: 3px solid white;
    box-shadow: 0 0 0 3px rgba(249,115,22,0.35), 0 0 20px rgba(249,115,22,0.6);
  "></div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

function Pinner({
  setPosition,
}: {
  setPosition: (p: [number, number]) => void;
}) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export function WizardMap({
  position,
  setPosition,
}: {
  position: [number, number];
  setPosition: (p: [number, number]) => void;
}) {
  return (
    <MapContainer
      center={position}
      zoom={14}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution="&copy; OSM"
      />
      <Marker position={position} icon={icon} />
      <Pinner setPosition={setPosition} />
    </MapContainer>
  );
}
