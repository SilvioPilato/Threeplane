import { BufferGeometry, BufferAttribute } from "three";
import SimplexNoise from "simplex-noise";

export default (
  sizeX: number,
  sizeY: number,
  cellSize = 1,
  noiseAmplitude = 3
): BufferGeometry => {
  const geometry = new BufferGeometry();
  const simplex = new SimplexNoise(Date.now().toString());
  let vertices: number[] = [];

  let row = 0;
  let column = 0;
  for (let faceIndex = 0; faceIndex <= sizeX * sizeY - 1; faceIndex++) {
    if (faceIndex % sizeX === 0 && faceIndex !== 0) {
      row++;
      column = 0;
    }
    vertices.push(column * cellSize);
    vertices.push(row * cellSize);
    vertices.push(simplex.noise2D(column, row) * noiseAmplitude);

    vertices.push((column + 1) * cellSize);
    vertices.push(row * cellSize);
    vertices.push(simplex.noise2D(column + 1, row) * noiseAmplitude);

    vertices.push(column * cellSize);
    vertices.push((row + 1) * cellSize);
    vertices.push(simplex.noise2D(column, row + 1) * noiseAmplitude);

    vertices.push((column + 1) * cellSize);
    vertices.push(row * cellSize);
    vertices.push(simplex.noise2D(column + 1, row) * noiseAmplitude);

    vertices.push((column + 1) * cellSize);
    vertices.push((row + 1) * cellSize);
    vertices.push(simplex.noise2D(column + 1, row + 1) * noiseAmplitude);

    vertices.push(column * cellSize);
    vertices.push((row + 1) * cellSize);
    vertices.push(simplex.noise2D(column, row + 1) * noiseAmplitude);

    column++;
  }

  Float32Array.from(vertices);
  geometry.setAttribute(
    "position",
    new BufferAttribute(new Float32Array(vertices), 3)
  );
  return geometry;
};
