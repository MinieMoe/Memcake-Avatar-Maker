import type { RefObject } from 'react';
import type { CanvasRef } from '@shopify/react-native-skia';

// pure: Skia canvasRef → base64 PNG string
export function captureSnapshot(canvasRef: RefObject<CanvasRef | null>): string {
  throw new Error('not implemented');
}
