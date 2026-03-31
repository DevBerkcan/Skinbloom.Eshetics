"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

const ORB_CONFIG = [
  { position: [-3.5, 1.5, -2], color: "#C49994", opacity: 0.12, speed: 0.4, radius: 1.4 },
  { position: [3.2, -1.0, -3], color: "#C49994", opacity: 0.10, speed: 0.28, radius: 1.8 },
  { position: [0.5, 2.5, -4],  color: "#C49994", opacity: 0.08, speed: 0.55, radius: 1.1 },
  { position: [-2.0, -2.2, -2], color: "#017374", opacity: 0.09, speed: 0.35, radius: 1.3 },
  { position: [4.0, 0.8, -3],  color: "#017374", opacity: 0.07, speed: 0.22, radius: 1.6 },
  { position: [1.2, -0.5, -1], color: "#f5efee", opacity: 0.14, speed: 0.48, radius: 0.9 },
];

function Orb({ position, color, opacity, speed, radius }) {
  const mesh = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    mesh.current.position.y = position[1] + Math.sin(t * speed) * 0.35;
    mesh.current.position.x = position[0] + Math.cos(t * speed * 0.65) * 0.25;
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[radius, 24, 24]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

export default function TreatmentOrbs() {
  return (
    <Canvas
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
      camera={{ position: [0, 0, 5], fov: 55 }}
    >
      {ORB_CONFIG.map((orb, i) => (
        <Orb key={i} {...orb} />
      ))}
    </Canvas>
  );
}
