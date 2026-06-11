'use client';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';

const SKILLS = [
  { id: 'python', name: 'Python', proof: 'LUMIFACE', color: '#3776AB', distance: 2.5, speed: 0.8, size: 0.2 },
  { id: 'django', name: 'Django', proof: 'AI Interviewer', color: '#092E20', distance: 3.5, speed: 0.6, size: 0.25 },
  { id: 'nextjs', name: 'Next.js', proof: 'Kazuha Closet', color: '#ffffff', distance: 4.5, speed: 0.5, size: 0.22 },
  { id: 'mongodb', name: 'MongoDB', proof: 'TaskFlow', color: '#47A248', distance: 5.5, speed: 0.4, size: 0.2 },
  { id: 'opencv', name: 'OpenCV', proof: 'LUMIFACE', color: '#5C3EE8', distance: 3.0, speed: 0.7, size: 0.18 },
  { id: 'threejs', name: 'Three.js', proof: 'Trophy Room V2', color: '#000000', distance: 4.0, speed: 0.55, size: 0.15 },
  { id: 'rest', name: 'REST APIs', proof: 'Kazuha Closet', color: '#0096D6', distance: 5.0, speed: 0.45, size: 0.2 },
];

function OrbitingNode({ data, offsetAngle }: { data: typeof SKILLS[0], offsetAngle: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      // Orbit around center
      groupRef.current.rotation.y = (state.clock.elapsedTime * data.speed) + offsetAngle;
    }
    if (meshRef.current) {
      // Counter-rotate so label faces camera (optional, Html handles this)
      const targetScale = hovered ? 1.5 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      <group position={[data.distance, 0, 0]}>
        <Sphere
          ref={meshRef}
          args={[data.size, 32, 32]}
          onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
          onPointerOut={(e) => { e.stopPropagation(); setHover(false); document.body.style.cursor = 'default'; }}
        >
          <meshStandardMaterial color={data.color} metalness={0.5} roughness={0.2} emissive={data.color} emissiveIntensity={0.2} />
        </Sphere>
        
        {/* Orbit Path */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-data.distance, 0, 0]}>
          <ringGeometry args={[data.distance - 0.02, data.distance + 0.02, 64]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.05} side={THREE.DoubleSide} />
        </mesh>

        <Html
          position={[0, 0.4, 0]}
          center
          style={{
            transition: 'all 0.3s',
            opacity: hovered ? 1 : 0.6,
            transform: hovered ? 'scale(1)' : 'scale(0.8)',
            pointerEvents: 'none',
          }}
        >
          <div className="flex flex-col items-center">
            <div className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border shadow-xl flex flex-col items-center gap-1" style={{ borderColor: `${data.color}50` }}>
              <span className="text-white text-xs font-bold whitespace-nowrap">{data.name}</span>
              {hovered && (
                <span className="text-[10px] text-[#A1A1AA] flex items-center gap-1 whitespace-nowrap">
                  <span className="text-[#7C3AED]">→</span> {data.proof}
                </span>
              )}
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
}

function CenterNode() {
  return (
    <group>
      <Sphere args={[0.5, 32, 32]}>
        <meshStandardMaterial color="#7C3AED" metalness={0.8} roughness={0.2} emissive="#7C3AED" emissiveIntensity={0.5} />
      </Sphere>
      <Html position={[0, -0.8, 0]} center style={{ pointerEvents: 'none' }}>
        <div className="px-3 py-1 rounded bg-[#7C3AED]/20 border border-[#7C3AED]/50 text-white text-xs font-black tracking-widest uppercase backdrop-blur-md shadow-[0_0_20px_rgba(124,58,237,0.4)]">
          Priyanshu
        </div>
      </Html>
    </group>
  );
}

export default function SkillsGalaxyScene() {
  return (
    <div className="relative w-full h-[350px] sm:h-[450px] md:h-[600px] bg-[#0A0A0A] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(124,58,237,0.1) 0%, transparent 60%)' }} />
      
      <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#7C3AED" />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <CenterNode />
        
        {SKILLS.map((skill, index) => (
          <OrbitingNode key={skill.id} data={skill} offsetAngle={(index * Math.PI * 2) / SKILLS.length} />
        ))}
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={0}
        />
      </Canvas>

      {/* Hint */}
      <div className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-[#52525B] pointer-events-none">
        Interactive 3D Galaxy · Drag to explore
      </div>
    </div>
  );
}
