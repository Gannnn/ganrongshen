'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Stars, useTexture } from '@react-three/drei';
import { useRef, useEffect, useMemo, Suspense, useState } from 'react';
import * as THREE from 'three';

// Modern Minimalist House
function House() {
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

      {/* Second Floor - Offset */}
      <mesh position={[1.4, 1.9, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[5, 4, 1.5]} />
        <meshStandardMaterial
          color="#e8e8e8"
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
          count={count}
          array={positions}
          itemSize={3}
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

function SceneContent({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();
  const lightRef = useRef<THREE.DirectionalLight>(null);

  useFrame(() => {
    // Camera movement based on scroll
    camera.position.y = 2 + scrollProgress * 3;
    camera.position.z = 8 - scrollProgress * 2;
    camera.lookAt(0, scrollProgress * 2, 0);

    // Light intensity based on scroll
    if (lightRef.current) {
      lightRef.current.intensity = 1.5 - scrollProgress * 0.5;
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
        <House />
        <AtmosphericParticles />
        <Terrain />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      </Suspense>
      
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 4}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </>
  );
}

export default function CinematicPortfolio() {
  const [scrollProgress, setScrollProgress] = useState(0);

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
    <main className="bg-[#1a1f2e] text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <Canvas
          shadows
          camera={{ position: [0, 2, 8], fov: 50 }}
          style={{ width: '100vw', height: '100vh' }}
          dpr={[1, 2]}
        >
          <SceneContent scrollProgress={scrollProgress} />
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
          <h1 className="text-5xl font-bold tracking-wider mb-2" style={{ fontFamily: 'monospace' }}>
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
          <h2 className="text-sm font-bold mb-2 text-gray-400" style={{ fontFamily: 'monospace' }}>
            ////// Manifesto
          </h2>
          <p className="text-xs text-gray-400 leading-relaxed" style={{ fontFamily: 'monospace' }}>
            Building the future of immersive web experiences, one pixel at a time. Where creativity meets technology.
          </p>
        </div>
        
        {/* Bottom left sound control */}
        <div 
          className="absolute bottom-8 left-8 z-20 flex items-center gap-2 text-sm transition-opacity duration-700" 
          style={{ 
            fontFamily: 'monospace',
            opacity: 1 - scrollProgress * 2
          }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 3.75a.75.75 0 00-1.264-.546L4.703 7H3.167a.75.75 0 00-.7 1.035l1.083 2.708a.75.75 0 001.4.034l.758-1.893 2.124 2.124a.75.75 0 001.06-1.06L6.768 7.823l2.468-2.468A.75.75 0 0010 4.81V3.75z" />
          </svg>
          <span>Sound: On</span>
        </div>
        
        {/* Bottom center scroll indicator */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10 transition-opacity duration-700"
          style={{ opacity: 1 - scrollProgress * 3 }}
        >
          <span className="text-sm text-gray-400" style={{ fontFamily: 'monospace' }}>Scroll to explore</span>
          <svg 
            className="w-6 h-6 text-white" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section 
        className="min-h-screen relative flex items-center justify-center px-8 py-24 transition-all duration-1000"
        style={{ 
          backgroundColor: `rgba(26, 32, 44, ${0.8 + scrollProgress * 0.2})`,
          transform: `translateY(${-scrollProgress * 30}px)`
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div style={{ 
              opacity: Math.max(0, Math.min(1, (scrollProgress - 0.1) * 3)),
              transform: `translateX(${Math.max(-50, -50 + scrollProgress * 150)}px)`
            }}>
              <h2 className="text-6xl font-bold mb-6 text-white">
                Crafting Digital Homes
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed" style={{ fontFamily: 'monospace' }}>
                Specialized in creating cinematic 3D web experiences that feel like home. 
                Every project is a carefully crafted sanctuary of immersive storytelling and 
                cutting-edge technology.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-gray-800/50 border border-gray-700 rounded-lg backdrop-blur-sm hover:border-gray-500 transition-all">
                  <h3 className="text-4xl font-bold text-white mb-2">5+</h3>
                  <p className="text-gray-400 text-sm" style={{ fontFamily: 'monospace' }}>Years Experience</p>
                </div>
                <div className="p-6 bg-gray-800/50 border border-gray-700 rounded-lg backdrop-blur-sm hover:border-gray-500 transition-all">
                  <h3 className="text-4xl font-bold text-white mb-2">50+</h3>
                  <p className="text-gray-400 text-sm" style={{ fontFamily: 'monospace' }}>Projects Delivered</p>
                </div>
              </div>
            </div>
            <div 
              className="relative"
              style={{ 
                opacity: Math.max(0, Math.min(1, (scrollProgress - 0.15) * 3)),
                transform: `translateX(${Math.min(50, 50 - scrollProgress * 150)}px)`
              }}
            >
              <div className="aspect-square bg-gray-800/30 border border-gray-700 rounded-2xl backdrop-blur-sm flex items-center justify-center hover:border-gray-500 transition-all">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center text-6xl transform hover:scale-110 transition-transform">
                    🏠
                  </div>
                  <p className="text-2xl font-semibold text-gray-300" style={{ fontFamily: 'monospace' }}>
                    Home Sweet Code
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        className="min-h-screen relative px-8 py-24"
        style={{ 
          backgroundColor: `rgba(45, 55, 72, ${0.8 + scrollProgress * 0.2})`,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 
            className="text-6xl font-bold text-center mb-16 text-white transition-all duration-1000"
            style={{ 
              opacity: Math.max(0, Math.min(1, (scrollProgress - 0.3) * 3)),
              transform: `translateY(${Math.max(-30, -30 + (scrollProgress - 0.3) * 100)}px)`
            }}
          >
            Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🏗️', title: '3D Architecture', desc: 'Stunning architectural visualizations' },
              { icon: '⚡', title: 'Performance', desc: 'Optimized for smooth 60fps rendering' },
              { icon: '🌐', title: 'Web3 Integration', desc: 'Blockchain-ready applications' },
              { icon: '📱', title: 'Responsive Design', desc: 'Perfect across all devices' },
              { icon: '🎨', title: 'Art Direction', desc: 'Cohesive visual storytelling' },
              { icon: '🚀', title: 'Innovation', desc: 'Cutting-edge technology stack' },
            ].map((service, i) => (
              <div 
                key={i}
                className="group p-8 bg-gray-800/30 border border-gray-700 rounded-xl backdrop-blur-sm hover:border-gray-500 transition-all hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(255,235,153,0.2)]"
                style={{ 
                  opacity: Math.max(0, Math.min(1, (scrollProgress - 0.35 - i * 0.05) * 3)),
                  transform: `translateY(${Math.max(-30, -30 + (scrollProgress - 0.35 - i * 0.05) * 100)}px)`
                }}
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-white" style={{ fontFamily: 'monospace' }}>
                  {service.title}
                </h3>
                <p className="text-gray-400" style={{ fontFamily: 'monospace' }}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="min-h-screen relative flex items-center justify-center px-8"
        style={{ 
          backgroundColor: `rgba(26, 32, 44, ${0.9 + scrollProgress * 0.1})`,
        }}
      >
        <div 
          className="text-center max-w-4xl mx-auto transition-all duration-1000"
          style={{ 
            opacity: Math.max(0, Math.min(1, (scrollProgress - 0.6) * 2)),
            transform: `scale(${Math.min(1, 0.8 + (scrollProgress - 0.6) * 0.5)})`
          }}
        >
          <h2 className="text-7xl md:text-8xl font-bold mb-8 text-white">
            Let's Build Your Home
          </h2>
          <p className="text-2xl text-gray-400 mb-12" style={{ fontFamily: 'monospace' }}>
            Ready to create something extraordinary together?
          </p>
          <button className="group relative px-12 py-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 rounded-full font-bold text-xl transition-all hover:scale-110 hover:shadow-[0_0_40px_rgba(255,235,153,0.6)]">
            <span className="relative z-10" style={{ fontFamily: 'monospace' }}>Get In Touch</span>
          </button>
        </div>
      </section>
    </main>
  );
}