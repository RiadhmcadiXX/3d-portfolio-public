import type { Box } from "./sim";

export type Station = {
  id: string;
  label: string;
  hint: string;
  to: string;
  params?: Record<string, string>;
  position: [number, number, number]; // label anchor
};

export const STATIONS: Station[] = [
  { id: "atlas", label: "Atlas", hint: "Project · 2026", to: "/projects/$slug", params: { slug: "atlas" }, position: [-4, 1.75, -3.7] },
  { id: "lumen", label: "Lumen", hint: "Project · 2025", to: "/projects/$slug", params: { slug: "lumen" }, position: [0, 1.75, -3.7] },
  { id: "fieldnotes", label: "Fieldnotes", hint: "Project · 2024", to: "/projects/$slug", params: { slug: "fieldnotes" }, position: [4, 1.75, -3.7] },
  { id: "experience", label: "Experience", hint: "The bookshelf", to: "/experience", position: [-6.4, 2.45, 0.5] },
  { id: "about", label: "About me", hint: "The screen", to: "/about", position: [6.4, 2.2, 0.5] },
  { id: "contact", label: "Say hello", hint: "Coffee corner", to: "/contact", position: [-5.6, 1.5, 3.9] },
];

export const OBSTACLES: Box[] = [
  { minX: -4.9, maxX: -3.1, minZ: -5, maxZ: -2.7 },
  { minX: -0.9, maxX: 0.9, minZ: -5, maxZ: -2.7 },
  { minX: 3.1, maxX: 4.9, minZ: -5, maxZ: -2.7 },
  { minX: -7, maxX: -6.0, minZ: -0.6, maxZ: 1.6 },
  { minX: 5.8, maxX: 7, minZ: -0.6, maxZ: 1.6 },
  { minX: 3.0, maxX: 4.2, minZ: -0.8, maxZ: 1.8 },
  { minX: -6.6, maxX: -4.6, minZ: 3.3, maxZ: 5 },
];
