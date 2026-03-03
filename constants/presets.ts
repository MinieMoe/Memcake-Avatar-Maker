export type ExpressionPreset = {
  label: string;
  mask: number;
  eyes: number;
  browMouth: number;
};

export type HairstylePreset = {
  label: string;
  svg: number;
};

export const EXPRESSION_PRESETS: Record<string, ExpressionPreset> = {
  mischevious: {
    label: 'Mischievous',
    mask:      require('@/assets/presets/expressions/mischevious/mask.svg'),
    eyes:      require('@/assets/presets/expressions/mischevious/eyes.svg'),
    browMouth: require('@/assets/presets/expressions/mischevious/brow_mouth.svg'),
  },
  angry: {
    label: 'Angry',
    mask:      require('@/assets/presets/expressions/angry/mask.svg'),
    eyes:      require('@/assets/presets/expressions/angry/eyes.svg'),
    browMouth: require('@/assets/presets/expressions/angry/brow_mouth.svg'),
  },
};

export const HAIRSTYLE_PRESETS: Record<string, HairstylePreset> = {
  default:     { label: 'Default',   svg: require('@/assets/presets/hairstyle/female_default_long_hair.svg') },
  femaleShort: { label: 'Short Hair', svg: require('@/assets/presets/hairstyle/female_short_hair.svg') },
};
