import * as THREE from 'three'

export function Cpu(props: JSX.IntrinsicElements['group']) {
  return (
    <group {...props}>
      <mesh>
        <boxGeometry args={[1, 0.1, 1]} />
        <meshStandardMaterial color="silver" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[0.8, 0.05, 0.8]} />
        <meshStandardMaterial color="#2d2d2d" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  )
}

export function Gpu(props: JSX.IntrinsicElements['group']) {
  return (
    <group {...props}>
      {/* Main board */}
      <mesh>
        <boxGeometry args={[1.8, 0.2, 3]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Fans */}
      <mesh position={[0, 0.11, -0.7]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>
      <mesh position={[0, 0.11, 0.7]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>
    </group>
  )
}

export function Ram(props: JSX.IntrinsicElements['group']) {
  return (
    <group {...props}>
      <mesh>
        <boxGeometry args={[0.2, 0.8, 2.5]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Gold contacts */}
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[0.21, 0.1, 2.4]} />
        <meshStandardMaterial color="gold" metalness={1} roughness={0.2} />
      </mesh>
    </group>
  )
} 