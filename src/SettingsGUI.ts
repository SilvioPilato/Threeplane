import { GUI, GUIController } from 'dat.gui';
const gui = new GUI({ width: 300 });
export enum MapGenStrategy {
  DELANUNAY_PLANE,
  GRID_PLANE,
}
export type GameSettings = {
  gridXSize: number;
  gridYSize: number;
  gridCellSize: number;
  noiseOctaves: number;
  noiseLacunarity: number;
  octavesPersistence: number;
  noiseScale: number;
  maxHeight: number;
  onWorldGen: () => void;
};

export type GameSettingsOptions = keyof GameSettings;
type ComponentMap = {
  [T in GameSettingsOptions]: GUIController;
};
const gridFolder = gui.addFolder('World grid');
export const domElement = gui.domElement;

export default (
  defaultSettings: GameSettings,
  onChange: (componentName: GameSettingsOptions, value: unknown) => void,
): void => {
  const {
    gridXSize,
    gridYSize,
    gridCellSize,
    noiseLacunarity,
    noiseOctaves,
    octavesPersistence,
    noiseScale,
    maxHeight,
    onWorldGen,
  } = defaultSettings;
  const settings = {
    'Horizontal size': gridXSize,
    'Vertical size': gridYSize,
    'Cell size': gridCellSize,
    'Noise octaves': noiseOctaves,
    'Noise Lacunarity': noiseLacunarity,
    'Noise Scale': noiseScale,
    'Octaves Persistence': octavesPersistence,
    'Max height': maxHeight,
    'Generate world': onWorldGen,
  };
  const types = {
    SimpleGrid: MapGenStrategy.GRID_PLANE,
    DelaunayGrid: MapGenStrategy.DELANUNAY_PLANE,
  };
  const componentMap: ComponentMap = {
    gridXSize: gridFolder.add(settings, 'Horizontal size', 2, 800, 1),
    gridYSize: gridFolder.add(settings, 'Vertical size', 2, 800, 1),
    gridCellSize: gridFolder.add(settings, 'Cell size', 1, 20, 0.1),
    noiseOctaves: gridFolder.add(settings, 'Noise octaves', 1, 10, 1),
    noiseLacunarity: gridFolder.add(settings, 'Noise Lacunarity', 0.1, 10, 0.1),
    noiseScale: gridFolder.add(settings, 'Noise Scale', 0.1, 100, 0.01),
    octavesPersistence: gridFolder.add(
      settings,
      'Octaves Persistence',
      0,
      1,
      0.05,
    ),
    maxHeight: gridFolder.add(settings, 'Max height', 1, 50, 0.5),
    onWorldGen: gui.add(settings, 'Generate world'),
  };

  Object.keys(componentMap).forEach((componentName: GameSettingsOptions) => {
    componentMap[componentName].onChange((value) => {
      onChange(componentName, value);
    });
  });
};
