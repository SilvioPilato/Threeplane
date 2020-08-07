import { RandomMapGame } from "./Game";

const mapXSize = 50;
const mapYSize = 50;
const mapCellSize = 2;
const rendererSizeX = 800;
const rendererSizeY = 600;

const { renderer, world, camera, scene } = RandomMapGame(
  mapXSize,
  mapYSize,
  mapCellSize
);

document.getElementById('app').appendChild(renderer.domElement);
renderer.setSize(rendererSizeX, rendererSizeY);

camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

console.log(world.matrix)

world.position.y = (-mapYSize * mapCellSize) / 2;
world.position.x = (-mapXSize * mapCellSize) / 2;

scene.add(world);
scene.rotateX(-20);
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
