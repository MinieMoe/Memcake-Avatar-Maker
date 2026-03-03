import { Canvas } from '@shopify/react-native-skia';
import { StyleSheet, View } from 'react-native';
import { CANVAS_SIZE } from '@/constants/preset';
import { EXPRESSION_PRESETS, HAIRSTYLE_PRESETS } from '@/constants/presets';
import { BodyBase } from './body-base';
import { Hairstyle } from './hairstyle';
import { Expression } from './expression';

export type MemcakePreviewProps = {
  skinTone: string;
  hairColor: string;
  eyeColor: string;
  expressionId: string;
  hairstyleId: string;
};

export function MemcakePreview({
  skinTone,
  hairColor,
  eyeColor,
  expressionId,
  hairstyleId,
}: MemcakePreviewProps) {
  const expressionPreset = EXPRESSION_PRESETS[expressionId];
  const hairstylePreset = HAIRSTYLE_PRESETS[hairstyleId];

  if (!expressionPreset || !hairstylePreset) return null;

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        <BodyBase skinTone={skinTone} />
        <Hairstyle preset={hairstylePreset} hairColor={hairColor} />
        <Expression preset={expressionPreset} hairColor={hairColor} eyeColor={eyeColor} />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
    backgroundColor: 'gray',
  },
  canvas: {
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
