import { Geometry, Vector3, Face3 } from 'three';
import SimplexNoise from 'simplex-noise';
export default (sizeX: number, sizeY: number, cellSize = 1): Geometry => {
  const geometry = new Geometry();
  const simplex = new SimplexNoise(Date.now().toString());

  for (let y = 0; y <= sizeY; y++) {
    for (let x = 0; x <= sizeX; x++) {
      geometry.vertices.push(
        new Vector3(x * cellSize, y * cellSize, simplex.noise2D(x, y) * 3),
      );
    }
  }

  let row = 0;
  for (let faceIndex = 0; faceIndex <= sizeX * sizeY - 1; faceIndex++) {
    if (faceIndex % sizeX === 0 && faceIndex !== 0) {
      row++;
    }
    geometry.faces.push(
      new Face3(
        faceIndex + row,
        faceIndex + row + 1,
        faceIndex + row + sizeX + 1,
      ),
    );
    geometry.faces.push(
      new Face3(
        faceIndex + row + 1,
        faceIndex + row + sizeX + 2,
        faceIndex + row + sizeX + 1,
      ),
    );
  }

  return geometry;
};
