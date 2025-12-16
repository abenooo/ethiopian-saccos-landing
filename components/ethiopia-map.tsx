"use client"

import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Html } from "@react-three/drei"
import { useRef, useState } from "react"
import * as THREE from "three"
import { saccoData } from "@/lib/sacco-data"

function RegionDot({
  position,
  region,
  saccos,
  members,
  capital,
  onClick,
}: {
  position: [number, number, number]
  region: string
  saccos: number
  members: string
  capital: string
  onClick: () => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  const baseSize = 0.03 + Math.log(saccos + 1) * 0.008

  useFrame((state) => {
    if (meshRef.current && glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.15 + 1
      meshRef.current.scale.setScalar(hovered ? 1.5 : pulse)
      glowRef.current.scale.setScalar(hovered ? 2.5 : 2 + pulse * 0.3)

      const mat = meshRef.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = hovered ? 1.5 : 0.8 + pulse * 0.2
    }
  })

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <sphereGeometry args={[baseSize, 32, 32]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#f59e0b"
          emissiveIntensity={0.8}
          metalness={0.3}
          roughness={0.4}
          toneMapped={false}
        />
      </mesh>

      <mesh ref={glowRef}>
        <sphereGeometry args={[baseSize * 2, 16, 16]} />
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={hovered ? 0.3 : 0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {[1.8, 2.5].map((scale, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[baseSize * scale, baseSize * (scale + 0.2), 32]} />
          <meshBasicMaterial
            color="#fbbf24"
            transparent
            opacity={hovered ? 0.25 - i * 0.08 : 0.12 - i * 0.04}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      {hovered && (
        <Html position={[0, baseSize + 0.2, 0]} center distanceFactor={8}>
          <div className="pointer-events-none bg-card/95 backdrop-blur-xl border border-primary/30 rounded-xl px-5 py-4 shadow-2xl min-w-[260px] animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-bold text-foreground text-lg mb-3 text-balance">{region}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-6">
                <span className="text-muted-foreground">SACCOs</span>
                <span className="text-primary font-bold">{saccos.toLocaleString()}</span>
              </div>
              <div className="flex justify-between gap-6">
                <span className="text-muted-foreground">Members</span>
                <span className="text-foreground font-semibold">{members}</span>
              </div>
              <div className="flex justify-between gap-6">
                <span className="text-muted-foreground">Capital</span>
                <span className="text-accent font-semibold">{capital}</span>
              </div>
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}

function MapPlane() {
  const texture = useLoader(THREE.TextureLoader, "/images/ethiopia-map.png")

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[8.2, 8.2]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.3} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial map={texture} transparent opacity={0.95} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
    </>
  )
}

function RegionDots() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  return (
    <>
      {saccoData.map((region) => (
        <RegionDot
          key={region.name}
          position={region.position}
          region={region.name}
          saccos={region.saccos}
          members={region.members}
          capital={region.capital}
          onClick={() => setSelectedRegion(region.name)}
        />
      ))}
    </>
  )
}

export function EthiopiaMap() {
  return (
    <div className="w-full h-screen bg-background">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 6, 6]} fov={50} />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={4}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2.2}
          rotateSpeed={0.5}
        />

        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#fbbf24" />
        <pointLight position={[-10, 10, -10]} intensity={1} color="#60a5fa" />
        <directionalLight position={[0, 10, 5]} intensity={1} />
        <hemisphereLight intensity={0.3} color="#fbbf24" groundColor="#1e293b" />

        <MapPlane />
        <RegionDots />
      </Canvas>
    </div>
  )
}
