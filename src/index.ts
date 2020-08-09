import { RandomMapGame, CreateRandomWorld } from './Game';
import SettingsGUI, {
  domElement,
  GameSettings,
  GameSettingsOptions,
} from './SettingsGUI';

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
  },
};

const onSettingsChange = (compName: GameSettingsOptions, value: unknown) => {
  if (value) {
    gameSettings = { ...gameSettings, [compName]: value };
    console.log(gameSettings);
    refreshWorld();
  }
};
SettingsGUI(gameSettings, onSettingsChange);
const map = RandomMapGame(gameSettings);
const { renderer, camera, scene } = map;
let { world } = map;

const refreshWorld = () => {
  const newWorld = CreateRandomWorld(gameSettings);
  scene.remove(world);
  scene.add(newWorld);
  world = newWorld;
};

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
