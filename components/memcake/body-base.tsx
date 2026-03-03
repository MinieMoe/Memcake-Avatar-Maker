import { BlendMode, Group, ImageSVG, Skia, useSVG } from '@shopify/react-native-skia';
import { useMemo } from 'react';
import { CANVAS_SIZE } from '@/constants/preset';

type BodyBaseProps = {
  skinTone: string;
};

export function BodyBase({ skinTone }: BodyBaseProps) {
  const body = useSVG(require('@/assets/presets/body/body.svg'));

  const paint = useMemo(() => {
    const p = Skia.Paint();
    p.setColorFilter(
      Skia.ColorFilter.MakeBlend(
        Skia.Color(skinTone),
        BlendMode.SrcIn
      )
    );
    return p;
  }, [skinTone]);

  if (!body) return null;

  return (
    <Group layer={paint}>
      <ImageSVG svg={body} x={0} y={0} width={CANVAS_SIZE} height={CANVAS_SIZE} />
    </Group>
  );
}
