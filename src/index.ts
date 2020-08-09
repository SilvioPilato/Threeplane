import { RandomMapGame, CreateRandomWorld } from "./Game";
import SettingsGUI, { domElement, GameSettings } from './SettingsGUI';

const rendererSizeX = 800;
const rendererSizeY = 600;

let gameSettings: GameSettings = {
  gridXSize: 50,
  gridYSize: 50,
  gridCellSize: 1,
  noiseOctaves: 4,
  octavesPersistence: 0.7,
  noiseLacunarity: 2,
  noiseScale: 35,
  maxHeight: 3,
  onWorldGen: () => {
    const newWorld = CreateRandomWorld(gameSettings);
  
    scene.remove(world);
    scene.add(newWorld);
  
    world = newWorld;
  }
}

const onSettingsChange = (compName, value) => {
  if (compName !== "generateWorld") {
    gameSettings = { ...gameSettings, [compName]: value }
    refreshWorld();
  }
}
SettingsGUI(gameSettings, onSettingsChange)

let { renderer, world, camera, scene } = RandomMapGame(gameSettings);

const refreshWorld = () => {
  const newWorld = CreateRandomWorld(gameSettings);

  scene.remove(world);
  scene.add(newWorld);

  world = newWorld;
}

document.getElementById('properties-panel').appendChild(domElement);

document.getElementById('app').appendChild(renderer.domElement);
renderer.setSize(rendererSizeX, rendererSizeY);

scene.add(world);
scene.rotateX(-20);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
