import * as THREE from "three";

// Neon color palette
export const COLORS = {
  cyan: new THREE.Color("#00f0ff"),
  magenta: new THREE.Color("#ff00aa"),
  blue: new THREE.Color("#4444ff"),
  purple: new THREE.Color("#8b5cf6"),
  green: new THREE.Color("#00ff88"),
  dark: new THREE.Color("#0a0a0f"),
  white: new THREE.Color("#ededed"),
} as const;

// CSS hex colors for non-Three.js usage
export const HEX_COLORS = {
  cyan: "#00f0ff",
  magenta: "#ff00aa",
  blue: "#4444ff",
  purple: "#8b5cf6",
  green: "#00ff88",
  dark: "#0a0a0f",
} as const;

// Section z-positions in 3D space (camera flies forward along -Z)
export const SECTION_POSITIONS = {
  hero: 0,
  services: -15,
  portfolio: -30,
  testimonials: -45,
  about: -58,
  contact: -70,
} as const;

// Camera waypoints for scroll-driven movement (6 sections)
export const CAMERA_WAYPOINTS = [
  {
    position: new THREE.Vector3(0, 2, 8),
    target: new THREE.Vector3(0, 0, 0),
    scrollStart: 0.0,
    scrollEnd: 0.17,
  },
  {
    position: new THREE.Vector3(0, 0.5, SECTION_POSITIONS.services + 8),
    target: new THREE.Vector3(0, 0, SECTION_POSITIONS.services),
    scrollStart: 0.17,
    scrollEnd: 0.33,
  },
  {
    position: new THREE.Vector3(0, 0.5, SECTION_POSITIONS.portfolio + 8),
    target: new THREE.Vector3(0, 0, SECTION_POSITIONS.portfolio),
    scrollStart: 0.33,
    scrollEnd: 0.5,
  },
  {
    position: new THREE.Vector3(0, 0.5, SECTION_POSITIONS.testimonials + 8),
    target: new THREE.Vector3(0, 0, SECTION_POSITIONS.testimonials),
    scrollStart: 0.5,
    scrollEnd: 0.67,
  },
  {
    position: new THREE.Vector3(0, 0.5, SECTION_POSITIONS.about + 8),
    target: new THREE.Vector3(0, 0, SECTION_POSITIONS.about),
    scrollStart: 0.67,
    scrollEnd: 0.83,
  },
  {
    position: new THREE.Vector3(0, 1, SECTION_POSITIONS.contact + 8),
    target: new THREE.Vector3(0, 0, SECTION_POSITIONS.contact),
    scrollStart: 0.83,
    scrollEnd: 1.0,
  },
] as const;

// Particle configuration
export const PARTICLES = {
  count: 3000,
  spread: 60,
  size: 0.03,
} as const;
