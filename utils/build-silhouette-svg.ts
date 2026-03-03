import { Skia, PathOp } from '@shopify/react-native-skia';

// pure: body + hair SVG text → Skia path union → single SVG string for SVGLoader
export function buildSilhouetteSvg(
  bodySvgText: string,
  hairSvgText: string,
): string {

  const bodyPath = Skia.Path.MakeFromSVGString(bodySvgText);
  if (!bodyPath) throw new Error('buildSilhouetteSvg: failed to parse body SVG path');

  const hairPath = Skia.Path.MakeFromSVGString(hairSvgText);
  if (!hairPath) throw new Error('buildSilhouetteSvg: failed to parse hair SVG path');

  const silhouettePath = Skia.Path.MakeFromOp(bodyPath, hairPath, PathOp.Union);
  if (!silhouettePath) throw new Error('buildSilhouetteSvg: path union operation failed');
  
  const silhouetteSvg = silhouettePath.toSVGString();

  return silhouetteSvg;
}
