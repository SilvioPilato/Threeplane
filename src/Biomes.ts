export type Biome = {
  type: BiomeType;
  color: {
    r: number;
    g: number;
    b: number;
  };
  threshold: number;
};
export enum BiomeType {
  WATER,
  SHORE,
  GRASS,
  MOUNTAIN,
  SNOW,
}

export const compareBiomes = (a: Biome, b: Biome): number => {
  if (a.threshold === b.threshold) {
    return 0;
  }
  return a.threshold > b.threshold ? 1 : -1;
};

export default (biomes: Biome[], zValue: number): Biome => {
  return biomes.sort(compareBiomes).find((biome) => {
    return biome.threshold >= zValue;
  });
};
