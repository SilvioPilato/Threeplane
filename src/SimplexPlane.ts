import { BufferGeometry, BufferAttribute } from "three";
import SimplexNoise from "simplex-noise";
import { GameSettings } from "./Game";

export default (
  gameSettings: GameSettings
): BufferGeometry => {
  const { gridXSize, gridYSize, gridCellSize, noiseLacunarity, noiseOctaves, noiseScale, octavesPersistence, maxHeight } = gameSettings;
  const geometry = new BufferGeometry();
  const simplex = new SimplexNoise(Date.now().toString());
  let vertices: number[] = [];
  const getZValue = (x: number, y: number) => {
    let frequency = 1;
    let amplitude = 1;
    let totalNoise = 0;
    let totalAmplitude = 0;
    for (let i = 0; i < noiseOctaves; i++) {
      totalNoise += simplex.noise2D(x / noiseScale * frequency, y / noiseScale * frequency) * amplitude;
      totalAmplitude += amplitude;
      amplitude *= octavesPersistence;
      frequency *= noiseLacunarity;
    }

    return totalNoise/totalAmplitude * maxHeight;
  }
  let row = 0;
  let column = 0;
  for (let faceIndex = 0; faceIndex <= gridXSize * gridYSize - 1; faceIndex++) {
    if (faceIndex % gridXSize === 0 && faceIndex !== 0) {
      row++;
      column = 0;
    }
    vertices.push(column * gridCellSize);
    vertices.push(row * gridCellSize);
    vertices.push(getZValue(column, row));

    vertices.push((column + 1) * gridCellSize);
    vertices.push(row * gridCellSize);
    vertices.push(getZValue(column + 1, row));

    vertices.push(column * gridCellSize);
    vertices.push((row + 1) * gridCellSize);
    vertices.push(getZValue(column, row + 1));

    vertices.push((column + 1) * gridCellSize);
    vertices.push(row * gridCellSize);
    vertices.push(getZValue(column + 1, row));

    vertices.push((column + 1) * gridCellSize);
    vertices.push((row + 1) * gridCellSize);
    vertices.push(getZValue(column + 1, row + 1));

    vertices.push(column * gridCellSize);
    vertices.push((row + 1) * gridCellSize);
    vertices.push(getZValue(column, row + 1));

    column++;
  }

  Float32Array.from(vertices);
  geometry.setAttribute(
    "position",
    new BufferAttribute(new Float32Array(vertices), 3)
  );
  return geometry;
};