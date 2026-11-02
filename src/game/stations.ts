import type { Box } from "./sim";

export type Station = {
  id: string;
  label: string;
  hint: string;
  to: string;
  params?: Record<string, string>;
  position: [number, number, number]; // label anchor
  /** center of the clickable object (animated on click) */
  object: [number, number, number];
};

export const STATIONS: Station[] = [
  { id: "software", label: "Software & Web", hint: "The laptop", to: "/work/$category", params: { category: "software" }, position: [0.4, 1.45, -2.9], object: [0.4, 0.95, -2.95] },
  { id: "apps", label: "Mobile Apps", hint: "The phone", to: "/work/$category", params: { category: "apps" }, position: [1.6, 1.3, -2.8], object: [1.6, 0.92, -2.8] },
  { id: "technical", label: "Technical", hint: "Server rack", to: "/work/$category", params: { category: "technical" }, position: [3.7, 2.35, -2.95], object: [3.7, 0, -2.95] },
  { id: "experience", label: "Career Timeline", hint: "The pinboard", to: "/experience", position: [-4.3, 2.75, -0.2], object: [-4.42, 1.7, -0.2] },
  { id: "about", label: "About me", hint: "Say hi", to: "/about", position: [2.5, 2.1, -0.7], object: [2.5, 0, -0.7] },
  { id: "contact", label: "Say hello", hint: "Coffee corner", to: "/contact", position: [-3.6, 1.45, 3.05], object: [-3.6, 0.75, 3.1] },
];

export const OBSTACLES: Box[] = [
  { minX: -0.1, maxX: 2.1, minZ: -3.5, maxZ: -2.4 }, // desk
  { minX: 3.15, maxX: 4.5, minZ: -3.5, maxZ: -2.4 }, // server rack
  { minX: 2.1, maxX: 2.9, minZ: -1.1, maxZ: -0.3 }, // person
  { minX: -4.5, maxX: -2.8, minZ: 2.7, maxZ: 3.5 }, // coffee cabinet
];
