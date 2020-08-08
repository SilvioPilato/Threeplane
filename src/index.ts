import { RandomMapGame, CreateRandomWorld, GameSettings } from "./Game";
import { domElement, controllers } from './GUI';

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
}

let { renderer, world, camera, scene } = RandomMapGame(gameSettings);

const refreshWorld = () => {
  const newWorld = CreateRandomWorld(gameSettings);

  scene.remove(world);
  scene.add(newWorld);

  world = newWorld;
}

const {
  horizontalGridSize,
  verticalGridSize,
  cellSize,
  noiseOctaves: noiseOctavesGui,
  noiseLacunarity: noiseLacunarityGui,
  octavesPersistence: octavesPersistenceGui,
  noiseScale: noiseScaleGui,
  maxHeight: maxHeightGui
} = controllers(refreshWorld, gameSettings);

horizontalGridSize.onChange((value) => {
  gameSettings = { ...gameSettings, gridXSize: value }
  refreshWorld();
});

verticalGridSize.onChange((value) => {
  gameSettings = { ...gameSettings, gridYSize: value }
  refreshWorld();
});

cellSize.onChange((value) => {
  gameSettings = { ...gameSettings, gridCellSize: value }
  refreshWorld();
})

noiseOctavesGui.onChange((value) => {
  gameSettings = { ...gameSettings, noiseOctaves: value }
  refreshWorld();
})

noiseLacunarityGui.onChange((value) => {
  gameSettings = { ...gameSettings, noiseLacunarity: value }
  refreshWorld();
})

octavesPersistenceGui.onChange((value) => {
  gameSettings = { ...gameSettings, octavesPersistence: value }
  refreshWorld();
})

noiseScaleGui.onChange((value) => {
  gameSettings = { ...gameSettings, noiseScale: value }
  refreshWorld();
})

maxHeightGui.onChange((value) => {
  gameSettings = { ...gameSettings, maxHeight: value }
  refreshWorld();
})

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
