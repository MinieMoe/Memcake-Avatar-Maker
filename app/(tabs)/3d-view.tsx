import { Memcake3DView } from '@/components/memcake/memcake-3d-view';
import { HAIRSTYLE_PRESETS } from '@/constants/presets';
import { extractSVGPaths } from '@/utils/extract-svg-paths';
import { Asset } from 'expo-asset';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

const BODY_MODULE = require('@/assets/presets/body/body.svg');

type SvgPaths = { body: string; hair: string };

export default function Memcake3DViewScreen() {
  const { hairstyleId } = useLocalSearchParams<{ hairstyleId?: string }>();
  const [svgPaths, setSvgPaths] = useState<SvgPaths | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPaths() {
      try {
        setError(null);
        setSvgPaths(null);

        const hairstyleModule =
          HAIRSTYLE_PRESETS[hairstyleId ?? 'default']?.svg ??
          HAIRSTYLE_PRESETS.default.svg;

        const [bodyAsset, hairAsset] = await Promise.all([
          Asset.fromModule(BODY_MODULE).downloadAsync(),
          Asset.fromModule(hairstyleModule).downloadAsync(),
        ]);

        const [bodyPaths, hairPaths] = await Promise.all([
          extractSVGPaths(bodyAsset.localUri!),
          extractSVGPaths(hairAsset.localUri!),
        ]);

        setSvgPaths({
          body: bodyPaths ?? '',
          hair: hairPaths ?? '',
        });
      } catch (e) {
        setError(String(e));
        console.error('3d-view: failed to load SVG paths', e);
      }
    }

    loadPaths();
  }, [hairstyleId]);

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a1a2e', padding: 24 }}>
        <Text style={{ color: '#ff6b9d', textAlign: 'center' }}>Failed to load SVG data:{'\n'}{error}</Text>
      </View>
    );
  }

  if (!svgPaths) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a1a2e' }}>
        <ActivityIndicator color="#ff6b9d" size="large" />
      </View>
    );
  }

  return <Memcake3DView bodySvgText={svgPaths.body} hairSvgText={svgPaths.hair} />;
}
