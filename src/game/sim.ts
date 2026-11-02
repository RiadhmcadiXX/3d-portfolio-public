// Pure walking + collision rules for the office. No React, no three.js.
export const WALK_SPEED = 3.2; // m/s
export const PLAYER_RADIUS = 0.35;
export const EYE_HEIGHT = 1.6;
export const ROOM = { minX: -7, maxX: 7, minZ: -5, maxZ: 5 };
export const INTERACT_DISTANCE = 2.4;

export type Box = { minX: number; maxX: number; minZ: number; maxZ: number };
export type Player = { x: number; z: number; yaw: number; pitch: number };

/** Forward on the floor for a camera with rotation.y = yaw (yaw 0 looks toward -z). */
export function forwardOf(yaw: number) {
  return { x: -Math.sin(yaw), z: -Math.cos(yaw) };
}

function hits(x: number, z: number, b: Box) {
  return (
    x > b.minX - PLAYER_RADIUS &&
    x < b.maxX + PLAYER_RADIUS &&
    z > b.minZ - PLAYER_RADIUS &&
    z < b.maxZ + PLAYER_RADIUS
  );
}

export function step(p: Player, fwd: number, strafe: number, dt: number, obstacles: Box[]) {
  const f = forwardOf(p.yaw);
  const r = { x: -f.z, z: f.x };
  let mx = f.x * fwd + r.x * strafe;
  let mz = f.z * fwd + r.z * strafe;
  const len = Math.hypot(mx, mz);
  if (len > 1) {
    mx /= len;
    mz /= len;
  }
  const d = WALK_SPEED * Math.min(dt, 0.05);
  const clampX = (x: number) => Math.min(ROOM.maxX - PLAYER_RADIUS, Math.max(ROOM.minX + PLAYER_RADIUS, x));
  const clampZ = (z: number) => Math.min(ROOM.maxZ - PLAYER_RADIUS, Math.max(ROOM.minZ + PLAYER_RADIUS, z));
  const nx = clampX(p.x + mx * d);
  if (!obstacles.some((b) => hits(nx, p.z, b))) p.x = nx;
  const nz = clampZ(p.z + mz * d);
  if (!obstacles.some((b) => hits(p.x, nz, b))) p.z = nz;
}
