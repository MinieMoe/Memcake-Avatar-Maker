import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

// pure: silhoutte SVG string → THREE.ExtrudeGeometry

const fillMaterial = new THREE.MeshBasicMaterial({ color: "#F3FBFB" });
const stokeMaterial = new THREE.LineBasicMaterial({
  color: "#00A5E6",
});

export function extrudeSilhoutteSvg(pathData: string) {
    const loader = new SVGLoader();
    // Skia's toSVGString() returns a raw `d` value, so wrap it in a full SVG document for SVGLoader
    const svgDoc = `
        <svg xmlns="http://www.w3.org/2000/svg" width="228.96001" height="228.96001" viewBox="0 0 228.96001 228.96001">
            <path d="${pathData}"/>
        </svg>`;
    const svgData = loader.parse(svgDoc);
    const svgGroup = new THREE.Group();
    
    svgData.paths.forEach((path) => {
        const shapes = SVGLoader.createShapes(path);
    
        shapes.forEach((shape) => {
            const meshGeometry = new THREE.ExtrudeGeometry(shape, {
                depth: 20,
                bevelEnabled: false,
            });
            meshGeometry.center();
            const mesh = new THREE.Mesh(meshGeometry, fillMaterial);
            mesh.scale.y *= -1;

            // lines showing the paths of hairs and body
            const linesGeometry = new THREE.EdgesGeometry(meshGeometry);
            const lines = new THREE.LineSegments(linesGeometry, stokeMaterial);
            lines.scale.y *= -1;

            svgGroup.add(mesh, lines);
        });
    });

    return svgGroup;
}