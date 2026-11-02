import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

export const FURNITURE_SCALE = 2.4;

type Props = {
  name: string;
  position?: [number, number, number];
  rotation?: number;
  scale?: number;
};

/** Loads a furniture GLB, centers it on x/z, rests it on the floor and scales it to room size. */
export function Model({ name, position = [0, 0, 0], rotation = 0, scale = FURNITURE_SCALE }: Props) {
  const { scene } = useGLTF(`/models/${name}.glb`);
  const obj = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    const box = new THREE.Box3().setFromObject(c);
    const center = box.getCenter(new THREE.Vector3());
    c.position.set(-center.x, -box.min.y, -center.z);
    return c;
  }, [scene]);
  return (
    <group position={position} rotation-y={rotation} scale={scale}>
      <primitive object={obj} />
    </group>
  );
}

[
  "desk", "chairDesk", "laptop", "pottedPlant", "plantSmall1", "lampSquareFloor",
  "kitchenCoffeeMachine", "cabinetTelevision", "greeter",
].forEach((n) => useGLTF.preload(`/models/${n}.glb`));
