import { BufferGeometry, BufferAttribute } from 'three';

import { GameSettings } from './SettingsGUI';
import getByZValue, { Biome } from './Biomes';
import Noise from './Noise';
export default (
  gameSettings: GameSettings,
  biomes: Biome[],
): BufferGeometry => {
  const geometry = new BufferGeometry();
  const noise = Noise(gameSettings);
  const vertices: number[] = [];
  const colors: number[] = [];
  const normals = [];
  const { gridXSize, gridYSize, gridCellSize, maxHeight } = gameSettings;
  const pickColor = (zValue: number) => {
    const biome = getByZValue(biomes, zValue);
    return [biome.color.r, biome.color.g, biome.color.b];
  };

  const getZValue = (zValue: number) => {
    return Math.pow(zValue, 3) * maxHeight;
  };

  let row = 0;
  let column = 0;
  let lastZvalue = 0;
  for (let faceIndex = 0; faceIndex <= gridXSize * gridYSize - 1; faceIndex++) {
    if (faceIndex % gridXSize === 0 && faceIndex !== 0) {
      row++;
      column = 0;
    }
    const triangles = [];

    lastZvalue = noise(column, row);
    vertices.push(column * gridCellSize);
    vertices.push(row * gridCellSize);
    vertices.push(getZValue(lastZvalue));
    triangles.push(lastZvalue / maxHeight);

    lastZvalue = noise(column + 1, row);
    vertices.push((column + 1) * gridCellSize);
    vertices.push(row * gridCellSize);
    vertices.push(getZValue(lastZvalue));
    triangles.push(lastZvalue);

    lastZvalue = noise(column, row + 1);
    vertices.push(column * gridCellSize);
    vertices.push((row + 1) * gridCellSize);
    vertices.push(getZValue(lastZvalue));
    triangles.push(lastZvalue);

    lastZvalue = noise(column + 1, row);
    vertices.push((column + 1) * gridCellSize);
    vertices.push(row * gridCellSize);
    vertices.push(getZValue(lastZvalue));
    triangles.push(lastZvalue);

    lastZvalue = noise(column + 1, row + 1);
    vertices.push((column + 1) * gridCellSize);
    vertices.push((row + 1) * gridCellSize);
    vertices.push(getZValue(lastZvalue));
    triangles.push(lastZvalue);

    lastZvalue = noise(column, row + 1);
    vertices.push(column * gridCellSize);
    vertices.push((row + 1) * gridCellSize);
    vertices.push(getZValue(lastZvalue));
    triangles.push(lastZvalue);

    const sortedtriangles: number[] = triangles.sort();
    const color = pickColor(sortedtriangles[5]);
    for (let i = 0; i < 3; i++) {
      colors.push(color[0]);
      colors.push(color[1]);
      colors.push(color[2]);
      colors.push(color[0]);
      colors.push(color[1]);
      colors.push(color[2]);
    }

    for (let i = 0; i < 2; i++) {
      normals.push(0);
      normals.push(0);
      normals.push(1);
    }

    column++;
  }

  geometry.setAttribute(
    'position',
    new BufferAttribute(new Float32Array(vertices), 3),
  );
  geometry.setAttribute(
    'color',
    new BufferAttribute(new Uint8Array(colors), 3, true),
  );
  geometry.setAttribute(
    'normals',
    new BufferAttribute(new Float32Array(normals), 3, true),
  );

  return geometry;
};
