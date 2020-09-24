import * as Phaser from 'phaser';
import Game from "./scenes/Game";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.RESIZE,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: process.env.DEBUGMODE === 'true',
        }
    },
    scene: [Game]
};

export default config;
