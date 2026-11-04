import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface WallPaintingProps {
  imagePath?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export function WallPainting({
  imagePath = "/my-artwork.jpg", // Place your picture in public/
  position = [0, 1.8, -3.42],    // Back wall position
  rotation = [0, 0, 0],
  scale = 1.5,                    // Matches FURNITURE_SCALE
}: WallPaintingProps) {
  // Load the frame model
  const { scene } = useGLTF("/models/pictureFrameLarge.glb");
  const clonedFrame = scene.clone();

  // Load and configure your artwork texture
  const texture = useTexture(imagePath);
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* The 3D frame model */}
      <primitive object={clonedFrame} />

      {/* The canvas surface inside the frame */}
      {/* Adjust the width/height (e.g. 0.8 x 0.5) and z-offset to fit the inner border */}
      <mesh
        position={[0, 6.06, -0.02]}
        rotation={[0, Math.PI, 0]}
      >
        <planeGeometry args={[7.55, 12]} />
        <meshStandardMaterial map={texture} roughness={0.4} metalness={0.05} />
      </mesh>
    </group>
  );
}

// Preload assets for seamless loading
useGLTF.preload("/models/pictureFrameLarge.glb");
