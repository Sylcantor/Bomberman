
import {GameSolo} from './gameSolo.js';

window.onload = () => {
    //listener for the start button
    let game = new GameSolo();
    game.start();
}