import { GUI } from 'dat.gui';
import { GameSettings } from './Game';
const gui = new GUI({ width: 300 });

let gridFolder = gui.addFolder('World grid');
export const domElement = gui.domElement;
export const controllers = (onWorldGen: () => void, gameSettings: GameSettings) => {
    const { gridXSize, gridYSize, gridCellSize, noiseAmplitude } = gameSettings;
    const settings = {
        'Horizontal size': gridXSize,
        'Vertical size': gridYSize,
        'Cell size': gridCellSize,
        'Noise amplitude': noiseAmplitude,
        'Generate world': onWorldGen,
    }

    return {
        "horizontalGridSize": gridFolder.add(settings, 'Horizontal size', 2, 100, 1),
        "verticalGridSize": gridFolder.add(settings, 'Vertical size', 2, 100, 1),
        "cellSize": gridFolder.add(settings, 'Cell size', 1, 20, 0.1),
        "noiseAmplitude": gridFolder.add(settings, 'Noise amplitude', 1, 20, 0.1),
        "gridConfirm": gui.add(settings, 'Generate world', 2, 100, 2),
    }
};
