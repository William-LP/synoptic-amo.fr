"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Reference, CategorieReference } from "@/app/types/appData";

const PdfModal = dynamic(() => import("./PdfModal"), { ssr: false });

/* ── Deterministic color palette ── */
const PALETTE = [
  "#124761", "#00A099", "#e07b39", "#4f75b8", "#b84f4f",
  "#3da05a", "#7b5ea7", "#a0527a", "#c4a227", "#2a9a8f",
  "#d4622a", "#5577cc", "#229977", "#885533", "#446688",
];

function getCategoryColor(index: number): string {
  return PALETTE[index % PALETTE.length];
}

/* ── DivIcon factory ── */
function createPin(color: string, size: number) {
  return L.divIcon({
    html: `<div style="
      width:${size}px; height:${size}px;
      background:${color};
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      border:2.5px solid white;
      box-shadow:0 3px 10px rgba(0,0,0,0.25);
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -(size + 4)],
    className: "",
  });
}

const pinCache: Record<string, L.DivIcon> = {};
function getPin(color: string) {
  if (!pinCache[color]) pinCache[color] = createPin(color, 26);
  return pinCache[color];
}

/* ── Component ── */
interface MapClientProps {
  references: Reference[];
  categories: CategorieReference[];
}

export default function MapClient({ references, categories }: MapClientProps) {
  const [active, setActive] = useState<string | null>(null);
  const [activePdf, setActivePdf] = useState<string | null>(null);

  const catColorMap: Record<string, string> = Object.fromEntries(
    categories.map((cat, i) => [cat.documentId, getCategoryColor(i)])
  );

  const withCoords = references.filter((r) => r.latitude !== null && r.longitude !== null);
  const visible = active ? withCoords.filter((r) => r.categorie?.documentId === active) : withCoords;

  return (
    <div>
      {activePdf && (
        <PdfModal url={activePdf} onClose={() => setActivePdf(null)} />
      )}
      {/* ── Filter chips ── */}
      <div className="flex flex-wrap gap-2 mb-5">
        <button
          onClick={() => setActive(null)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${active === null
            ? "bg-[#124761] text-white border-[#124761] shadow-sm"
            : "bg-white text-slate-600 border-slate-200 hover:border-[#00A099] hover:text-[#00A099]"
            }`}
        >
          Tous ({withCoords.length})
        </button>
        {categories.map((cat) => {
          const count = withCoords.filter((r) => r.categorie?.documentId === cat.documentId).length;
          if (count === 0) return null;
          const color = catColorMap[cat.documentId];
          const isActive = active === cat.documentId;
          return (
            <button
              key={cat.documentId}
              onClick={() => setActive(isActive ? null : cat.documentId)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${isActive
                ? "text-white border-transparent shadow-sm"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                }`}
              style={isActive ? { background: color, borderColor: color } : undefined}
            >
              {cat.categorie}
              <span className={`ml-1.5 text-xs ${isActive ? "opacity-75" : "text-slate-400"}`}>
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Map ── */}
      <div className="relative z-[0] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100">
        {withCoords.length === 0 ? (
          <div className="h-[520px] flex items-center justify-center bg-slate-50 text-slate-400 text-sm">
            Aucune référence géolocalisée pour le moment.
          </div>
        ) : (
          <MapContainer
            center={[45.9, 5.4]}
            zoom={6}
            style={{ height: "520px", width: "100%" }}
            scrollWheelZoom={true}
            zoomControl={false}
          >
            <ZoomControl position="bottomright" />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {visible.map((r) => {
              const color = r.categorie ? (catColorMap[r.categorie.documentId] ?? "#124761") : "#124761";
              const catLabel = r.categorie?.categorie ?? "";
              return (
                <Marker key={r.documentId} position={[r.latitude!, r.longitude!]} icon={getPin(color)}>
                  <Popup minWidth={220} maxWidth={260}>
                    <div style={{ fontFamily: "inherit" }}>
                      {catLabel && (
                        <span
                          className="inline-block px-2 py-0.5 rounded-full text-white text-xs font-semibold mb-2"
                          style={{ background: color, fontSize: "10px" }}
                        >
                          {catLabel}
                        </span>
                      )}
                      {r.logo && (
                        <img src={r.logo} alt="" className="h-6 object-contain mb-2 block" />
                      )}
                      <div className="font-bold text-[#124761] text-sm leading-tight mb-1">
                        {r.nom_operation}
                      </div>
                      <div className="text-xs text-slate-500 mb-2">{r.maitre_ouvrage}</div>
                      <div className="flex items-center gap-3 text-xs text-slate-400 border-t border-slate-100 pt-2">
                        <span className="flex items-center gap-1">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                          {r.ville}
                        </span>
                        {r.surface && (
                          <span className="flex items-center gap-1">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>
                            {r.surface}
                          </span>
                        )}
                        {r.annee && (
                          <span className="flex items-center gap-1">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                            {r.annee}
                          </span>
                        )}
                      </div>
                      {r.fiche_reference && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setActivePdf(r.fiche_reference); }}
                          className="mt-2 text-xs text-[#00A099] underline font-medium cursor-pointer"
                        >
                          Voir plus
                        </button>
                      )}
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        )}
      </div>
    </div>
  );
}
