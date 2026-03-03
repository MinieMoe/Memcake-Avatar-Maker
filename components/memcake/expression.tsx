import { BlendMode, Group, ImageSVG, useSVG, Skia } from '@shopify/react-native-skia';
import { CANVAS_SIZE } from '@/constants/preset';
import { ExpressionPreset } from '@/constants/presets';
import { useMemo } from 'react';

type ExpressionProps = {
  preset: ExpressionPreset;
  hairColor: string;
  eyeColor: string;
};

export function Expression({ preset, hairColor, eyeColor }: ExpressionProps) {
  const mask = useSVG(preset.mask);
  const eyes = useSVG(preset.eyes);
  const browMouth = useSVG(preset.browMouth);

  const browMouthPaint = useMemo(() => {
    const p = Skia.Paint();
    p.setColorFilter(
      Skia.ColorFilter.MakeBlend(Skia.Color(hairColor), BlendMode.SrcIn)
    );
    return p;
  }, [hairColor]);

  const eyePaint = useMemo(() => {
    const p = Skia.Paint();
    p.setColorFilter(
      Skia.ColorFilter.MakeBlend(Skia.Color(eyeColor), BlendMode.SrcIn)
    );
    return p;
  }, [eyeColor]);

  if (!mask || !eyes || !browMouth) return null;

  return (
    <Group>
      <ImageSVG svg={mask} x={0} y={0} width={CANVAS_SIZE} height={CANVAS_SIZE} />
      <Group layer={eyePaint}>
        <ImageSVG svg={eyes} x={0} y={0} width={CANVAS_SIZE} height={CANVAS_SIZE} />
      </Group>
      <Group layer={browMouthPaint}>
        <ImageSVG svg={browMouth} x={0} y={0} width={CANVAS_SIZE} height={CANVAS_SIZE} />
      </Group>
    </Group>
  );
}
