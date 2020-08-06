import { RandomMapGame } from "./Game";
const { renderer, world, camera, scene } = RandomMapGame();

document.body.appendChild(renderer.domElement);
renderer.setSize(800, 600);

camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);
world.rotateX(90);
scene.add(world);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
