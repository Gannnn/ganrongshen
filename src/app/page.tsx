'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Stars, useTexture, Html } from '@react-three/drei';
import { Text } from '@react-three/drei';
import { useRef, useEffect, useMemo, Suspense, useState } from 'react';
import * as THREE from 'three';

// Modern Minimalist House
function House({ setShowResume }: { setShowResume: (v: boolean) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const windowGlowRefs = useRef<THREE.PointLight[]>([]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
    }
    windowGlowRefs.current.forEach((light, i) => {
      if (light) {
        light.intensity = 2.5 + Math.sin(state.clock.elapsedTime * 1.5 + i * 0.5) * 0.8;
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, -0.95, 0]}>
      {/* Main First Floor Block */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 4, 3]} />
        <meshStandardMaterial
          color="#f5f5f5"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

     {/* Flat Roof Overhang - First Floor Pillar */}
      <mesh position={[-0.5, 2.7, 1]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.1, 4.1]} />
        <meshStandardMaterial
          color="#d0d0d0"
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* Main First Floor Pillar */}
      <mesh position={[-0.5, 0.7, 1]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 4, 3]} />
        <meshStandardMaterial
          color="#f5f5f5"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Main Left First Floor Pillar */}
      <mesh position={[-1.15, 0.7, 1]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 4, 3.6]} />
        <meshStandardMaterial
          color="#f5f5f5"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Main Right First Floor Pillar */}
      <mesh position={[0.16, 0.7, 1]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 4, 3.6]} />
        <meshStandardMaterial
          color="#f5f5f5"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Glass Window Main First Floor Pillar */}
      <mesh position={[-0.5, 0.7, 2.6]}>
        <boxGeometry args={[0.96, 4, 0.02]} />
        <meshPhysicalMaterial
          color="#a0c4ff"
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.9}
          transmission={0.9}
          thickness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Second Floor - Offset */}
      <mesh position={[1.4, 1.9, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[5, 4, 1.5]} />
        <meshStandardMaterial
          color="#e8e8e8"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Left Second Floor Pillar */}
      <mesh position={[-0.76, 1.9, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 4, 3]} />
        <meshStandardMaterial
          color="#f5f5f5"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Right Second Floor Pillar */}
      <mesh position={[3.556, 1.9, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 4, 3]} />
        <meshStandardMaterial
          color="#f5f5f5"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Flat Roof Overhang - SEcond Floor */}
      <mesh position={[1.4, 4, -0.2]} castShadow>
        <boxGeometry args={[5, 0.25, 2.99]} />
        <meshStandardMaterial
          color="#f5f5f5"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Flat Roof Overhang - First Floor */}
      <mesh position={[0, 2.7, 0]} castShadow>
        <boxGeometry args={[4.3, 0.1, 4.1]} />
        <meshStandardMaterial
          color="#d0d0d0"
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* Front Door Overhang Window Pane */}
      <mesh position={[1.15, 1.7, 2.5]}>
        <boxGeometry args={[1.69, 0.5, 0.02]} />
        <meshPhysicalMaterial
          color="#a0c4ff"
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.9}
          transmission={0.9}
          thickness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Side Door Overhang Window Pane */}
      <mesh position={[1.95, 1.7, 2]}>
        <boxGeometry args={[0.08, 0.5, 1]} />
        <meshPhysicalMaterial
          color="#a0c4ff"
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.9}
          transmission={0.9}
          thickness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Garage - Proper Alignment */}
      <group position={[3.2, 0.55, 0]}>
        {/* Garage body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.5, 1.1, 2.8]} />
          <meshStandardMaterial color="#e9ecef" roughness={0.8} metalness={0.05} />
        </mesh>

        {/* Garage door (wood panel) */}
        <mesh position={[0.02, -0.02, 1.42]}>
          <boxGeometry args={[2.2, 0.9, 0.04]} />
          <meshStandardMaterial color="#5a3a28" roughness={0.6} metalness={0.2} />
        </mesh>

        {/* Roof slab over garage */}
        <mesh position={[0, 0.62, 0]}>
          <boxGeometry args={[2.6, 0.1, 2.99]} />
          <meshStandardMaterial color="#d6d6d6" roughness={0.6} metalness={0.2} />
        </mesh>

        {/* Soft light accent */}
        <pointLight position={[0, 0.75, 1.3]} color="#ffcc88" intensity={0.7} distance={3} />
      </group>

      {/* Flat Roof - Second Floor */}
      <mesh position={[-0.6, 2.55, -0.2]} castShadow>
        <boxGeometry args={[2.7, 0.1, 2.6]} />
        <meshStandardMaterial
          color="#c8c8c8"
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* Flat Roof Overhang - Main Door */}
      <mesh position={[1.15, 1.4, 1.51]} castShadow>
        <boxGeometry args={[1.69, 0.1, 2.5]} />
        <meshStandardMaterial
          color="#d0d0d0"
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* Main Door - Modern */}
      <mesh position={[1.3, 0.6, 1.51]} castShadow>
        <boxGeometry args={[0.9, 1.4, 0.05]} />
        <meshStandardMaterial
          color="#5a4632"
          roughness={0.75}
          metalness={0.2}
        />
      </mesh>

      {/* Door Handle - Modern Bar */}
      <mesh position={[1.0 , 0.6, 1.53]}>
        <boxGeometry args={[0.03, 0.4, 0.04]} />
        <meshStandardMaterial
          color="#c0c0c0"
          roughness={0.2}
          metalness={0.95}
        />
      </mesh>

      {/* Modern Entrance Steps */}
      <mesh position={[1.3, 0.08, 2]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.15, 0.8]} />
        <meshStandardMaterial
          color="#b0b0b0"
          roughness={0.8}
        />
      </mesh>

      {/* Walkway */}
      <mesh position={[0.2, 0.01, 3.2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1.5, 2.5]} />
        <meshStandardMaterial
          color="#999999"
          roughness={0.9}
        />
      </mesh>

    {/* Basketball Court */}
    <group position={[-5, 0.2, 0]}>
      {/* Court surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4, 7]} />
        <meshStandardMaterial color="#c85a28" roughness={0.8} metalness={0.05} />
      </mesh>

      {/* Court lines - center circle */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 0.95, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>

      {/* Court lines - half court line */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 0.05]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>

      {/* Court lines - three point arc near */}
      <mesh position={[0, 0.01, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 1.85, 32, 1, 0, Math.PI]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>

      {/* Court lines - three point arc far */}
      <mesh position={[0, 0.01, -3]} rotation={[-Math.PI / 2, 0, Math.PI]}>
        <ringGeometry args={[1.8, 1.85, 32, 1, 0, Math.PI]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>

      {/* Basketball hoop - near side */}
      <group position={[0, 0, 3.5]}>
        {/* Pole */}
        <mesh position={[0, 1.0, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 2, 16]} />
          <meshStandardMaterial color="#6b7280" roughness={0.6} metalness={0.4} />
        </mesh>

        {/* Backboard */}
        <mesh position={[0, 2.0, 0.1]} castShadow>
          <boxGeometry args={[1.2, 0.8, 0.05]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
        </mesh>

        {/* Rim */}
        <mesh position={[0, 1.7, -0.3]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.22, 0.015, 16, 32]} />
          <meshStandardMaterial color="#ff6b35" roughness={0.4} metalness={0.6} />
        </mesh>

        {/* Net */}
        <mesh position={[0, 1.55, -0.3]}>
          <cylinderGeometry args={[0.21, 0.18, 0.25, 8, 1, true]} />
          <meshStandardMaterial color="#ffffff" wireframe opacity={0.6} transparent />
        </mesh>
      </group>

      {/* Basketball hoop - far side */}
      <group position={[0, 0, -3.5]} rotation={[0, Math.PI, 0]}>
        {/* Pole */}
        <mesh position={[0, 1.0, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 2, 16]} />
          <meshStandardMaterial color="#6b7280" roughness={0.6} metalness={0.4} />
        </mesh>

        {/* Backboard */}
        <mesh position={[0, 2.0, 0.1]} castShadow>
          <boxGeometry args={[1.2, 0.8, 0.05]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
        </mesh>

        {/* Rim */}
        <mesh position={[0, 1.7, -0.3]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.22, 0.015, 16, 32]} />
          <meshStandardMaterial color="#ff6b35" roughness={0.4} metalness={0.6} />
        </mesh>

        {/* Net */}
        <mesh position={[0, 1.55, -0.3]}>
          <cylinderGeometry args={[0.21, 0.18, 0.25, 8, 1, true]} />
          <meshStandardMaterial color="#ffffff" wireframe opacity={0.6} transparent />
        </mesh>
      </group>

      {/* Court lighting */}
      <pointLight position={[0, 4, 2]} intensity={1.5} color="#fff8e1" distance={10} />
      <pointLight position={[0, 4, -2]} intensity={1.5} color="#fff8e1" distance={10} />
    </group>

      {/* Main vertical pillar accent lights */}
      <pointLight position={[-0.5, 0.2, 1.6]} color="#ffddaa" intensity={0.5} distance={2.5} />
      <pointLight position={[-0.5, 1.5, 1.6]} color="#ffddaa" intensity={0.4} distance={2.5} />
      <pointLight position={[-0.5, 2.8, 1.6]} color="#ffddaa" intensity={0.3} distance={2.2} />

      {/* Garage facade lights */}
      <pointLight position={[2.6, 0.75, 1.3]} color="#ffcc88" intensity={0.7} distance={3} />
      <pointLight position={[0.5, 0.75, 1.3]} color="#ffcc88" intensity={0.7} distance={3} />

      {/* Roofline accents */}
      <pointLight position={[0, 2.65, 1.8]} color="#ffebb4" intensity={0.5} distance={3} />
      <pointLight position={[-1.5, 2.65, 1.8]} color="#ffebb4" intensity={0.5} distance={3} />
      <pointLight position={[1.4, 3.9, -0.2]} color="#ffebb4" intensity={0.4} distance={3.5} />

      {/* First floor overhang accent */}
      <pointLight position={[0, 2.65, 1.5]} color="#ffdca8" intensity={0.6} distance={3} />
      <pointLight position={[-1, 2.65, 1.5]} color="#ffdca8" intensity={0.6} distance={3} />

      {/* Second floor overhang accent */}
      <pointLight position={[1.4, 3.9, -0.2]} color="#ffdca8" intensity={0.5} distance={3.5} />

      {/* Step lights */}
      <pointLight position={[1.7, 0.1, 2]} color="#ffcc88" intensity={0.4} distance={2.5} />
      <pointLight position={[0.9, 0.1, 2]} color="#ffcc88" intensity={0.4} distance={2.5} />

      {/* Garage light accents */}
      <pointLight position={[1.3, 0.75, 1.3]} color="#ffcc88" intensity={0.6} distance={3} />
      <pointLight position={[2.8, 0.75, 1.3]} color="#ffcc88" intensity={0.6} distance={3} />

      {/* Balcony underglow */}
      <pointLight position={[4.2, 1.2, 1.3]} color="#ffdd99" intensity={0.3} distance={2.5} />

      {/* Natural Wooden Signboard (Single Pole Style) */}
      <group
        position={[-1.8, 0.25, 2.2]}
        rotation={[0, Math.PI / 14, 0]}
        onClick={(e) => {
          e.stopPropagation();
          setShowResume(true);
        }}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        {/* Main Wooden Board */}
        <mesh position={[0, 0.9, 2.0]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 0.6, 0.08]} />
          <meshStandardMaterial
            color="#c9a875"
            roughness={0.8}
            metalness={0.05}
          />
        </mesh>

        {/* Wooden Board Plank Texture Layers (for depth illusion) */}
        <mesh position={[0, 0.9, 2.05]}>
          <planeGeometry args={[1.38, 0.58]} />
          <meshStandardMaterial
            color="#deb887" // lighter warm wood tone
            roughness={0.9}
            metalness={0.02}
          />
        </mesh>

      {/* Carved Wooden Text */}
      <Text
        position={[0, 0.92, 2.06]}
        rotation={[0, 0, 0]}
        fontSize={0.12}
        color="#3b2b1a"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0}
      >
        Gan’s Residence
      </Text>

      <Text
        position={[0, 0.8, 2.065]}
        rotation={[0, 0, 0]}
        fontSize={0.085}
        color="#e5c285"            // lighter, glowing-gold tone that contrasts wood
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.006}
        outlineColor="#3b2b1a"
      >
        Click Me!
      </Text>

        {/* Single Wooden Pole */}
        <mesh position={[0, 0.45, 1.95]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.8, 16]} />
          <meshStandardMaterial
            color="#a67c52"
            roughness={0.9}
            metalness={0.05}
          />
        </mesh>

        {/* Soft Warm Glow for Visibility */}
        <pointLight position={[0, 1.1, 1.8]} color="#ffe0b3" intensity={0.3} distance={2.5} />
      </group>

      {/* Modern Minimalist Garden Boxes */}
      {[
        [-2.5, 0.15, 1.5],
        [-2.5, 0.15, -1.5],
      ].map((pos, i) => (
        <group key={`plant-${i}`}>
          <mesh position={pos as [number, number, number]} castShadow>
            <boxGeometry args={[0.5, 0.3, 0.5]} />
            <meshStandardMaterial
              color="#4a4a4a"
              roughness={0.8}
            />
          </mesh>
          <mesh position={[pos[0], pos[1] + 0.4, pos[2]]} castShadow>
            <boxGeometry args={[0.15, 0.6, 0.15]} />
            <meshStandardMaterial
              color="#3a5a3a"
              roughness={0.95}
            />
          </mesh>
        </group>
      ))}
    </group>
    
  );
}

// Atmospheric Particles (Snow/Dust)
function AtmosphericParticles() {
  const count = 1500;
  const particlesRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = Math.random() * 20 - 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        positions[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.001;
        positions[i * 3 + 1] -= 0.015;
        positions[i * 3 + 2] += Math.cos(state.clock.elapsedTime + i) * 0.001;
        
        if (positions[i * 3 + 1] < -2) {
          positions[i * 3 + 1] = 18;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Terrain with texture-like appearance
function Terrain() {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (meshRef.current) {
      const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
      const positions = geometry.attributes.position;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const distance = Math.sqrt(x * x + y * y);
        const wave = Math.sin(distance * 0.3) * 0.3;
        positions.setZ(i, wave);
      }
      
      positions.needsUpdate = true;
      geometry.computeVertexNormals();
    }
  }, []);

  return (
    <mesh ref={meshRef} position={[0, -1.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[60, 60, 48, 48]} />
      <meshStandardMaterial
        color="#5a7a4a"
        roughness={0.95}
        metalness={0}
      />
    </mesh>
  );
}

function SceneContent({ scrollProgress, showResume, setShowResume }: 
  { scrollProgress: number; showResume: boolean; setShowResume: (v: boolean) => void }) {
  
  const { camera } = useThree();
  const lightRef = useRef<THREE.DirectionalLight>(null);

  useFrame(() => {
    // Smooth zoom to TV if clicked
    if (showResume) {
      const targetPos = new THREE.Vector3(-1.6, 0.6, 2.7);
      camera.position.lerp(targetPos, 0.05);
      camera.lookAt(-1.6, 0.45, 2.0);
    } else {
      // Default scroll movement
      camera.position.y = 2 + scrollProgress * 3;
      camera.position.z = 8 - scrollProgress * 2;
      camera.lookAt(0, scrollProgress * 2, 0);
    }

    if (lightRef.current) {
      lightRef.current.intensity = showResume ? 0.8 : 1.5 - scrollProgress * 0.5;
    }
  });

  return (
    <>
      <color attach="background" args={['#1a1f2e']} />
      <fog attach="fog" args={['#1a1f2e', 8, 30]} />
      
      <ambientLight intensity={0.4} />
      <directionalLight 
        ref={lightRef}
        position={[10, 15, 5]} 
        intensity={1.5} 
        color="#fff5e6"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight position={[-8, 8, -8]} intensity={0.3} color="#7c9bff" />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffeb99" distance={15} />
      
      <Suspense fallback={null}>
        <House setShowResume={setShowResume} />
        <AtmosphericParticles />
        <Terrain />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      </Suspense>
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 4}
        autoRotate={window.innerWidth > 768}
        autoRotateSpeed={0.4}
      />
    </>
  );
}

export default function CinematicPortfolio() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="bg-[#1a1f2e] text-white overflow-x-hidden relative min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
          <Canvas
            shadows
            camera={{ position: [0, 2, 8], fov: 50 }}
            style={{ width: '100vw', height: '100vh' }}
            dpr={[1, 2]}
          >
          <SceneContent scrollProgress={scrollProgress} showResume={showResume} setShowResume={setShowResume} />
        </Canvas>
        
        {/* Vignette effect */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
          style={{ 
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 70%)',
            opacity: 1 - scrollProgress * 0.5
          }}
        />
        
        {/* Top left branding */}
        <div 
          className="absolute top-8 left-8 z-20 transition-all duration-700"
          style={{ 
            opacity: 1 - scrollProgress * 2,
            transform: `translateY(${scrollProgress * -50}px)`
          }}
        >
          <h1 className="text-3xl md:text-5xl font-bold tracking-wider mb-2" style={{ fontFamily: 'monospace' }}>
            RONGSHEN
          </h1>
          <div className="text-xs text-gray-400 space-y-0.5" style={{ fontFamily: 'monospace' }}>
            <p>// Copyright © 2025</p>
            <p>Gan Rong Shen</p>
            <p>All Rights Reserved.</p>
          </div>
        </div>
        
        {/* Top right manifesto */}
        <div 
          className="absolute top-8 right-8 z-20 text-right max-w-xs transition-all duration-700"
          style={{ 
            opacity: 1 - scrollProgress * 2,
            transform: `translateY(${scrollProgress * -50}px)`
          }}
        >
          <h2 className="text-xs md:text-sm font-bold mb-2 text-gray-400" style={{ fontFamily: 'monospace' }}>
            ////// Manifesto
          </h2>
          <p className="text-[10px] md:text-xs text-gray-400 leading-relaxed" style={{ fontFamily: 'monospace' }}>
            Building the future of immersive web experiences, one pixel at a time...
          </p>
        </div>
      </section>

      {showResume && (
        <div className="absolute inset-0 bg-black/90 text-white overflow-y-auto z-50 p-6 md:p-10">
          <button
            onClick={() => setShowResume(false)}
            className="absolute top-4 right-4 bg-gray-800 px-3 py-2 rounded-full hover:bg-gray-700 text-sm md:text-base transition"
          >
            ✕ Close
          </button>

          <div className="max-w-4xl mx-auto space-y-6 font-mono text-sm md:text-base">
            <h1 className="text-2xl md:text-4xl font-bold">Gan Rong Shen</h1>
            <p className="text-base md:text-lg text-gray-400">Software Developer & QA Tester</p>
            <p>Passionate about software development and quality assurance. Delivered 4 freelance projects in production.</p>

            <a
              href="/Gan_Rong_Shen_Resume.pdf"
              download
              className="inline-block mt-4 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold transition text-sm md:text-base"
            >
              Download Full Resume (PDF)
            </a>

            <h2 className="text-2xl mt-8 font-semibold">Featured Projects</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li><a href="https://amcardscollectibles.com.my" target="_blank" className="text-blue-400 hover:underline">AM Cards Collectibles</a></li>
              <li><a href="https://amccbreaks.com" target="_blank" className="text-blue-400 hover:underline">AMCC Breaks</a></li>
              <li><a href="https://cardconnexion.com.my" target="_blank" className="text-blue-400 hover:underline">Card Connexions</a></li>
              <li><a href="https://tcgsideshop.com" target="_blank" className="text-blue-400 hover:underline">TCG Side Shop</a></li>
            </ul>

            <h2 className="text-2xl mt-6 font-semibold">Experience</h2>
            <p><strong>Software Developer & QA Tester – AVM Cloud</strong> (2024 - Present)</p>
            <p>
              Implemented automated testing (Selenium, JMeter), built internal monitoring tools (AVM Lifeline),
              standardized QA pipelines.
            </p>

            <h2 className="text-2xl mt-6 font-semibold">Certifications</h2>
            <ul className="list-disc ml-6">
              <li>VMware Certified Professional (VCP-DCV)</li>
              <li>ISTQB Certified Tester Foundation Level (CTFL v4.0)</li>
              <li>Iverson Python Programming (Beginner)</li>
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}