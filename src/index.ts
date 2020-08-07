import { RandomMapGame } from "./Game";
const mapXSize = 25;
const mapYSize = 25;
const mapCellSize = 5;
const { renderer, world, camera, scene } = RandomMapGame(
  mapXSize,
  mapYSize,
  mapCellSize
);

document.body.appendChild(renderer.domElement);
renderer.setSize(800, 600);

camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

world.rotateX(-45);
world.position.y = (-mapYSize * mapCellSize) / 2;
world.position.x = (-mapXSize * mapCellSize) / 2;

scene.add(world);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
