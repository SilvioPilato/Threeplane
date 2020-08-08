import { GUI } from 'dat.gui';
import { GameSettings } from './Game';
const gui = new GUI({ width: 300 });

let gridFolder = gui.addFolder('World grid');
export const domElement = gui.domElement;
export const controllers = (onWorldGen: () => void, gameSettings: GameSettings) => {
    const { gridXSize, gridYSize, gridCellSize, noiseLacunarity, noiseOctaves, octavesPersistence, noiseScale } = gameSettings;
    const settings = {
        'Horizontal size': gridXSize,
        'Vertical size': gridYSize,
        'Cell size': gridCellSize,
        'Noise octaves': noiseOctaves,
        'Noise Lacunarity': noiseLacunarity,
        'Noise Scale': noiseScale,
        'Octaves Persistence': octavesPersistence,
        'Generate world': onWorldGen,
    }

    return {
        "horizontalGridSize": gridFolder.add(settings, 'Horizontal size', 2, 100, 1),
        "verticalGridSize": gridFolder.add(settings, 'Vertical size', 2, 100, 1),
        "cellSize": gridFolder.add(settings, 'Cell size', 1, 20, 0.1),
        "noiseOctaves": gridFolder.add(settings, 'Noise octaves', 1, 10, 1),
        "noiseLacunarity": gridFolder.add(settings, 'Noise Lacunarity', 0.1, 10, 0.1),
        "noiseScale": gridFolder.add(settings, 'Noise Scale', 0.1, 20, 0.01),
        "octavesPersistence": gridFolder.add(settings, 'Octaves Persistence', 0, 1, 0.05),
        "gridConfirm": gui.add(settings, 'Generate world', 2, 100, 2),
    }
};
