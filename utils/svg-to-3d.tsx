import { buildSilhouetteSvg } from './build-silhouette-svg';
import { extrudeSilhoutteSvg } from './extrude-silhoutte-svg';

// bodySvgText and hairSvgText are already-extracted SVG path `d` strings
export async function svgTo3d(bodySvgText: string, hairSvgText: string) {
  try {
    const silhouetteSvg = buildSilhouetteSvg(bodySvgText, hairSvgText);
    const extrudedSvg = extrudeSilhoutteSvg(silhouetteSvg);
    return extrudedSvg;
  } catch (error) {
    console.error('svgTo3d: failed to convert SVG to 3D', error);
    return null;
  }
}