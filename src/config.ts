import * as Phaser from 'phaser';

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
            gravity: {y: 200},
            debug: process.env.DEBUGMODE === 'true',
        }
    },
    scene: []
};

export default config;
