import {
  Scene,
  Object3D,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  MeshPhongMaterial,
  BackSide,
  FrontSide,
} from 'three';
import SimplexPlane from './SimplexPlane';
import { GameSettings, MapGenStrategy } from './SettingsGUI';
import { Biome } from './Biomes';
import DelaunayPlane from './DelaunayPlane';
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
  const { gridXSize, gridYSize, gridCellSize, type } = gameSettings;
  const material = new MeshPhongMaterial({
    vertexColors: true,
    flatShading: true,
    side: type == MapGenStrategy.DELANUNAY_PLANE ? BackSide : FrontSide,
  });
  const mapStrategy = mapStrategies[type];
  const world = new Mesh(mapStrategy(gameSettings, biomes), material);
  console.log(world.geometry.attributes);
  world.position.y = (-gridYSize * gridCellSize) / 2;
  world.position.x = (-gridXSize * gridCellSize) / 2;
  return world;
};

const mapStrategies = {
  [MapGenStrategy.DELANUNAY_PLANE]: DelaunayPlane,
  [MapGenStrategy.GRID_PLANE]: SimplexPlane,
};
