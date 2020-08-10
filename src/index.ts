import { RandomMapGame, CreateRandomWorld } from './Game';
import SettingsGUI, {
  domElement,
  GameSettings,
  GameSettingsOptions,
} from './SettingsGUI';
import { Biome } from './Biomes';

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
  worldAutogen: true,
  onWorldGen: () => {
    refreshWorld();
  },
};
const activeBiomes: Biome[] = [
  {
    threshold: 0.1,
    color: {
      r: 0,
      g: 41,
      b: 58,
    },
  },
  {
    threshold: 0.3,
    color: {
      r: 51,
      g: 165,
      b: 50,
    },
  },
  {
    threshold: 0.7,
    color: {
      r: 75,
      g: 44,
      b: 13,
    },
  },
  {
    threshold: 1,
    color: {
      r: 255,
      g: 250,
      b: 250,
    },
  },
];

const onSettingsChange = (compName: GameSettingsOptions, value: unknown) => {
  gameSettings = { ...gameSettings, [compName]: value };
  if (gameSettings.worldAutogen && compName !== 'onWorldGen') {
    refreshWorld();
  }
};
SettingsGUI(gameSettings, onSettingsChange);
const map = RandomMapGame(gameSettings, activeBiomes);
const { renderer, camera, scene } = map;
let { world } = map;

const refreshWorld = () => {
  const newWorld = CreateRandomWorld(gameSettings, activeBiomes);
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
