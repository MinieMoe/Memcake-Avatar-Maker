import { svgTo3d } from '@/utils/svg-to-3d';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import { useRef } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import * as THREE from 'three';

export type Memcake3DViewProps = {
  bodySvgText: string;
  hairSvgText: string;
  /** base64 PNG from Skia snapshot — used as face texture (wired up later) */
  snapshotBase64?: string;
  style?: StyleProp<ViewStyle>;
};

export function Memcake3DView({ bodySvgText, hairSvgText, style }: Memcake3DViewProps) {
  const rafId = useRef<number>(0);

  async function onContextCreate(gl: ExpoWebGLRenderingContext) {
    const w = gl.drawingBufferWidth;
    const h = gl.drawingBufferHeight;

    // ── scene + camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(100, w / h, 0.1, 1000);

    // ── renderer ──────────────────────────────────────────────────────────────
    const renderer = new Renderer({ gl });
    renderer.setSize(w, h);
    renderer.setClearColor(0x1a1a2e);

    // ── lighting ──────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const sun = new THREE.DirectionalLight(0xffffff, 1.4);
    sun.position.set(4, 6, 5);
    scene.add(sun);

    // ── extruded silhouette ──────────────────────────────────────────────────────
    const mesh = await svgTo3d(bodySvgText, hairSvgText);    
    if (!mesh) {
      throw new Error('svgTo3d: failed to convert SVG to 3D');
    }
    scene.add(mesh);

    const boundingBox = new THREE.Box3().setFromObject(mesh);
    const size = boundingBox.getSize(new THREE.Vector3());
    const center = boundingBox.getCenter(new THREE.Vector3());
    
    mesh.position.sub(center);
    const scale = 3 / Math.max(size.x, size.y, size.z);
    mesh.scale.setScalar(scale);

    // const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // const mesh = new THREE.Mesh( geometry, material );
    // scene.add( mesh );

    camera.position.z = 5;

    // ── render loop ───────────────────────────────────────────────────────────
    function animate( time: number ) {
      mesh!.rotation.y = time / 2000;
      renderer.render( scene, camera );
      gl.endFrameEXP();
    }
    renderer.setAnimationLoop( animate );
  }

  return (
    <GLView
      style={[{ width: '100%', height: '100%' }, style]}
      onContextCreate={async (gl: ExpoWebGLRenderingContext) => await onContextCreate(gl)}
    />
  );
}
