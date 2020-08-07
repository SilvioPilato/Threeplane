import { GUI } from 'dat.gui';
import { GameSettings } from './Game';
const gui = new GUI({ width: 300 });

let gridFolder = gui.addFolder('World grid');
export const domElement = gui.domElement;
export const controllers = (onGridSave: () => void, gameSettings: GameSettings) => {
    const {gridXSize, gridYSize, gridCellSize} = gameSettings;
    const settings = {
        'Horizontal size': gridXSize,
        'Vertical size': gridYSize,
        'Cell size': gridCellSize,
        'Generate world': onGridSave,
    }
    return {
        "horizontalGridSize": gridFolder.add(settings, 'Horizontal size', 2, 100, 1),
        "verticalGridSize": gridFolder.add(settings, 'Vertical size', 2, 100, 1),
        "cellSize": gridFolder.add(settings, 'Cell size', 1, 20, 1),
        "gridConfirm": gridFolder.add(settings, 'Generate world', 2, 100, 2),
    }
};