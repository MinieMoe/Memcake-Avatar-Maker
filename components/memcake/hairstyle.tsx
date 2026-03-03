import { BlendMode, Group, ImageSVG, Skia, useSVG } from '@shopify/react-native-skia';
import { useMemo } from 'react';
import { CANVAS_SIZE } from '@/constants/preset';
import { HairstylePreset } from '@/constants/presets';

type HairstyleProps = {
  preset: HairstylePreset;
  hairColor: string;
};

export function Hairstyle({ preset, hairColor }: HairstyleProps) {
  const hair = useSVG(preset.svg);

  const paint = useMemo(() => {
    const p = Skia.Paint();
    p.setColorFilter(
      Skia.ColorFilter.MakeBlend(
        Skia.Color(hairColor),
        BlendMode.SrcIn
      )
    );
    return p;
  }, [hairColor]);

  if (!hair) return null;

  return (
    <Group layer={paint}>
      <ImageSVG svg={hair} x={0} y={0} width={CANVAS_SIZE} height={CANVAS_SIZE} />
    </Group>
  );
}
