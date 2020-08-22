import { BufferGeometry, BufferAttribute } from 'three';
import { GameSettings } from './SettingsGUI';
import getByZValue, { Biome } from './Biomes';
import Delaunator from 'delaunator';
import Noise from './Noise';

export default (
  settings: GameSettings,
  biomes: Biome[],
): Promise<BufferGeometry> => {
  return new Promise((resolve) => {
    const { gridXSize, gridYSize, gridCellSize } = settings;
    const noise = Noise(settings);
    const tileOffsets = [
      {
        x: 0,
        y: 0,
      },
      {
        x: gridXSize / 2 + gridCellSize / 2,
        y: 0,
      },
      {
        x: 0,
        y: gridYSize / 2 + gridCellSize / 2,
      },
      {
        x: gridXSize / 2 + gridCellSize / 2,
        y: gridYSize / 2 + gridCellSize / 2,
      },
    ];
    let workersEnded = 0;

    const points3D = [];
    tileOffsets.forEach((offsets) => {
      const worker = new Worker('PoissonWorker.ts');
      worker.addEventListener('message', ({ data }) => {
        for (const point of data) {
          points3D.push([
            point[0] + offsets.x,
            point[1] + offsets.y,
            noise(point[0] + offsets.x, point[1] + offsets.y),
          ]);
        }
        workersEnded++;
        if (workersEnded >= tileOffsets.length) {
          resolve(getTriangulatedGeometry(settings, points3D, biomes));
        }
      });
      worker.postMessage({
        xSize: gridXSize / 2,
        ySize: gridYSize / 2,
        minDistance: gridCellSize,
      });
    });
  });
};

const getTriangulatedGeometry = (
  settings: GameSettings,
  points3D: number[][],
  biomes: Biome[],
) => {
  const geometry = new BufferGeometry();
  const { maxHeight } = settings;
  const delaunay = Delaunator.from(points3D);
  const triangles = delaunay.triangles;
  const vertices = [];
  const colors = [];
  const normals = [];
  const getZValue = function getZValue(zValue: number) {
    return Math.pow(zValue, 4) * maxHeight;
  };

  for (let i = 0; i < triangles.length; i += 3) {
    const maxZValue = Math.max(
      points3D[triangles[i]][2],
      points3D[triangles[i + 1]][2],
      points3D[triangles[i + 2]][2],
    );
    const biome = getByZValue(biomes, maxZValue);
    vertices.push(
      points3D[triangles[i]][0],
      points3D[triangles[i]][1],
      getZValue(points3D[triangles[i]][2]),
    );
    vertices.push(
      points3D[triangles[i + 1]][0],
      points3D[triangles[i + 1]][1],
      getZValue(points3D[triangles[i + 1]][2]),
    );
    vertices.push(
      points3D[triangles[i + 2]][0],
      points3D[triangles[i + 2]][1],
      getZValue(points3D[triangles[i + 2]][2]),
    );
    colors.push(
      biome.color.r,
      biome.color.g,
      biome.color.b,
      biome.color.r,
      biome.color.g,
      biome.color.b,
      biome.color.r,
      biome.color.g,
      biome.color.b,
    );
    normals.push(0, 0, 1);
    normals.push(0, 0, 1);
    normals.push(0, 0, 1);
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
