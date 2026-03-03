import { File } from 'expo-file-system';

/**
 * read the svg file and extract path 'd' attribute strings
 */

async function readFile(svgPath: string): Promise<string> {
  const file = new File(svgPath);
  return file.text();
}

export async function extractSVGPaths(svgPath: string): Promise<string> {
  try {
    const svgText = await readFile(svgPath);

    const matches = [...svgText.matchAll(/\bd="([^"]*)"/g)];
    const pathStrings = matches.map(m => m[1]);
    
    if (pathStrings.length === 0) {
      throw new Error('extractSVGPaths: no paths found in SVG file');
    }

    return pathStrings[0];
    
  } catch (error) {
    console.error('extractSVGPaths: failed to extract SVG paths', error);
    return "";
  }
}