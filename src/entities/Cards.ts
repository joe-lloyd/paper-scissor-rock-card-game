import * as Phaser from 'phaser';
import PaperCard from '../assets/images/paper-card.png';
import ScissorCard from '../assets/images/scissor-card.png';
import RockCard from '../assets/images/rock-card.png';
import Game from "../scenes/Game";

class Cards {
    constructor(scene: Game) {
        const yCoordinate = scene.scale.height * 0.8;
        const xCoordinate = scene.scale.width / 3;
        const paperCard = new Card(scene, xCoordinate, yCoordinate, 'paper-card');
        const scissorCard = new Card(scene, scene.scale.width / 2, yCoordinate, 'scissor-card');
        const rockCard = new Card(scene, xCoordinate * 2, yCoordinate, 'rock-card');

        scene.add.existing(paperCard);
        scene.add.existing(scissorCard);
        scene.add.existing(rockCard);
    }

    static preload(scene) {
        scene.load.image('paper-card', PaperCard);
        scene.load.image('scissor-card', ScissorCard);
        scene.load.image('rock-card', RockCard);
    }
}

class Card extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
    }

}

export default Cards;