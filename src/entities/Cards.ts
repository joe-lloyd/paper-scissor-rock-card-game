import * as Phaser from 'phaser';
import PaperCard from '../assets/images/paper-card.png';
import ScissorCard from '../assets/images/scissor-card.png';
import RockCard from '../assets/images/rock-card.png';
import Game from "../scenes/Game";

class Cards {
    paperCard: Card;
    scissorCard: Card;
    rockCard: Card;

    constructor(scene: Game) {
        const yCoordinate = scene.scale.height * 0.8;
        const xCoordinate = scene.scale.width / 3;
        this.paperCard = new Card(scene, xCoordinate, yCoordinate, 'paper-card');
        this.scissorCard = new Card(scene, scene.scale.width / 2, yCoordinate, 'scissor-card');
        this.rockCard = new Card(scene, xCoordinate * 2, yCoordinate, 'rock-card');

        scene.add.existing(this.paperCard);
        scene.add.existing(this.scissorCard);
        scene.add.existing(this.rockCard);
    }

    static preload(scene) {
        scene.load.image('paper-card', PaperCard);
        scene.load.image('scissor-card', ScissorCard);
        scene.load.image('rock-card', RockCard);
    }

    update() {
        this.paperCard.update();
        this.scissorCard.update();
        this.rockCard.update();
    }
}

class Card extends Phaser.GameObjects.Image {
    initialX: number;
    initialY: number;

    constructor(scene: Game, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.initialX = x;
        this.initialY = y;
        this.scale = 2
        this.setInteractive({ draggable: true });

        this.on('drag', (pointer, dragX, dragY) => {
            this.setPosition(dragX, dragY);
        });
        this.on('dragend', () => {
            scene.tweens.add({
                targets: this,
                x: this.initialX,
                y: this.initialY,
                duration: 300,
                ease: 'Circ',
            });
        });
    }
}

export default Cards;
