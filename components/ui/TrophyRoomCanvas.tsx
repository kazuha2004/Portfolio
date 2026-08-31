'use client';
import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Line, OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const ACHIEVEMENTS = [
  { id: 'patent', title: 'Patent Filed', detail: 'App No: 202511051742 A', color: '#F59E0B', pos: [0, 0, 0] },
  { id: 'icpc', title: 'ICPC Regionals', detail: 'Asia Kanpur Participant', color: '#06B6D4', pos: [-2, 1.5, -1] },
  { id: 'expo', title: 'Tech Expo Winner', detail: 'AI-Powered Systems Innovation', color: '#F43F5E', pos: [2, 1.2, -1.5] },
  { id: 'ibm', title: 'IBM AI', detail: 'AI Foundations Certification', color: '#3B82F6', pos: [-1.5, -1.5, -0.5] },
  { id: 'deloitte', title: 'Deloitte', detail: 'Tech Consulting Job Sim', color: '#8B5CF6', pos: [1.8, -1.2, 0.5] },
  { id: 'anthropic', title: 'Anthropic Claude', detail: 'Code in Action Certification', color: '#10B981', pos: [0, -2, -1.5] },
  { id: 'dsa', title: '450+ DSA', detail: 'LeetCode, CodeChef (3★)', color: '#F97316', pos: [0, 2, 0.5] },
];

type AchievementData = typeof ACHIEVEMENTS[0];

function Node({ data, onClick }: { data: AchievementData; onClick: (data: AchievementData) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + data.pos[0]) * 0.002;
      const targetScale = hovered ? 1.5 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group position={data.pos as [number, number, number]}>
      <Sphere
        ref={meshRef}
        args={[0.15, 32, 32]}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHover(false); document.body.style.cursor = 'default'; }}
        onClick={(e) => { e.stopPropagation(); onClick(data); }}
      >
        <meshBasicMaterial color={data.color} toneMapped={false} />
      </Sphere>

      {/* Outer Glow */}
      <Sphere args={[0.2, 32, 32]}>
        <meshBasicMaterial color={data.color} transparent opacity={hovered ? 0.3 : 0.1} />
      </Sphere>

      {/* Label */}
      <Html
        position={[0, 0.3, 0]}
        center
        style={{
          transition: 'all 0.3s',
          opacity: hovered ? 1 : 0.4,
          transform: hovered ? 'scale(1)' : 'scale(0.8)',
          pointerEvents: 'none'
        }}
      >
        <div className="flex flex-col items-center">
          <div className="px-2 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold tracking-wider whitespace-nowrap shadow-xl">
            {data.title}
          </div>
        </div>
      </Html>
    </group>
  );
}

function ConstellationConnections({ hoveredNode }: { hoveredNode: string | null }) {
  const lines = useMemo(() => {
    const l = [];
    for (let i = 0; i < ACHIEVEMENTS.length; i++) {
      for (let j = i + 1; j < ACHIEVEMENTS.length; j++) {
        const p1 = new THREE.Vector3(...ACHIEVEMENTS[i].pos);
        const p2 = new THREE.Vector3(...ACHIEVEMENTS[j].pos);
        if (p1.distanceTo(p2) < 4) {
          l.push({ p1, p2, i, j });
        }
      }
    }
    return l;
  }, []);

  return (
    <>
      {lines.map((line, idx) => {
        const isHovered = hoveredNode === ACHIEVEMENTS[line.i].id || hoveredNode === ACHIEVEMENTS[line.j].id;
        return (
          <Line
            key={idx}
            points={[line.p1, line.p2]}
            color={isHovered ? '#ffffff' : '#333333'}
            lineWidth={isHovered ? 2 : 1}
            transparent
            opacity={isHovered ? 0.6 : 0.2}
          />
        );
      })}
    </>
  );
}

interface TrophyCanvasProps {
  onNodeClick: (data: { title: string; detail: string; color: string }) => void;
}

export default function TrophyRoomCanvas({ onNodeClick }: TrophyCanvasProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleClick = (data: AchievementData) => {
    setActiveId(data.id);
    onNodeClick(data);
  };

  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <ConstellationConnections hoveredNode={activeId} />
      {ACHIEVEMENTS.map((ach) => (
        <Node key={ach.id} data={ach} onClick={handleClick} />
      ))}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2 + 0.2}
        minPolarAngle={Math.PI / 2 - 0.2}
      />
    </Canvas>
  );
}
