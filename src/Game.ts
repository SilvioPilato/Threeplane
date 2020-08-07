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

export const RandomMapGame = (
  xSize: number,
  ySize: number,
  cellSize: number
): Game => {
  const material = new MeshBasicMaterial({ color: 0x8bac0f });
  const wireframe = new WireframeGeometry(SimplexPlane(xSize, ySize, cellSize));
  return {
    scene: new Scene(),
    renderer: new WebGLRenderer(),
    camera: new PerspectiveCamera(75, 800 / 600, 0.1, 1000),
    world: new LineSegments(wireframe, material)
  };
};
