import { Object3D } from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

declare module '@react-three/fiber' {
  interface ThreeElements {
    group: Object3D
    mesh: Object3D
    spotLight: Object3D
    pointLight: Object3D
    directionalLight: Object3D
  }
}

declare module 'three-stdlib' {
  export interface GLTF {
    nodes: { [key: string]: Object3D }
    materials: { [key: string]: any }
    animations: any[]
    scene: Object3D
  }
}

export interface GLTFResult extends GLTF {
  nodes: {
    [key: string]: Object3D
  }
  materials: {
    [key: string]: any
  }
} 