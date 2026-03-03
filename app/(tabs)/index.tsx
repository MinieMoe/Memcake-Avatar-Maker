import { MemcakePreview } from '@/components/memcake/memcake-preview';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { EXPRESSION_PRESETS, HAIRSTYLE_PRESETS } from '@/constants/presets';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

const SKIN_TONES = [
  { label: 'Original', swatch: '#F8D3B6' },
  { label: 'Warm',     swatch: '#D4A574' },
  { label: 'Tan',      swatch: '#C68642' },
  { label: 'Dark',     swatch: '#4A2900' },
  { label: 'Fantasy',  swatch: '#7B9EDB' },
];

const HAIR_COLORS = [
  { label: 'Black',  swatch: '#1A1A1A' },
  { label: 'Brown',  swatch: '#3B1F0A' },
  { label: 'Blonde', swatch: '#E8C96D' },
  { label: 'Auburn', swatch: '#7B2D00' },
  { label: 'Red',    swatch: '#C0392B' },
  { label: 'Pink',   swatch: '#F48FB1' },
  { label: 'Blue',   swatch: '#5C6BC0' },
  { label: 'White',  swatch: '#F5F5F5' },
];

const EYE_COLORS = [
  { label: 'Brown',  swatch: '#6B3A2A' },
  { label: 'Hazel',  swatch: '#8B6914' },
  { label: 'Green',  swatch: '#4A7C59' },
  { label: 'Blue',   swatch: '#4A90D9' },
  { label: 'Grey',   swatch: '#7A8B99' },
  { label: 'Violet', swatch: '#7B5EA7' },
];

const EXPRESSION_OPTIONS = Object.entries(EXPRESSION_PRESETS).map(([id, preset]) => ({
  id,
  label: preset.label,
}));

const HAIRSTYLE_OPTIONS = Object.entries(HAIRSTYLE_PRESETS).map(([id, preset]) => ({
  id,
  label: preset.label,
}));

export default function CharacterBuilderScreen() {
  const router = useRouter();
  const [selectedTone, setSelectedTone]           = useState(0);
  const [selectedHair, setSelectedHair]           = useState(0);
  const [selectedEye, setSelectedEye]             = useState(0);
  const [selectedExpression, setSelectedExpression] = useState(EXPRESSION_OPTIONS[0].id);
  const [selectedHairstyle, setSelectedHairstyle]   = useState(HAIRSTYLE_OPTIONS[0].id);

  const skinTone  = SKIN_TONES[selectedTone].swatch;
  const hairColor = HAIR_COLORS[selectedHair].swatch;
  const eyeColor  = EYE_COLORS[selectedEye].swatch;

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.header}>
          <ThemedText type="title">Character Builder</ThemedText>
          <ThemedText style={styles.subtitle}>Create and customize your character</ThemedText>
        </ThemedView>

        <MemcakePreview
          skinTone={skinTone}
          hairColor={hairColor}
          eyeColor={eyeColor}
          expressionId={selectedExpression}
          hairstyleId={selectedHairstyle}
        />

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Expression</ThemedText>
          <View style={styles.pillRow}>
            {EXPRESSION_OPTIONS.map((opt) => (
              <Pressable
                key={opt.id}
                onPress={() => setSelectedExpression(opt.id)}
                style={[
                  styles.pill,
                  selectedExpression === opt.id && styles.pillSelected,
                ]}
              >
                <ThemedText style={[
                  styles.pillLabel,
                  selectedExpression === opt.id && styles.pillLabelSelected,
                ]}>
                  {opt.label}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Hairstyle</ThemedText>
          <View style={styles.pillRow}>
            {HAIRSTYLE_OPTIONS.map((opt) => (
              <Pressable
                key={opt.id}
                onPress={() => setSelectedHairstyle(opt.id)}
                style={[
                  styles.pill,
                  selectedHairstyle === opt.id && styles.pillSelected,
                ]}
              >
                <ThemedText style={[
                  styles.pillLabel,
                  selectedHairstyle === opt.id && styles.pillLabelSelected,
                ]}>
                  {opt.label}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Skin Tone</ThemedText>
          <View style={styles.swatchRow}>
            {SKIN_TONES.map((tone, index) => (
              <Pressable
                key={tone.label}
                onPress={() => setSelectedTone(index)}
                style={[
                  styles.swatch,
                  { backgroundColor: tone.swatch },
                  selectedTone === index && styles.swatchSelected,
                ]}
              />
            ))}
          </View>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Hair Color</ThemedText>
          <View style={styles.swatchRow}>
            {HAIR_COLORS.map((color, index) => (
              <Pressable
                key={color.label}
                onPress={() => setSelectedHair(index)}
                style={[
                  styles.swatch,
                  { backgroundColor: color.swatch },
                  selectedHair === index && styles.swatchSelected,
                ]}
              />
            ))}
          </View>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Eye Color</ThemedText>
          <View style={styles.swatchRow}>
            {EYE_COLORS.map((color, index) => (
              <Pressable
                key={color.label}
                onPress={() => setSelectedEye(index)}
                style={[
                  styles.swatch,
                  { backgroundColor: color.swatch },
                  selectedEye === index && styles.swatchSelected,
                ]}
              />
            ))}
          </View>
        </ThemedView>

        <ThemedView style={styles.section}>
          <Pressable
            style={styles.downloadButton}
            onPress={() =>
              router.navigate({
                pathname: '/(tabs)/3d-view',
                params: { hairstyleId: selectedHairstyle },
              })
            }
          >
            <ThemedText style={styles.downloadButtonText}>Finish!!!</ThemedText>
          </Pressable>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
    gap: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
  subtitle: {
    marginTop: 6,
    opacity: 0.6,
    fontSize: 14,
  },
  section: {
    width: '100%',
  },
  swatchRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  swatch: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2.5,
    borderColor: 'transparent',
  },
  swatchSelected: {
    borderColor: '#333',
    transform: [{ scale: 1.15 }],
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#ccc',
  },
  pillSelected: {
    borderColor: '#333',
    backgroundColor: '#333',
  },
  pillLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  pillLabelSelected: {
    color: '#fff',
  },
  downloadButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  downloadButtonText: {
    fontSize: 13,
    fontWeight: '500',
  },
});
