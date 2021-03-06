import { RandomMapGame, CreateRandomWorld } from './Game';
import SettingsGUI, {
  domElement,
  GameSettings,
  GameSettingsOptions,
} from './SettingsGUI';
import { Biome, BiomeType } from './Biomes';
import { HemisphereLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const rendererSizeX = 800;
const rendererSizeY = 600;

const onWorldGen = () => null;
let gameSettings: GameSettings = {
  gridXSize: 200,
  gridYSize: 200,
  gridCellSize: 1,
  noiseOctaves: 4,
  octavesPersistence: 0.25,
  noiseLacunarity: 7,
  noiseScale: 80,
  maxHeight: 20,
  onWorldGen: onWorldGen,
};
const activeBiomes: Biome[] = [
  {
    type: BiomeType.WATER,
    threshold: 0.4,
    color: {
      r: 0,
      g: 41,
      b: 58,
    },
  },
  {
    type: BiomeType.SHORE,
    threshold: 0.45,
    color: {
      r: 198,
      g: 166,
      b: 100,
    },
  },
  {
    type: BiomeType.GRASS,
    threshold: 0.75,
    color: {
      r: 51,
      g: 165,
      b: 50,
    },
  },
  {
    type: BiomeType.MOUNTAIN,
    threshold: 0.9,
    color: {
      r: 75,
      g: 44,
      b: 13,
    },
  },
  {
    type: BiomeType.SNOW,
    threshold: 1,
    color: {
      r: 255,
      g: 250,
      b: 250,
    },
  },
];

RandomMapGame(gameSettings, activeBiomes).then((map) => {
  const onSettingsChange = (compName: GameSettingsOptions, value: unknown) => {
    gameSettings = { ...gameSettings, [compName]: value };
  };
  const refreshWorld = async () => {
    console.log('starting');
    const newWorld = await CreateRandomWorld(gameSettings, activeBiomes);
    scene.remove(world);
    scene.add(newWorld);
    world = newWorld;
  };
  gameSettings.onWorldGen = refreshWorld;

  SettingsGUI(gameSettings, onSettingsChange);
  const { renderer, camera, scene } = map;
  let { world } = map;

  document.getElementById('properties-panel').appendChild(domElement);
  document.getElementById('app').appendChild(renderer.domElement);
  renderer.setSize(rendererSizeX, rendererSizeY);
  scene.add(world);
  const light = new HemisphereLight(0xffffff, 0x080820, 1);
  light.position.set(0, 0, 10).normalize();
  scene.add(light);
  const controls = new OrbitControls(camera, renderer.domElement);
  scene.rotateX(80);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
});
