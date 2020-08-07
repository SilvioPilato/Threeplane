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
  noiseAmplitude: number;
}

export const RandomMapGame = (settings: GameSettings): Game => {
  const { gridXSize, gridYSize, gridCellSize, noiseAmplitude } = settings;

  const camera = new PerspectiveCamera(75, 800 / 600, 0.1, 1000)
  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);

  return {
    scene: new Scene(),
    renderer: new WebGLRenderer(),
    camera,
    world: CreateRandomWorld(gridXSize, gridYSize, gridCellSize, noiseAmplitude)
  };
};

export const CreateRandomWorld = (
  xSize: number,
  ySize: number,
  cellSize: number,
  noiseAmplitude: number,
): Object3D => {
  const material = new MeshBasicMaterial({ color: 0x8bac0f });
  const wireframe = new WireframeGeometry(SimplexPlane(xSize, ySize, cellSize, noiseAmplitude));
  const world = new LineSegments(wireframe, material)
  world.position.y = (-ySize * cellSize) / 2;
  world.position.x = (-xSize * cellSize) / 2;
  return world;
}