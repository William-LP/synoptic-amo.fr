"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ── Categories ── */
const CATEGORIES = [
  { id: "admin",       label: "Administrations" },
  { id: "biblio",      label: "Bibliothèques / Archives" },
  { id: "creches",     label: "Crèches / Centres sociaux" },
  { id: "enseign",     label: "Enseignement" },
  { id: "securite",    label: "Équipement sécurité" },
  { id: "sport",       label: "Équipements sportifs" },
  { id: "mpgp",        label: "MPGP" },
  { id: "mpgs",        label: "MPGS" },
  { id: "congres",     label: "Palais des congrès" },
  { id: "concerts",    label: "Salles de concerts / SMAC" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

/* ── Category colors ── */
const CAT_COLORS: Record<CategoryId, string> = {
  admin:    "#124761",
  biblio:   "#00A099",
  creches:  "#e07b39",
  enseign:  "#4f75b8",
  securite: "#b84f4f",
  sport:    "#3da05a",
  mpgp:     "#7b5ea7",
  mpgs:     "#a0527a",
  congres:  "#c4a227",
  concerts: "#2a9a8f",
};

/* ── Project data ── */
interface Project {
  id: number;
  name: string;
  client: string;
  city: string;
  category: CategoryId;
  coords: [number, number];
  surface: string;
  year: string;
}

const PROJECTS: Project[] = [
  { id: 1,  name: "Hôtel de Ville — Extension",            client: "Ville de Lyon",              city: "Lyon",              category: "admin",    coords: [45.748, 4.847], surface: "4 200 m²", year: "2023" },
  { id: 2,  name: "Archives Départementales",               client: "Département de l'Isère",     city: "Grenoble",          category: "biblio",   coords: [45.185, 5.726], surface: "6 000 m²", year: "2022" },
  { id: 3,  name: "Médiathèque Bonneville",                 client: "Ville de Bonneville",        city: "Bonneville",        category: "biblio",   coords: [46.079, 6.402], surface: "2 800 m²", year: "2024" },
  { id: 4,  name: "Médiathèque Villeurbanne",               client: "Ville de Villeurbanne",      city: "Villeurbanne",      category: "biblio",   coords: [45.769, 4.893], surface: "3 500 m²", year: "2023" },
  { id: 5,  name: "Multi-accueil Petite Enfance",           client: "Grand Annecy",               city: "Annecy",            category: "creches",  coords: [45.901, 6.131], surface: "1 200 m²", year: "2023" },
  { id: 6,  name: "Centre Social Firminy",                  client: "Ville de Firminy",           city: "Firminy",           category: "creches",  coords: [45.389, 4.293], surface: "1 800 m²", year: "2022" },
  { id: 7,  name: "Crèche intercommunale",                  client: "CC Fier et Usses",           city: "Rumilly",           category: "creches",  coords: [45.870, 5.944], surface: "900 m²",   year: "2024" },
  { id: 8,  name: "Lycée Polyvalent — Réhabilitation",      client: "Région AuRA",                city: "Bourg-en-Bresse",   category: "enseign",  coords: [46.207, 5.234], surface: "12 000 m²", year: "2021" },
  { id: 9,  name: "Groupe Scolaire Voiron",                 client: "Ville de Voiron",            city: "Voiron",            category: "enseign",  coords: [45.367, 5.591], surface: "3 200 m²", year: "2023" },
  { id: 10, name: "École Primaire Bourgoin",                client: "Ville de Bourgoin-Jallieu",  city: "Bourgoin-Jallieu",  category: "enseign",  coords: [45.596, 5.268], surface: "2 100 m²", year: "2022" },
  { id: 11, name: "Centre de Secours SDIS",                 client: "SDIS 73",                    city: "Chambéry",          category: "securite", coords: [45.563, 5.919], surface: "3 800 m²", year: "2023" },
  { id: 12, name: "Caserne de Pompiers",                    client: "SDIS Haute-Savoie",          city: "Thonon-les-Bains",  category: "securite", coords: [46.372, 6.477], surface: "2 600 m²", year: "2024" },
  { id: 13, name: "Piscine Intercommunale",                 client: "Agglomération Annecy",       city: "Annecy",            category: "sport",    coords: [45.897, 6.127], surface: "5 500 m²", year: "2022" },
  { id: 14, name: "Complexe Sportif",                       client: "Loire Forez Agglomération",  city: "Roanne",            category: "sport",    coords: [46.040, 4.072], surface: "4 800 m²", year: "2023" },
  { id: 15, name: "Gymnase Municipal",                      client: "Ville de Bron",              city: "Bron",              category: "sport",    coords: [45.736, 4.919], surface: "2 200 m²", year: "2021" },
  { id: 16, name: "Palais des Congrès de Savoie",           client: "Savoie Technolac",           city: "Chambéry",          category: "congres",  coords: [45.561, 5.921], surface: "8 000 m²", year: "2022" },
  { id: 17, name: "Espace Congrès Grenoble",                client: "Grenoble Alpes Métropole",   city: "Grenoble",          category: "congres",  coords: [45.190, 5.723], surface: "6 500 m²", year: "2023" },
  { id: 18, name: "SMAC — Salle de Musiques Actuelles",     client: "Grand Chambéry",             city: "Chambéry",          category: "concerts", coords: [45.567, 5.915], surface: "2 400 m²", year: "2024" },
  { id: 19, name: "Salle de Concerts Annemasse",            client: "Ville d'Annemasse",          city: "Annemasse",         category: "concerts", coords: [46.196, 6.236], surface: "1 800 m²", year: "2023" },
  { id: 20, name: "Mairie — Réhabilitation",                client: "CC du Genevois",             city: "Annemasse",         category: "admin",    coords: [46.193, 6.239], surface: "2 100 m²", year: "2022" },
  { id: 21, name: "Maîtrise d'œuvre publique générale",     client: "Métropole de Lyon",          city: "Lyon",              category: "mpgp",     coords: [45.752, 4.851], surface: "—",        year: "2023" },
  { id: 22, name: "Maîtrise d'œuvre spécialisée",           client: "Ain Agglomération",          city: "Bourg-en-Bresse",   category: "mpgs",     coords: [46.203, 5.230], surface: "—",        year: "2024" },
];

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

/* Cache icon instances */
const pinCache: Record<string, L.DivIcon> = {};
function getPin(color: string) {
  if (!pinCache[color]) pinCache[color] = createPin(color, 26);
  return pinCache[color];
}

/* ── Component ── */
export default function MapClient() {
  const [active, setActive] = useState<CategoryId | null>(null);

  const visible = active ? PROJECTS.filter((p) => p.category === active) : PROJECTS;

  return (
    <div>
      {/* ── Filter chips ── */}
      <div className="flex flex-wrap gap-2 mb-5">
        <button
          onClick={() => setActive(null)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
            active === null
              ? "bg-[#124761] text-white border-[#124761] shadow-sm"
              : "bg-white text-slate-600 border-slate-200 hover:border-[#00A099] hover:text-[#00A099]"
          }`}
        >
          Tous ({PROJECTS.length})
        </button>
        {CATEGORIES.map((cat) => {
          const count = PROJECTS.filter((p) => p.category === cat.id).length;
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActive(isActive ? null : cat.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                isActive
                  ? "text-white border-transparent shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
              }`}
              style={
                isActive
                  ? { background: CAT_COLORS[cat.id], borderColor: CAT_COLORS[cat.id] }
                  : undefined
              }
            >
              {cat.label}
              <span className={`ml-1.5 text-xs ${isActive ? "opacity-75" : "text-slate-400"}`}>
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Map ── */}
      <div className="relative z-[0] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100">
        <MapContainer
          center={[45.9, 5.4]}
          zoom={7}
          style={{ height: "520px", width: "100%" }}
          scrollWheelZoom={false}
          zoomControl={false}
        >
          <ZoomControl position="bottomright" />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {visible.map((p) => {
            const catLabel = CATEGORIES.find((c) => c.id === p.category)?.label ?? p.category;
            const color = CAT_COLORS[p.category];
            return (
              <Marker key={p.id} position={p.coords} icon={getPin(color)}>
                <Popup minWidth={220} maxWidth={260}>
                  <div style={{ fontFamily: "inherit" }}>
                    {/* Category badge */}
                    <span
                      className="inline-block px-2 py-0.5 rounded-full text-white text-xs font-semibold mb-2"
                      style={{ background: color, fontSize: "10px" }}
                    >
                      {catLabel}
                    </span>
                    {/* Project name */}
                    <div className="font-bold text-[#124761] text-sm leading-tight mb-1">
                      {p.name}
                    </div>
                    {/* Client */}
                    <div className="text-xs text-slate-500 mb-2">
                      {p.client}
                    </div>
                    {/* Details row */}
                    <div className="flex items-center gap-3 text-xs text-slate-400 border-t border-slate-100 pt-2">
                      <span className="flex items-center gap-1">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        {p.city}
                      </span>
                      {p.surface !== "—" && (
                        <span className="flex items-center gap-1">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                          {p.surface}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        {p.year}
                      </span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
