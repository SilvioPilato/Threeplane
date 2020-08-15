import { BufferGeometry, BufferAttribute } from 'three';
import { GameSettings } from './SettingsGUI';
import getByZValue, { Biome } from './Biomes';
import PoissonDiskSampling from 'poisson-disk-sampling';
import Delaunator from 'delaunator';
import Noise from './Noise';

export default (settings: GameSettings, biomes: Biome[]): BufferGeometry => {
  const geometry = new BufferGeometry();
  const { gridXSize, gridYSize, gridCellSize, maxHeight } = settings;
  const noise = Noise(settings);
  const poisson = new PoissonDiskSampling({
    minDistance: gridCellSize,
    shape: [gridXSize * gridCellSize, gridYSize * gridCellSize],
  });
  const points: [][] = poisson.fill();
  const points3D = points.map((point: number[]) => {
    return [point[0], point[1], noise(point[0], point[1])];
  });
  const delaunay = Delaunator.from(points3D);
  const triangles = delaunay.triangles;
  const vertices = [];
  const colors = [];
  const normals = [];
  const getZValue = (zValue: number) => {
    return Math.pow(zValue, 4) * maxHeight;
  };
  for (let i = 0; i < triangles.length; i += 3) {
    const biome = getByZValue(biomes, points3D[triangles[i]][2]);
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
