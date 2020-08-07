import { RandomMapGame, CreateRandomWorld, GameSettings } from "./Game";
import { domElement, controllers } from './GUI';

let mapXSize = 50;
let mapYSize = 50;
const mapCellSize = 2;
const rendererSizeX = 800;
const rendererSizeY = 600;

let gameSettings: GameSettings = {
  gridXSize: 50,
  gridYSize: 50,
  gridCellSize: 2,
}

let { renderer, world, camera, scene } = RandomMapGame(gameSettings);

const refreshWorld = () => {
  const {gridXSize, gridYSize, gridCellSize} = gameSettings;
  const newWorld = CreateRandomWorld(gridXSize, gridYSize, gridCellSize);
  scene.remove(world);
  scene.add(newWorld);
  
  world = newWorld;
}

const { horizontalGridSize, verticalGridSize, cellSize } = controllers(refreshWorld, gameSettings);

horizontalGridSize.onChange((value) => {
  gameSettings = {...gameSettings, gridXSize: value}
});

verticalGridSize.onChange((value) => {
  gameSettings = {...gameSettings, gridYSize: value}
});

cellSize.onChange((value) => {
  gameSettings = {...gameSettings, gridCellSize: value}
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
