import SimplexNoise from 'simplex-noise';
import { GameSettings } from './SettingsGUI';

export default ({
  noiseScale,
  noiseOctaves,
  noiseLacunarity,
  octavesPersistence,
}: GameSettings): ((x: number, y: number) => number) => {
  const simplex = new SimplexNoise(Date.now().toString());

  return (x: number, y: number) => {
    let frequency = 1;
    let amplitude = 1;
    let totalNoise = 0;
    let totalAmplitude = 0;
    for (let i = 0; i < noiseOctaves; i++) {
      totalNoise +=
        ((simplex.noise2D(
          (x / noiseScale) * frequency,
          (y / noiseScale) * frequency,
        ) +
          1) /
          2) *
        amplitude;
      totalAmplitude += amplitude;
      amplitude *= octavesPersistence;
      frequency *= noiseLacunarity;
    }
    return totalNoise / totalAmplitude;
  };
};
