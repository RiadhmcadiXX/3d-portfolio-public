import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, useAnimations, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import * as THREE from "three";
import personModel from "@/assets/models/person.glb.asset.json";
import { Model } from "./Model";
import { STATIONS, OBSTACLES, type Station } from "@/game/stations";
import { experience } from "@/content/portfolio";
import { EYE_HEIGHT, INTERACT_DISTANCE, step, type Player } from "@/game/sim";

const PALETTE = {
  wall: "#f6f8fb",
  wallAccent: "#2f6fd6",
  trim: "#1d3557",
  sky: "#cfe6ff",
  navy: "#1d3557",
};
const W = 9;
const D = 7;
const H = 3;

type Input = { keys: Set<string>; touch: { fwd: number; strafe: number } };
type Pulse = { id: string; t: number } | null;

function floorTexture() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const g = c.getContext("2d")!;
  for (let r = 0; r < 8; r++) {
    let x = -((r * 137) % 256);
    while (x < 512) {
      const w = 200 + ((r * 53 + x) % 140);
      const l = 86 + ((r * 31 + x * 7) % 6);
      g.fillStyle = `hsl(35 18% ${l}%)`;
      g.fillRect(x, r * 64, w, 64);
      g.strokeStyle = "rgba(80,90,110,0.18)";
      g.lineWidth = 2;
      g.strokeRect(x, r * 64, w, 64);
      x += w;
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(5, 4);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function pinboardTexture() {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 640;
  const g = c.getContext("2d")!;
  g.fillStyle = "#e9eef5";
  g.fillRect(0, 0, 1024, 640);
  for (let i = 0; i < 1400; i++) {
    g.fillStyle = `rgba(29,53,87,${Math.random() * 0.05})`;
    g.fillRect(Math.random() * 1024, Math.random() * 640, 3, 3);
  }
  g.fillStyle = "#1d3557";
  g.font = "600 44px sans-serif";
  g.fillText("CAREER TIMELINE", 60, 80);
  g.strokeStyle = "#2f6fd6";
  g.lineWidth = 6;
  g.beginPath();
  g.moveTo(80, 330);
  g.lineTo(950, 330);
  g.stroke();
  const items = experience.slice().reverse();
  items.forEach((e, i) => {
    const x = 70 + i * 310;
    const y = i % 2 ? 360 : 130;
    g.save();
    g.translate(x + 130, y + 90);
    g.rotate((i - 1) * 0.04);
    g.fillStyle = i % 2 ? "#ffffff" : "#dbe9ff";
    g.shadowColor = "rgba(0,0,0,0.2)";
    g.shadowBlur = 12;
    g.fillRect(-130, -90, 260, 180);
    g.shadowBlur = 0;
    g.fillStyle = "#2f6fd6";
    g.beginPath();
    g.arc(0, -78, 10, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = "#1d3557";
    g.font = "600 24px sans-serif";
    g.fillText(e.years, -112, -36);
    g.font = "700 26px sans-serif";
    g.fillText(e.company, -112, 4, 230);
    g.font = "20px sans-serif";
    g.fillText(e.role, -112, 40, 230);
    g.restore();
    g.fillStyle = "#2f6fd6";
    g.beginPath();
    g.arc(x + 130, 330, 12, 0, Math.PI * 2);
    g.fill();
  });
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function Room() {
  const floor = useMemo(floorTexture, []);
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[W, D]} />
        <meshStandardMaterial map={floor} roughness={0.6} />
      </mesh>
      {/* back wall: blue accent */}
      <mesh position={[0, H / 2, -D / 2 - 0.05]} receiveShadow>
        <boxGeometry args={[W + 0.2, H, 0.1]} />
        <meshStandardMaterial color={PALETTE.wallAccent} roughness={0.85} />
      </mesh>
      <mesh position={[0, H / 2, D / 2 + 0.05]}>
        <boxGeometry args={[W + 0.2, H, 0.1]} />
        <meshStandardMaterial color={PALETTE.wall} roughness={0.95} />
      </mesh>
      <mesh position={[-W / 2 - 0.05, H / 2, 0]} receiveShadow>
        <boxGeometry args={[0.1, H, D + 0.2]} />
        <meshStandardMaterial color={PALETTE.wall} roughness={0.95} />
      </mesh>
      <mesh position={[W / 2 + 0.05, H / 2, 0]}>
        <boxGeometry args={[0.1, H, D + 0.2]} />
        <meshStandardMaterial color={PALETTE.wall} roughness={0.95} />
      </mesh>
      {/* big window on right wall */}
      <group position={[W / 2 - 0.01, 1.65, 0.2]}>
        <mesh rotation-y={-Math.PI / 2}>
          <planeGeometry args={[3.2, 1.7]} />
          <meshBasicMaterial color={PALETTE.sky} />
        </mesh>
        {[-1.6, 0, 1.6].map((z) => (
          <mesh key={z} position={[-0.03, 0, z]}>
            <boxGeometry args={[0.06, 1.75, 0.06]} />
            <meshStandardMaterial color={PALETTE.wall} />
          </mesh>
        ))}
      </group>
      <mesh position={[0, H, 0]} rotation-x={Math.PI / 2}>
        <planeGeometry args={[W, D]} />
        <meshStandardMaterial color="#ffffff" emissive="#eef4ff" emissiveIntensity={0.5} side={THREE.DoubleSide} />
      </mesh>
      {/* ceiling light strips */}
      {[-1.5, 1.5].map((z) => (
        <mesh key={z} position={[0, H - 0.02, z]} rotation-x={Math.PI / 2}>
          <planeGeometry args={[5, 0.12]} />
          <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
        </mesh>
      ))}
      {/* skirting */}
      {([
        [0, -D / 2 + 0.02, W, 0],
        [-W / 2 + 0.02, 0, D, Math.PI / 2],
      ] as [number, number, number, number][]).map(([x, z, len, r], i) => (
        <mesh key={i} position={[x, 0.05, z]} rotation-y={r}>
          <boxGeometry args={[len, 0.1, 0.03]} />
          <meshStandardMaterial color={PALETTE.navy} />
        </mesh>
      ))}
      {/* rug */}
      <mesh rotation-x={-Math.PI / 2} position={[0.3, 0.004, 0.3]} receiveShadow>
        <planeGeometry args={[3.4, 2.4]} />
        <meshStandardMaterial color="#c9dbf3" roughness={1} />
      </mesh>
    </group>
  );
}

function Pinboard() {
  const tex = useMemo(pinboardTexture, []);
  return (
    <group position={[-W / 2 + 0.04, 1.7, -0.2]} rotation-y={Math.PI / 2}>
      <mesh castShadow>
        <boxGeometry args={[3.1, 1.95, 0.05]} />
        <meshStandardMaterial color={PALETTE.navy} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[2.95, 1.82]} />
        <meshStandardMaterial map={tex} roughness={0.9} />
      </mesh>
    </group>
  );
}

function ServerRack() {
  const leds = useRef<THREE.MeshStandardMaterial[]>([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    leds.current.forEach((m, i) => {
      m.emissiveIntensity = Math.sin(t * (3 + (i % 5)) + i * 1.7) > 0.2 ? 3 : 0.3;
    });
  });
  const units = Array.from({ length: 8 }, (_, i) => i);
  return (
    <group>
      <mesh position={[0, 0.95, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 1.9, 0.9]} />
        <meshStandardMaterial color="#1b2433" roughness={0.4} metalness={0.6} />
      </mesh>
      {units.map((i) => (
        <group key={i} position={[0, 0.22 + i * 0.21, 0.452]}>
          <mesh>
            <boxGeometry args={[0.78, 0.17, 0.01]} />
            <meshStandardMaterial color="#2a3546" roughness={0.3} metalness={0.7} />
          </mesh>
          {[0, 1, 2].map((j) => (
            <mesh key={j} position={[0.26 + j * 0.05, 0, 0.008]}>
              <boxGeometry args={[0.025, 0.025, 0.01]} />
              <meshStandardMaterial
                ref={(m) => {
                  if (m) leds.current[i * 3 + j] = m;
                }}
                color={j === 2 ? "#3fd27a" : "#4aa3ff"}
                emissive={j === 2 ? "#3fd27a" : "#4aa3ff"}
              />
            </mesh>
          ))}
          <mesh position={[-0.15, 0, 0.007]}>
            <boxGeometry args={[0.4, 0.06, 0.01]} />
            <meshStandardMaterial color="#111823" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Phone() {
  return (
    <group rotation-y={-0.35}>
      <mesh position={[0, 0.006, 0]} castShadow>
        <boxGeometry args={[0.09, 0.012, 0.18]} />
        <meshStandardMaterial color="#111827" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.0125, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[0.08, 0.165]} />
        <meshStandardMaterial color="#2f6fd6" emissive="#4a8cff" emissiveIntensity={0.9} />
      </mesh>
    </group>
  );
}

/**
 * The animated person by the desk. Kenney Mini Characters ship rigged with
 * built-in clips, so "idle" loops forever and "emote-yes" nods on click.
 */
const PERSON_HEIGHT = 1.62;
/** The file's standing bbox is 0.7755 units tall with feet at y=0 (read from its accessors). */
const PERSON_SCALE = PERSON_HEIGHT / 0.7755;

function Person({ pulse }: { pulse: React.MutableRefObject<Pulse> }) {
  const { scene, animations } = useGLTF(personModel.url);
  const ref = useRef<THREE.Group>(null);
  const { actions } = useAnimations(animations, ref);
  const nod = useRef<{ start: number; dur: number } | null>(null);

  useEffect(() => {
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) m.castShadow = true;
    });
    actions["idle"]?.reset().setLoop(THREE.LoopRepeat, Infinity).play();
  }, [scene, actions]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const p = pulse.current;
    if (p && p.id === "about" && !nod.current) {
      const clip = animations.find((a) => a.name === "emote-yes");
      actions["emote-yes"]?.reset().setLoop(THREE.LoopOnce, 1).fadeIn(0.15).play();
      actions["idle"]?.fadeOut(0.25);
      nod.current = { start: t, dur: clip?.duration ?? 1 };
    } else if (nod.current && t - nod.current.start > nod.current.dur + 0.15) {
      actions["emote-yes"]?.fadeOut(0.3);
      actions["idle"]?.reset().fadeIn(0.3).play();
      nod.current = null;
    }
  });

  return (
    <group ref={ref} scale={PERSON_SCALE} rotation-y={0.25}>
      <primitive object={scene} />
    </group>
  );
}

/** Wraps a clickable object; squashes/bounces it when its station is opened. */
function Interactive({
  id,
  pulse,
  position,
  children,
}: {
  id: string;
  pulse: React.MutableRefObject<Pulse>;
  position: [number, number, number];
  children: React.ReactNode;
}) {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!g.current) return;
    const p = pulse.current;
    if (p && p.id === id) {
      const a = clock.elapsedTime - p.t;
      const s = 1 + 0.18 * Math.exp(-3.5 * a) * Math.sin(a * 20);
      g.current.scale.set(1 + (s - 1) * 0.6, s, 1 + (s - 1) * 0.6);
      g.current.position.y = position[1] + Math.max(0, Math.sin(Math.min(a * 6, Math.PI))) * 0.08;
    } else {
      g.current.scale.setScalar(1);
      g.current.position.y = position[1];
    }
  });
  return (
    <group ref={g} position={position}>
      {children}
    </group>
  );
}

/** Expanding blue ring on the floor under a clicked object. */
function ClickRing({ pulse }: { pulse: React.MutableRefObject<Pulse> }) {
  const m = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(({ clock }) => {
    const p = pulse.current;
    if (!m.current || !mat.current) return;
    const s = p && STATIONS.find((x) => x.id === p.id);
    if (!p || !s) {
      m.current.visible = false;
      return;
    }
    const a = clock.elapsedTime - p.t;
    m.current.visible = true;
    m.current.position.set(s.object[0], 0.02, s.object[2]);
    m.current.scale.setScalar(0.3 + a * 3);
    mat.current.opacity = Math.max(0, 0.8 - a * 1.4);
  });
  return (
    <mesh ref={m} rotation-x={-Math.PI / 2} visible={false}>
      <ringGeometry args={[0.45, 0.55, 48]} />
      <meshBasicMaterial ref={mat} color="#2f6fd6" transparent depthWrite={false} />
    </mesh>
  );
}

function Furniture({ pulse }: { pulse: React.MutableRefObject<Pulse> }) {
  const [sw, apps, tech, , about, contact] = STATIONS.map((s) => s.object);
  return (
    <group>
      <Model name="desk" position={[1, 0, -3.0]} rotation={Math.PI} />
      <Model name="chairDesk" position={[1.1, 0, -1.9]} rotation={0.2} />
      <Interactive id="software" pulse={pulse} position={[sw![0], 0.91, sw![2]]}>
        <Model name="laptop" rotation={Math.PI + 0.15} />
      </Interactive>
      <Interactive id="apps" pulse={pulse} position={[apps![0], 0.91, apps![2]]}>
        <Phone />
      </Interactive>
      <Model name="plantSmall1" position={[1.9, 0.91, -3.25]} />
      <Interactive id="technical" pulse={pulse} position={tech!}>
        <ServerRack />
      </Interactive>
      <Interactive id="experience" pulse={pulse} position={[0, 0, 0]}>
        <Pinboard />
      </Interactive>
      <Interactive id="about" pulse={pulse} position={about!}>
        <Person pulse={pulse} />
      </Interactive>
      <Model name="cabinetTelevision" position={[-3.6, 0, 3.1]} rotation={Math.PI} />
      <Interactive id="contact" pulse={pulse} position={contact!}>
        <Model name="kitchenCoffeeMachine" position={[-0.2, 0, 0.05]} rotation={Math.PI} />
      </Interactive>
      <Model name="pottedPlant" position={[-4.1, 0, -3.1]} />
      <Model name="pottedPlant" position={[4.1, 0, 3.1]} />
      <Model name="lampSquareFloor" position={[-1.6, 0, -3.1]} />
    </group>
  );
}

function StationMarker({
  station,
  active,
  onOpen,
  isDrag,
}: {
  station: Station;
  active: boolean;
  onOpen: (s: Station) => void;
  isDrag: () => boolean;
}) {
  return (
    <group position={station.position}>
      <mesh
        position={[0, -0.5, 0]}
        onClick={(e) => {
          e.stopPropagation();
          if (isDrag()) return;
          onOpen(station);
        }}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "")}
      >
        <boxGeometry args={[1, 1.2, 1]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

function Walker({
  input,
  player,
  onNearest,
  target,
}: {
  input: React.MutableRefObject<Input>;
  player: React.MutableRefObject<Player>;
  onNearest: (id: string | null) => void;
  target: React.MutableRefObject<Station | null>;
}) {
  const { camera } = useThree();
  const last = useRef<string | null>(null);
  useEffect(() => {
    camera.rotation.order = "YXZ";
  }, [camera]);
  useFrame((_, delta) => {
    const k = input.current.keys;
    const fwd =
      (k.has("KeyW") || k.has("ArrowUp") ? 1 : 0) - (k.has("KeyS") || k.has("ArrowDown") ? 1 : 0) + input.current.touch.fwd;
    const strafe =
      (k.has("KeyD") || k.has("ArrowRight") ? 1 : 0) - (k.has("KeyA") || k.has("ArrowLeft") ? 1 : 0) + input.current.touch.strafe;
    const p = player.current;
    const tg = target.current;
    if (tg) {
      // click animation: swing the view toward the clicked object
      const dx = tg.object[0] - p.x;
      const dz = tg.object[2] - p.z;
      let want = Math.atan2(-dx, -dz) - p.yaw;
      want = Math.atan2(Math.sin(want), Math.cos(want));
      const k = 1 - Math.exp(-6 * Math.min(delta, 0.05));
      p.yaw += want * k;
      p.pitch += (-0.25 - p.pitch) * k;
    } else step(p, fwd, strafe, delta, OBSTACLES);
    camera.position.set(p.x, EYE_HEIGHT, p.z);
    camera.rotation.set(p.pitch, p.yaw, 0);

    let best: string | null = null;
    let bestD = INTERACT_DISTANCE;
    for (const s of STATIONS) {
      const d = Math.hypot(s.position[0] - p.x, s.position[2] - p.z);
      if (d < bestD) {
        bestD = d;
        best = s.id;
      }
    }
    if (best !== last.current) {
      last.current = best;
      onNearest(best);
    }
  });
  return null;
}

const TMP = new THREE.Vector3();
/** Projects each station anchor to screen space and moves its DOM label directly (no React re-render). */
function LabelProjector({ labels }: { labels: React.MutableRefObject<Record<string, HTMLButtonElement | null>> }) {
  const { camera, size } = useThree();
  useFrame(() => {
    for (const s of STATIONS) {
      const el = labels.current[s.id];
      if (!el) continue;
      TMP.set(...s.position).project(camera);
      const dist = camera.position.distanceTo(TMP.set(...s.position));
      TMP.set(...s.position).project(camera);
      const visible = TMP.z < 1 && Math.abs(TMP.x) < 1.2 && Math.abs(TMP.y) < 1.2;
      const x = (TMP.x * 0.5 + 0.5) * size.width;
      const y = (-TMP.y * 0.5 + 0.5) * size.height;
      const scale = Math.max(0.85, Math.min(1.3, 6 / dist));
      el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
      el.style.opacity = visible ? "1" : "0";
      el.style.pointerEvents = visible ? "auto" : "none";
    }
  });
  return null;
}

function ReadyFlag({ onReady }: { onReady: () => void }) {
  const done = useRef(false);
  useFrame(() => {
    if (!done.current) {
      done.current = true;
      onReady();
    }
  });
  return null;
}

const MOVE_PADS: { label: string; fwd: number; strafe: number; area: string }[] = [
  { label: "↑", fwd: 1, strafe: 0, area: "up" },
  { label: "←", fwd: 0, strafe: -1, area: "left" },
  { label: "↓", fwd: -1, strafe: 0, area: "down" },
  { label: "→", fwd: 0, strafe: 1, area: "right" },
];

export default function OfficeScene() {
  const navigate = useNavigate();
  const input = useRef<Input>({ keys: new Set(), touch: { fwd: 0, strafe: 0 } });
  const player = useRef<Player>({ x: 0.2, z: 3.0, yaw: 0.1, pitch: -0.12 });
  const [nearest, setNearest] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const nearestRef = useRef<string | null>(null);
  nearestRef.current = nearest;
  const drag = useRef<{ x: number; y: number; moved: number } | null>(null);
  const lastMoved = useRef(0);
  const labels = useRef<Record<string, HTMLButtonElement | null>>({});

  const pulse = useRef<Pulse>(null);
  const target = useRef<Station | null>(null);
  const clockRef = useRef<THREE.Clock | null>(null);
  const open = (s: Station) => {
    if (leaving) return;
    pulse.current = { id: s.id, t: clockRef.current?.elapsedTime ?? 0 };
    target.current = s;
    window.setTimeout(() => setLeaving(true), 550);
    window.setTimeout(() => {
      navigate({ to: s.to, params: s.params } as never);
    }, 1050);
  };
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) e.preventDefault();
      input.current.keys.add(e.code);
      if (e.code === "KeyE" || e.code === "Enter") {
        const s = STATIONS.find((x) => x.id === nearestRef.current);
        if (s) openRef.current(s);
      }
    };
    const up = (e: KeyboardEvent) => input.current.keys.delete(e.code);
    const blur = () => input.current.keys.clear();
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <div className="office-stage" data-scene-ready={ready ? "" : undefined}>
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ fov: 68, near: 0.05, far: 60, position: [0.2, EYE_HEIGHT, 3.0] }}
        onCreated={({ clock }) => (clockRef.current = clock)}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
        onPointerDown={(e) => {
          drag.current = { x: e.clientX, y: e.clientY, moved: 0 };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d) return;
          const dx = e.clientX - d.x;
          const dy = e.clientY - d.y;
          d.x = e.clientX;
          d.y = e.clientY;
          d.moved += Math.abs(dx) + Math.abs(dy);
          const p = player.current;
          p.yaw -= dx * 0.0045;
          p.pitch = Math.max(-1.1, Math.min(1.1, p.pitch - dy * 0.0035));
        }}
        onPointerUp={() => {
          lastMoved.current = drag.current?.moved ?? 0;
          drag.current = null;
        }}
        onPointerLeave={() => (drag.current = null)}
      >
        <color attach="background" args={["#eef3fa"]} />
        <fog attach="fog" args={["#eef3fa", 12, 24]} />
        <hemisphereLight args={["#ffffff", "#9fb3cc", 0.7]} />
        <directionalLight
          position={[7, 6, 1]}
          intensity={2}
          color="#fff6ea"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
          shadow-bias={-0.0005}
        />
        <pointLight position={[0, 2.8, -1.5]} intensity={5} distance={7} color="#ffffff" />
        <pointLight position={[0, 2.8, 1.5]} intensity={5} distance={7} color="#eaf2ff" />
        <Environment resolution={128}>
          <Lightformer intensity={1.6} position={[0, 5, 0]} scale={[10, 10, 1]} rotation-x={Math.PI / 2} />
          <Lightformer intensity={1.2} color="#dbe9ff" position={[8, 2, 0]} rotation-y={-Math.PI / 2} scale={[10, 3, 1]} />
          <Lightformer intensity={0.6} color="#2f6fd6" position={[0, 2, -8]} scale={[12, 3, 1]} />
        </Environment>

        <Room />
        {STATIONS.map((s) => (
          <StationMarker key={s.id} station={s} active={nearest === s.id} onOpen={open} isDrag={() => lastMoved.current > 6} />
        ))}
        <LabelProjector labels={labels} />
        <Walker input={input} player={player} onNearest={setNearest} target={target} />
        <ClickRing pulse={pulse} />
        <Suspense fallback={null}>
          <Furniture pulse={pulse} />
          <ContactShadows position={[0, 0.01, 0]} scale={11} opacity={0.3} blur={2.4} far={2} />
          <ReadyFlag onReady={() => setReady(true)} />
        </Suspense>
      </Canvas>

      <div className="office-labels">
        {STATIONS.map((s) => (
          <button
            key={s.id}
            ref={(el) => {
              labels.current[s.id] = el;
            }}
            type="button"
            onClick={() => open(s)}
            className="station-anchor"
          >
            <span className={`station-tag ${nearest === s.id ? "is-active" : ""} ${target.current?.id === s.id ? "is-clicked" : ""}`}>
              <span className="station-tag__hint">{s.hint}</span>
              <span className="station-tag__label">{s.label}</span>
              {nearest === s.id && <span className="station-tag__key">Press E</span>}
            </span>
          </button>
        ))}
      </div>

      <header className="office-hud-top">
        <div>
          <p className="eyebrow">Alex Morgan · Creative Developer</p>
          <h1 className="office-title">Welcome to the studio.</h1>
        </div>
      </header>

      <div className="office-help">
        <span><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> walk</span>
        <span>Drag to look</span>
        <span>Click a label or press <kbd>E</kbd></span>
      </div>

      <div className="office-pad" aria-label="Movement controls">
        {MOVE_PADS.map((m) => (
          <button
            key={m.area}
            type="button"
            aria-label={`Move ${m.area}`}
            className="office-pad__btn"
            style={{ gridArea: m.area }}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              input.current.touch = { fwd: m.fwd, strafe: m.strafe };
            }}
            onPointerUp={() => (input.current.touch = { fwd: 0, strafe: 0 })}
            onPointerCancel={() => (input.current.touch = { fwd: 0, strafe: 0 })}
          >
            {m.label}
          </button>
        ))}
      </div>

      {!ready && <div className="office-loading">Unlocking the studio…</div>}
      <div className={`office-wipe ${leaving ? "is-on" : ""}`} />
    </div>
  );
}
