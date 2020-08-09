import {
  Scene,
  Object3D,
  PerspectiveCamera,
  WebGLRenderer,
  MeshBasicMaterial,
  Mesh,
  DoubleSide,
} from 'three';
import SimplexPlane from './SimplexPlane';
import { GameSettings } from './SettingsGUI';
export type Game = {
  scene: Scene;
  world: Object3D;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
};
export const RandomMapGame = (settings: GameSettings): Game => {
  const camera = new PerspectiveCamera(75, 800 / 600, 0.1, 1000);
  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);

  return {
    scene: new Scene(),
    renderer: new WebGLRenderer(),
    camera,
    world: CreateRandomWorld(settings),
  };
};

export const CreateRandomWorld = (gameSettings: GameSettings): Object3D => {
  const { gridXSize, gridYSize, gridCellSize } = gameSettings;
  const material = new MeshBasicMaterial({
    vertexColors: true,
    side: DoubleSide,
  });
  const world = new Mesh(SimplexPlane(gameSettings), material);

  world.position.y = (-gridYSize * gridCellSize) / 2;
  world.position.x = (-gridXSize * gridCellSize) / 2;
  return world;
};
