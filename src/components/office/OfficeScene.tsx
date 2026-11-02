import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Html, Lightformer } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import * as THREE from "three";
import { Model } from "./Model";
import { STATIONS, OBSTACLES, type Station } from "@/game/stations";
import { EYE_HEIGHT, INTERACT_DISTANCE, step, type Player } from "@/game/sim";

const PALETTE = {
  wall: "#efe6d8",
  wallAccent: "#c8643f",
  trim: "#3b2f2a",
  sky: "#f6d7b0",
};

type Input = { keys: Set<string>; touch: { fwd: number; strafe: number } };

function plankTexture() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const g = c.getContext("2d")!;
  const rows = 8;
  for (let r = 0; r < rows; r++) {
    let x = -((r * 137) % 256);
    while (x < 512) {
      const w = 180 + ((r * 53 + x) % 140);
      const l = 52 + ((r * 31 + x * 7) % 12);
      g.fillStyle = `hsl(28 42% ${l}%)`;
      g.fillRect(x, r * 64, w, 64);
      g.strokeStyle = "rgba(60,35,20,0.35)";
      g.lineWidth = 2;
      g.strokeRect(x, r * 64, w, 64);
      for (let i = 0; i < 6; i++) {
        g.strokeStyle = "rgba(90,50,25,0.08)";
        g.beginPath();
        g.moveTo(x, r * 64 + 8 + i * 9);
        g.lineTo(x + w, r * 64 + 10 + i * 9);
        g.stroke();
      }
      x += w;
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(4, 3);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function Room() {
  const floor = useMemo(plankTexture, []);
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial map={floor} roughness={0.75} />
      </mesh>
      {/* back wall with accent */}
      <mesh position={[0, 1.75, -5.05]} receiveShadow>
        <boxGeometry args={[14.2, 3.5, 0.1]} />
        <meshStandardMaterial color={PALETTE.wallAccent} roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.75, 5.05]}>
        <boxGeometry args={[14.2, 3.5, 0.1]} />
        <meshStandardMaterial color={PALETTE.wall} roughness={0.95} />
      </mesh>
      <mesh position={[-7.05, 1.75, 0]}>
        <boxGeometry args={[0.1, 3.5, 10.2]} />
        <meshStandardMaterial color={PALETTE.wall} roughness={0.95} />
      </mesh>
      {/* right wall with two windows */}
      <mesh position={[7.05, 1.75, 0]}>
        <boxGeometry args={[0.1, 3.5, 10.2]} />
        <meshStandardMaterial color={PALETTE.wall} roughness={0.95} />
      </mesh>
      {[-3.2, 3.6].map((z) => (
        <group key={z} position={[6.99, 1.9, z]}>
          <mesh>
            <planeGeometry args={[2.2, 1.6]} />
            <meshBasicMaterial color={PALETTE.sky} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[-0.02, 0, 0]} rotation-y={-Math.PI / 2}>
            <boxGeometry args={[2.3, 0.08, 0.06]} />
            <meshStandardMaterial color={PALETTE.trim} />
          </mesh>
        </group>
      ))}
      {/* ceiling */}
      <mesh position={[0, 3.5, 0]} rotation-x={Math.PI / 2}>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial color="#f7f1e8" side={THREE.DoubleSide} />
      </mesh>
      {/* skirting */}
      <mesh position={[0, 0.06, -4.98]}>
        <boxGeometry args={[14, 0.12, 0.04]} />
        <meshStandardMaterial color={PALETTE.trim} />
      </mesh>
      {/* framed posters on back wall */}
      {[-6, -2, 2, 6].map((x, i) => (
        <mesh key={x} position={[x, 2.4, -4.98]}>
          <planeGeometry args={[1, 1.3]} />
          <meshStandardMaterial color={["#f2c57c", "#2f4858", "#efe6d8", "#86a873"][i]} />
        </mesh>
      ))}
    </group>
  );
}

function Furniture() {
  return (
    <group>
      {[-4, 0, 4].map((x, i) => (
        <group key={x}>
          <Model name="desk" position={[x, 0, -3.85]} rotation={Math.PI} />
          <Model name="computerScreen" position={[x, 0.91, -4.2]} rotation={0} />
          <Model name="computerKeyboard" position={[x, 0.91, -3.55]} rotation={0} />
          <Model name="chairDesk" position={[x + 0.1, 0, -2.75]} rotation={Math.PI + (i - 1) * 0.3} />
          {i !== 1 && <Model name="plantSmall1" position={[x + 0.65, 0.91, -4.15]} />}
        </group>
      ))}
      <Model name="bookcaseOpen" position={[-6.5, 0, -0.05]} rotation={Math.PI / 2} />
      <Model name="bookcaseOpen" position={[-6.5, 0, 1.05]} rotation={Math.PI / 2} />
      <Model name="books" position={[-6.5, 0.98, 1.05]} rotation={Math.PI / 2} />
      <Model name="books" position={[-6.5, 0.98, -0.05]} rotation={Math.PI / 2} />
      <Model name="cabinetTelevision" position={[6.45, 0, 0.5]} rotation={-Math.PI / 2} />
      <Model name="televisionModern" position={[6.45, 0.75, 0.5]} rotation={-Math.PI / 2} />
      <Model name="speaker" position={[6.5, 0, -0.9]} rotation={-Math.PI / 2} />
      <Model name="speaker" position={[6.5, 0, 1.9]} rotation={-Math.PI / 2} />
      <Model name="loungeSofa" position={[3.6, 0, 0.5]} rotation={Math.PI / 2} />
      <Model name="tableCoffee" position={[5, 0, 0.5]} rotation={Math.PI / 2} />
      <Model name="rugRectangle" position={[4.7, 0.005, 0.5]} rotation={Math.PI / 2} />
      <Model name="cabinetTelevision" position={[-5.6, 0, 4.55]} rotation={Math.PI} />
      <Model name="kitchenCoffeeMachine" position={[-5.8, 0.75, 4.6]} rotation={Math.PI} />
      <Model name="radio" position={[-5.1, 0.75, 4.6]} rotation={Math.PI} />
      <Model name="pottedPlant" position={[-6.5, 0, 4.4]} />
      <Model name="pottedPlant" position={[6.4, 0, -4.4]} />
      <Model name="pottedPlant" position={[-6.4, 0, -4.4]} />
      <Model name="lampSquareFloor" position={[6.5, 0, 3.0]} />
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
        position={[0, -0.6, 0.4]}
        onClick={(e) => {
          e.stopPropagation();
          if (isDrag()) return;
          onOpen(station);
        }}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "")}
      >
        <boxGeometry args={[1.8, 1.4, 1.4]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <Html center distanceFactor={7} zIndexRange={[10, 0]}>
        <button
          type="button"
          onClick={() => onOpen(station)}
          className={`station-tag ${active ? "is-active" : ""}`}
        >
          <span className="station-tag__hint">{station.hint}</span>
          <span className="station-tag__label">{station.label}</span>
          {active && <span className="station-tag__key">Press E</span>}
        </button>
      </Html>
    </group>
  );
}

function Walker({
  input,
  player,
  onNearest,
}: {
  input: React.MutableRefObject<Input>;
  player: React.MutableRefObject<Player>;
  onNearest: (id: string | null) => void;
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
    step(p, fwd, strafe, delta, OBSTACLES);
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
  const player = useRef<Player>({ x: 0, z: 3.6, yaw: 0, pitch: -0.08 });
  const [nearest, setNearest] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const nearestRef = useRef<string | null>(null);
  nearestRef.current = nearest;
  const drag = useRef<{ x: number; y: number; moved: number } | null>(null);
  const lastMoved = useRef(0);

  const open = (s: Station) => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(() => {
      navigate({ to: s.to, params: s.params } as never);
    }, 450);
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
        camera={{ fov: 68, near: 0.05, far: 60, position: [0, EYE_HEIGHT, 3.6] }}
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
        <color attach="background" args={["#e9dcc8"]} />
        <fog attach="fog" args={["#e9dcc8", 14, 30]} />
        <hemisphereLight args={["#fff4e2", "#8a6a50", 0.55]} />
        <directionalLight
          position={[9, 7, -2]}
          intensity={2.2}
          color="#ffd9a8"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-9}
          shadow-camera-right={9}
          shadow-camera-top={7}
          shadow-camera-bottom={-7}
          shadow-bias={-0.0005}
        />
        <pointLight position={[-4, 3, -2.5]} intensity={6} distance={7} color="#ffcf9a" />
        <pointLight position={[4, 3, -2.5]} intensity={6} distance={7} color="#ffcf9a" />
        <pointLight position={[-5, 2.8, 3]} intensity={5} distance={6} color="#ffd8b0" />
        <Environment resolution={128}>
          <Lightformer intensity={1.6} position={[0, 5, 0]} scale={[10, 10, 1]} rotation-x={Math.PI / 2} />
          <Lightformer intensity={1.2} color="#ffd2a0" position={[8, 2, 0]} rotation-y={-Math.PI / 2} scale={[10, 3, 1]} />
          <Lightformer intensity={0.6} color="#c8643f" position={[0, 2, -8]} scale={[12, 3, 1]} />
        </Environment>

        <Room />
        <Walker input={input} player={player} onNearest={setNearest} />
        <Suspense fallback={null}>
          <Furniture />
          <ContactShadows position={[0, 0.01, 0]} scale={16} opacity={0.35} blur={2.4} far={2} />
          {STATIONS.map((s) => (
            <StationMarker key={s.id} station={s} active={nearest === s.id} onOpen={open} isDrag={() => lastMoved.current > 6} />
          ))}
          <ReadyFlag onReady={() => setReady(true)} />
        </Suspense>
      </Canvas>

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
