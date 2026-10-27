"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { createVinylGrooveTexture, createCenterLabelTexture } from "./vinylProceduralTextures";

interface VinylSceneProps {
  isSpinning: boolean;
  isTonearmEngaged: boolean;
  mousePos: { x: number; y: number };
}

export const VinylScene: React.FC<VinylSceneProps> = ({
  isSpinning,
  isTonearmEngaged,
  mousePos,
}) => {
  const rootRef = useRef<THREE.Group>(null);
  const platterRef = useRef<THREE.Group>(null);
  const tonearmRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Create high-resolution procedural textures once
  const { grooveTexture, labelTexture } = useMemo(() => {
    return {
      grooveTexture: createVinylGrooveTexture(),
      labelTexture: createCenterLabelTexture(),
    };
  }, []);

  useEffect(() => {
    return () => {
      grooveTexture.dispose();
      labelTexture.dispose();
    };
  }, [grooveTexture, labelTexture]);

  // Animation frame loop: 60fps smooth rotation and tactile cursor tilt
  useFrame((state, delta) => {
    // 1. Platter & Disc continuous rotation
    if (platterRef.current && isSpinning) {
      platterRef.current.rotation.y += delta * 2.2;
    }

    // 2. Subtle, elegant cursor tilt for interactive depth
    if (rootRef.current) {
      const targetRotX = 0.58 + mousePos.y * 0.18;
      const targetRotY = mousePos.x * 0.22;
      rootRef.current.rotation.x = THREE.MathUtils.lerp(rootRef.current.rotation.x, targetRotX, delta * 3);
      rootRef.current.rotation.y = THREE.MathUtils.lerp(rootRef.current.rotation.y, targetRotY, delta * 3);
    }

    // 3. Tonearm engagement angle interpolation
    if (tonearmRef.current) {
      const targetTonearmAngle = isTonearmEngaged ? 0.42 : -0.18;
      tonearmRef.current.rotation.y = THREE.MathUtils.lerp(
        tonearmRef.current.rotation.y,
        targetTonearmAngle,
        delta * 4
      );
    }
  });

  const scale = Math.min(viewport.width / 6.8, 0.78);

  return (
    <group ref={rootRef} position={[0, 0.05, 0]} scale={[scale, scale, scale]} rotation={[0.58, 0, 0]}>
      {/* STUDIO LIGHTING WITH HIGH CONTRAST */}
      <ambientLight intensity={0.8} color="#FFFFFF" />
      <directionalLight
        position={[6, 10, 6]}
        intensity={3.0}
        color="#FFF9EE"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {/* High-contrast rim lights so dark materials never vanish against the background */}
      <directionalLight position={[-6, 4, -4]} intensity={2.0} color="#DDB36D" />
      <directionalLight position={[0, -4, -4]} intensity={1.2} color="#FFFFFF" />
      <spotLight
        position={[0, 6, 2]}
        angle={0.65}
        penumbra={0.7}
        intensity={2.2}
        color="#F8F3EA"
      />

      {/* 1. MINIMALIST TURNTABLE CHASSIS / PLINTH */}
      <group position={[0, -0.35, 0]}>
        {/* Main Solid Wooden/Obsidian Plinth Base */}
        <mesh position={[0, 0, 0]} receiveShadow castShadow>
          <boxGeometry args={[5.6, 0.45, 4.4]} />
          <meshStandardMaterial
            color="#1C1A17"
            roughness={0.4}
            metalness={0.2}
          />
        </mesh>

        {/* Top Chamfered Architectural Plate (Brushed Gunmetal) */}
        <mesh position={[0, 0.23, 0]} receiveShadow>
          <boxGeometry args={[5.46, 0.02, 4.26]} />
          <meshStandardMaterial
            color="#262420"
            roughness={0.25}
            metalness={0.6}
          />
        </mesh>

        {/* 4 Brass Isolation Feet with Damping Rings */}
        {[
          [-2.4, -0.3, -1.8],
          [2.4, -0.3, -1.8],
          [-2.4, -0.3, 1.8],
          [2.4, -0.3, 1.8],
        ].map(([x, y, z], idx) => (
          <group key={idx} position={[x, y, z]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.26, 0.22, 0.18, 24]} />
              <meshStandardMaterial color="#C89D56" metalness={0.95} roughness={0.15} />
            </mesh>
            <mesh position={[0, -0.09, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 0.04, 24]} />
              <meshStandardMaterial color="#0A0A08" roughness={0.9} />
            </mesh>
          </group>
        ))}

        {/* Power / Speed Toggle Dial (Minimalist tactile knob) */}
        <group position={[-2.2, 0.26, 1.5]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.18, 0.18, 0.08, 24]} />
            <meshStandardMaterial color="#C89D56" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[0.04, 0.03, 0.24]} />
            <meshStandardMaterial color="#0E0E0C" />
          </mesh>
        </group>
      </group>

      {/* 2. ROTATING TURNTABLE PLATTER & VINYL DISC */}
      <group ref={platterRef} position={[-0.55, 0, 0]}>
        {/* Polished Machined Aluminum Platter (High contrast gleaming rim) */}
        <mesh position={[0, -0.08, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[2.55, 2.55, 0.14, 64]} />
          <meshStandardMaterial
            color="#D8D5CC"
            metalness={0.96}
            roughness={0.15}
          />
        </mesh>

        {/* Anti-static Felt Slipmat Ring */}
        <mesh position={[0, 0.001, 0]}>
          <cylinderGeometry args={[2.52, 2.52, 0.02, 64]} />
          <meshStandardMaterial color="#161512" roughness={0.85} />
        </mesh>

        {/* 12" Vinyl Record Body (Deep Glossy Lacquer Black) */}
        <mesh position={[0, 0.022, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[2.42, 2.42, 0.03, 64]} />
          <meshStandardMaterial
            color="#0A0A08"
            roughness={0.18}
            metalness={0.92}
            bumpMap={grooveTexture}
            bumpScale={0.025}
          />
        </mesh>

        {/* Center Paper Label Top (Crisp Minimalist Label) */}
        <mesh position={[0, 0.041, 0]}>
          <cylinderGeometry args={[0.82, 0.82, 0.004, 48]} />
          <meshStandardMaterial
            map={labelTexture}
            roughness={0.5}
            metalness={0.1}
          />
        </mesh>

        {/* Center Brass Spindle Pin */}
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.065, 0.065, 0.3, 24]} />
          <meshStandardMaterial color="#DDB36D" metalness={0.98} roughness={0.12} />
        </mesh>
      </group>

      {/* 3. PRECISION AUDIOPHILE TONEARM */}
      <group position={[1.85, 0, 0.3]}>
        {/* Tonearm Base / Gimbal Pillar (Solid Brass & Carbon) */}
        <mesh position={[0, -0.05, 0]} castShadow>
          <cylinderGeometry args={[0.34, 0.38, 0.35, 32]} />
          <meshStandardMaterial color="#C89D56" metalness={0.95} roughness={0.18} />
        </mesh>

        {/* Tone-arm Cueing Lift Platform */}
        <mesh position={[-0.2, 0.08, -0.1]}>
          <boxGeometry args={[0.25, 0.04, 0.45]} />
          <meshStandardMaterial color="#2B2A25" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Pivot Gimbal Ring */}
        <mesh position={[0, 0.22, 0]} castShadow>
          <torusGeometry args={[0.2, 0.04, 16, 32]} />
          <meshStandardMaterial color="#DDB36D" metalness={0.95} roughness={0.15} />
        </mesh>

        {/* Rear Counterweight (Machined Brass with Calibration Markings) */}
        <mesh position={[0, 0.22, 0.55]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.24, 0.24, 0.34, 32]} />
          <meshStandardMaterial color="#2B2A25" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Rotating Arm Assembly */}
        <group ref={tonearmRef} position={[0, 0.22, 0]} rotation={[0, -0.18, 0]}>
          {/* Main Tonearm Wand (Brushed Carbon / Gold Tube) */}
          <group position={[-1.0, 0.02, -0.7]} rotation={[0, -0.65, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.038, 0.042, 2.2, 16]} />
              <meshStandardMaterial color="#C89D56" metalness={0.95} roughness={0.18} />
            </mesh>
          </group>

          {/* Headshell (Matte Obsidian) */}
          <mesh position={[-1.95, 0.01, -1.52]} rotation={[0, -0.22, 0]} castShadow>
            <boxGeometry args={[0.16, 0.06, 0.4]} />
            <meshStandardMaterial color="#141311" metalness={0.6} roughness={0.35} />
          </mesh>

          {/* Cartridge (High-contrast Terracotta Ortofon style) */}
          <mesh position={[-1.95, -0.06, -1.52]}>
            <boxGeometry args={[0.13, 0.08, 0.26]} />
            <meshStandardMaterial color="#C05436" metalness={0.4} roughness={0.3} />
          </mesh>

          {/* Stylus Cantilever & Diamond Tip */}
          <mesh position={[-1.95, -0.13, -1.6]} rotation={[-0.25, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.08, 8]} />
            <meshStandardMaterial color="#F0F0F0" metalness={0.98} roughness={0.08} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
