export type Biome = {
  color: {
    r: number;
    g: number;
    b: number;
  };
  threshold: number;
};

export const compareBiomes = (a: Biome, b: Biome): number => {
  if (a.threshold === b.threshold) {
    return 0;
  }
  return a.threshold > b.threshold ? 1 : -1;
};

export default (biomes: Biome[], zValue: number): Biome => {
  const value = biomes.sort(compareBiomes).find((biome) => {
    return biome.threshold >= zValue;
  });
  if (!value) {
    console.log(zValue, biomes);
  }
  return value;
};
