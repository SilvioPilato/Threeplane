import { BufferGeometry, BufferAttribute } from "three";
import SimplexNoise from "simplex-noise";
import { GameSettings } from "./SettingsGUI";

export default (
  gameSettings: GameSettings
): BufferGeometry => {
  const { gridXSize, gridYSize, gridCellSize, noiseLacunarity, noiseOctaves, noiseScale, octavesPersistence, maxHeight } = gameSettings;
  const geometry = new BufferGeometry();
  const simplex = new SimplexNoise(Date.now().toString());
  let vertices: number[] = [];
  let colors: number[] = [];
  const pickColor = (zValue: number) => {
    if (zValue < 0) {
      return [
        0,
        41,
        58
      ]
    }
    return [
      0,
      128,
      0
    ]
  }
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
  let lastZvalue = 0;
  let lastColors = [];
  for (let faceIndex = 0; faceIndex <= gridXSize * gridYSize - 1; faceIndex++) {
    if (faceIndex % gridXSize === 0 && faceIndex !== 0) {
      row++;
      column = 0;
    }
    lastZvalue = getZValue(column, row);
    lastColors = pickColor(lastZvalue);
    vertices.push(column * gridCellSize);
    vertices.push(row * gridCellSize);
    vertices.push(lastZvalue);
    colors.push(lastColors[0])
    colors.push(lastColors[1])
    colors.push(lastColors[2])
    
    lastZvalue = getZValue(column + 1, row);
    lastColors = pickColor(lastZvalue);
    vertices.push((column + 1) * gridCellSize);
    vertices.push(row * gridCellSize);
    vertices.push(lastZvalue);
    colors.push(lastColors[0])
    colors.push(lastColors[1])
    colors.push(lastColors[2])

    lastZvalue = getZValue(column, row + 1);
    lastColors = pickColor(lastZvalue);
    vertices.push(column * gridCellSize);
    vertices.push((row + 1) * gridCellSize);
    vertices.push(lastZvalue);
    colors.push(lastColors[0])
    colors.push(lastColors[1])
    colors.push(lastColors[2])

    lastZvalue = getZValue(column + 1, row);
    lastColors = pickColor(lastZvalue);
    vertices.push((column + 1) * gridCellSize);
    vertices.push(row * gridCellSize);
    vertices.push(lastZvalue);
    colors.push(lastColors[0])
    colors.push(lastColors[1])
    colors.push(lastColors[2])

    lastZvalue = getZValue(column + 1, row + 1);
    lastColors = pickColor(lastZvalue);
    vertices.push((column + 1) * gridCellSize);
    vertices.push((row + 1) * gridCellSize);
    vertices.push(lastZvalue);
    colors.push(lastColors[0])
    colors.push(lastColors[1])
    colors.push(lastColors[2])

    lastZvalue = getZValue(column, row + 1);
    lastColors = pickColor(lastZvalue);
    vertices.push(column * gridCellSize);
    vertices.push((row + 1) * gridCellSize);
    vertices.push(lastZvalue);
    colors.push(lastColors[0])
    colors.push(lastColors[1])
    colors.push(lastColors[2])

    column++;
  }

  Float32Array.from(vertices);
  geometry.setAttribute(
    "position",
    new BufferAttribute(new Float32Array(vertices), 3)
  );
  geometry.setAttribute(
    "color",
    new BufferAttribute(new Uint8Array(colors), 3, true)
  );

  return geometry;
};