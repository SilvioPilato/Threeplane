import { BufferGeometry, BufferAttribute } from "three";
import SimplexNoise from "simplex-noise";

const noiseAmplitude = 3;
export default (sizeX: number, sizeY: number, cellSize = 1): BufferGeometry => {
  const geometry = new BufferGeometry();
  const simplex = new SimplexNoise(Date.now().toString());
  let vertices: number[] = [];
  // for (let y = 0; y <= sizeY; y++) {
  //   for (let x = 0; x <= sizeX; x++) {
  //     vertices.push(x * cellSize);
  //     vertices.push(y * cellSize);
  //     vertices.push(0);
  //     //vertices.push(simplex.noise2D(x, y) * noiseAmplitude);
  //   }
  // }
  let row = 0;
  let column = 0;
  for (let faceIndex = 0; faceIndex <= sizeX * sizeY - 1; faceIndex++) {
    if (faceIndex % sizeX === 0 && faceIndex !== 0) {
      row++;
      column = 0;
    }
    vertices.push(column * cellSize);
    vertices.push(row * cellSize);
    vertices.push(0);

    vertices.push((column + 1) * cellSize);
    vertices.push(row * cellSize);
    vertices.push(0);

    vertices.push(column * cellSize);
    vertices.push((row + 1) * cellSize);
    vertices.push(0);

    vertices.push((column + 1) * cellSize);
    vertices.push(row * cellSize);
    vertices.push(0);

    vertices.push((column + 1) * cellSize);
    vertices.push((row + 1) * cellSize);
    vertices.push(0);

    vertices.push(column * cellSize);
    vertices.push((row + 1) * cellSize);
    vertices.push(0);

    column++;
  }
  console.log(vertices);
  Float32Array.from(vertices);
  geometry.setAttribute(
    "position",
    new BufferAttribute(new Float32Array(vertices), 3)
  );
  return geometry;
};
