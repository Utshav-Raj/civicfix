"use client";

import { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

function WireframeGlobe() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.12;
  });
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[2.2, 48, 48]} />
        <meshBasicMaterial color="#3B82F6" wireframe opacity={0.35} transparent />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.18, 16, 16]} />
        <meshBasicMaterial color="#0d1626" opacity={0.9} transparent />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.36, 48, 24]} />
        <meshBasicMaterial color="#60A5FA" wireframe opacity={0.12} transparent />
      </mesh>
      {/* pulse points */}
      {[
        [1.2, 0.5, 1.6],
        [-1.5, 1.0, 1.2],
        [0.5, -1.8, 1.1],
        [-0.8, -0.6, -1.9],
        [1.9, -0.3, -1.0],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshBasicMaterial color="#FB923C" />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.14, 12, 12]} />
            <meshBasicMaterial color="#F97316" opacity={0.3} transparent />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function Globe() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} color="#60A5FA" intensity={1.2} />
        <pointLight position={[-5, -5, -5]} color="#8B5CF6" intensity={0.8} />
        <WireframeGlobe />
      </Canvas>
    </div>
  );
}
