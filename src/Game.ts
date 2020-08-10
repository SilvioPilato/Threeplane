import {
  Scene,
  Object3D,
  PerspectiveCamera,
  WebGLRenderer,
  MeshBasicMaterial,
  Mesh,
} from 'three';
import SimplexPlane from './SimplexPlane';
import { GameSettings } from './SettingsGUI';
import { Biome } from './Biomes';
export type Game = {
  scene: Scene;
  world: Object3D;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
};
export const RandomMapGame = (
  settings: GameSettings,
  biomes: Biome[],
): Game => {
  const camera = new PerspectiveCamera(75, 800 / 600, 0.1, 1000);
  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);

  return {
    scene: new Scene(),
    renderer: new WebGLRenderer(),
    camera,
    world: CreateRandomWorld(settings, biomes),
  };
};

export const CreateRandomWorld = (
  gameSettings: GameSettings,
  biomes: Biome[],
): Object3D => {
  const { gridXSize, gridYSize, gridCellSize } = gameSettings;
  const material = new MeshBasicMaterial({
    vertexColors: true,
  });
  const world = new Mesh(SimplexPlane(gameSettings, biomes), material);

  world.position.y = (-gridYSize * gridCellSize) / 2;
  world.position.x = (-gridXSize * gridCellSize) / 2;
  return world;
};
