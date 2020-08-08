import {
  Scene,
  Object3D,
  PerspectiveCamera,
  WebGLRenderer,
  WireframeGeometry,
  LineSegments,
  MeshBasicMaterial
} from "three";
import SimplexPlane from "./SimplexPlane";

export type Game = {
  scene: Scene;
  world: Object3D;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
};
export type GameSettings = {
  gridXSize: number;
  gridYSize: number;
  gridCellSize: number;
  noiseOctaves: number;
  noiseLacunarity: number;
  octavesPersistence: number;
  noiseScale: number;
}

export const RandomMapGame = (settings: GameSettings): Game => {
  const camera = new PerspectiveCamera(75, 800 / 600, 0.1, 1000)
  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);

  return {
    scene: new Scene(),
    renderer: new WebGLRenderer(),
    camera,
    world: CreateRandomWorld(settings),
  };
};

export const CreateRandomWorld = (
  gameSettings: GameSettings
): Object3D => {
  const {gridXSize, gridYSize, gridCellSize } = gameSettings;
  const material = new MeshBasicMaterial({ color: 0x8bac0f });
  const wireframe = new WireframeGeometry(SimplexPlane(gameSettings));
  const world = new LineSegments(wireframe, material)
  world.position.y = (-gridYSize * gridCellSize) / 2;
  world.position.x = (-gridXSize * gridCellSize) / 2;
  return world;
}