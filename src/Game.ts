import {
  Scene,
  Object3D,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  MeshPhongMaterial,
  BackSide,
} from 'three';

import { GameSettings } from './SettingsGUI';
import { Biome } from './Biomes';
import DelaunayPlane from './DelaunayPlane';
export type Game = {
  scene: Scene;
  world: Object3D;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
};

export const RandomMapGame = async (
  settings: GameSettings,
  biomes: Biome[],
): Promise<Game> => {
  const camera = new PerspectiveCamera(75, 800 / 600, 0.1, 1000);
  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);

  return {
    scene: new Scene(),
    renderer: new WebGLRenderer(),
    camera,
    world: await CreateRandomWorld(settings, biomes),
  };
};

export const CreateRandomWorld = async (
  gameSettings: GameSettings,
  biomes: Biome[],
): Promise<Object3D> => {
  const { gridXSize, gridYSize, gridCellSize } = gameSettings;
  const material = new MeshPhongMaterial({
    vertexColors: true,
    flatShading: true,
    side: BackSide,
  });
  // const mapStrategy = mapStrategies[type];
  const mapMesh = await DelaunayPlane(gameSettings, biomes);
  const world = new Mesh(mapMesh, material);

  world.position.y = (-gridYSize * gridCellSize) / 2;
  world.position.x = (-gridXSize * gridCellSize) / 2;
  return Promise.resolve(world);
};
