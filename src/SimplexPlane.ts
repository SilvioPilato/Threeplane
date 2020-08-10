import { BufferGeometry, BufferAttribute } from 'three';
import SimplexNoise from 'simplex-noise';
import { GameSettings } from './SettingsGUI';
import getByZValue, { Biome } from './Biomes';
export default (
  gameSettings: GameSettings,
  biomes: Biome[],
): BufferGeometry => {
  const {
    gridXSize,
    gridYSize,
    gridCellSize,
    noiseLacunarity,
    noiseOctaves,
    noiseScale,
    octavesPersistence,
    maxHeight,
  } = gameSettings;
  const geometry = new BufferGeometry();
  const simplex = new SimplexNoise(Date.now().toString());
  const vertices: number[] = [];
  const colors: number[] = [];
  const pickColor = (zValue: number) => {
    const biome = getByZValue(biomes, zValue / maxHeight);
    return [biome.color.r, biome.color.g, biome.color.b];
  };
  const getZValue = (x: number, y: number) => {
    let frequency = 1;
    let amplitude = 1;
    let totalNoise = 0;
    let totalAmplitude = 0;
    for (let i = 0; i < noiseOctaves; i++) {
      totalNoise +=
        simplex.noise2D(
          (x / noiseScale) * frequency,
          (y / noiseScale) * frequency,
        ) * amplitude;
      totalAmplitude += amplitude;
      amplitude *= octavesPersistence;
      frequency *= noiseLacunarity;
    }

    return (totalNoise / totalAmplitude) * maxHeight;
  };
  let row = 0;
  let column = 0;
  let lastZvalue = 0;
  const lastColors = [];
  for (let faceIndex = 0; faceIndex <= gridXSize * gridYSize - 1; faceIndex++) {
    if (faceIndex % gridXSize === 0 && faceIndex !== 0) {
      row++;
      column = 0;
    }
    const triangleA = [];
    lastZvalue = getZValue(column, row);
    vertices.push(column * gridCellSize);
    vertices.push(row * gridCellSize);
    vertices.push(lastZvalue);
    triangleA.push(lastZvalue);

    lastZvalue = getZValue(column + 1, row);
    vertices.push((column + 1) * gridCellSize);
    vertices.push(row * gridCellSize);
    vertices.push(lastZvalue);
    triangleA.push(lastZvalue);

    lastZvalue = getZValue(column, row + 1);
    vertices.push(column * gridCellSize);
    vertices.push((row + 1) * gridCellSize);
    vertices.push(lastZvalue);
    triangleA.push(lastZvalue);

    const triangleB = [];
    lastZvalue = getZValue(column + 1, row);
    vertices.push((column + 1) * gridCellSize);
    vertices.push(row * gridCellSize);
    vertices.push(lastZvalue);
    triangleB.push(lastZvalue);

    lastZvalue = getZValue(column + 1, row + 1);
    vertices.push((column + 1) * gridCellSize);
    vertices.push((row + 1) * gridCellSize);
    vertices.push(lastZvalue);
    triangleB.push(lastZvalue);

    lastZvalue = getZValue(column, row + 1);
    vertices.push(column * gridCellSize);
    vertices.push((row + 1) * gridCellSize);
    vertices.push(lastZvalue);
    triangleB.push(lastZvalue);

    const sortedTriangleA: number[] = triangleA.sort();
    const colorA = pickColor(sortedTriangleA[2]);
    for (let i = 0; i < 3; i++) {
      colors.push(colorA[0]);
      colors.push(colorA[1]);
      colors.push(colorA[2]);
    }

    const sortedTriangleB: number[] = triangleB.sort();
    const colorB = pickColor(sortedTriangleB[2]);
    for (let i = 0; i < 3; i++) {
      colors.push(colorB[0]);
      colors.push(colorB[1]);
      colors.push(colorB[2]);
    }

    column++;
  }

  Float32Array.from(vertices);
  geometry.setAttribute(
    'position',
    new BufferAttribute(new Float32Array(vertices), 3),
  );
  geometry.setAttribute(
    'color',
    new BufferAttribute(new Uint8Array(colors), 3, true),
  );

  return geometry;
};
