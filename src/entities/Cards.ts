import * as Phaser from 'phaser';
import PaperCard from '../assets/images/paper-card.png';
import ScissorCard from '../assets/images/scissor-card.png';
import RockCard from '../assets/images/rock-card.png';
import Game from "../scenes/Game";

enum CardIds {
    PAPER = 'paper',
    SCISSOR = 'scissor',
    ROCK = 'rock',
}

class CardsController {
    paperCard: Card;
    scissorCard: Card;
    rockCard: Card;

    constructor(scene: Game) {
        const yCoordinate = scene.scale.height * 0.8;
        const xCoordinate = scene.scale.width / 3;
        this.paperCard = new Card(scene, xCoordinate, yCoordinate, 'paper-card', CardIds.PAPER);
        this.scissorCard = new Card(scene, scene.scale.width / 2, yCoordinate, 'scissor-card', CardIds.SCISSOR);
        this.rockCard = new Card(scene, xCoordinate * 2, yCoordinate, 'rock-card', CardIds.ROCK);

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

class Card extends Phaser.Physics.Arcade.Image {
    scene: Game;
    id: CardIds
    initialX: number;
    initialY: number;
    tweens: {[key: string]: () => Phaser.Tweens.Tween};

    constructor(scene: Game, x, y, texture, id) {
        super(scene, x, y, texture);
        this.id = id;
        this.scene = scene;
        this.initialX = x;
        this.initialY = y;
        this.scale = 2
        this.setInteractive({ draggable: true });
        scene.physics.world.enable(this);
        this.initTweens();
        this.setDepth(1);

        this.on('drag', this.handleDragCard);
        this.on('dragstart', this.handleDragStart)
        this.on('dragend', this.handleDragEnd);
    }

    initTweens = () => {
        this.tweens = {
            scaleUp: () => this.scene.tweens.add({
                targets: this,
                scale: 2.4,
                duration: 100,
                ease: 'Circ',
            }),
            scaleDown: () => this.scene.tweens.add({
                targets: this,
                scale: 2,
                duration: 100,
                ease: 'Circ',
            }),
            playCard: () => this.scene.tweens.add({
                targets: this,
                x: this.scene.PlayMat.playMat.x,
                y: this.scene.PlayMat.playMat.y,
                duration: 300,
                ease: 'Circ',
            }),
            resetCard: () => this.scene.tweens.add({
                targets: this,
                x: this.initialX,
                y: this.initialY,
                duration: 300,
                ease: 'Circ',
                onStart: (ween, git) => {
                    console.log('started reset');
                },
                onComplete: (ween, git) => {
                    console.log('complete reset');
                },
            })
        }
    }

    handleDragCard =  (pointer, dragX, dragY) => {
        this.setPosition(dragX, dragY);
    }

    handleDragStart =  () => {
        this.tweens.scaleUp();
        this.setDepth(2);
    }

    handleDragEnd = () => {
        this.tweens.scaleDown();
        this.setDepth(1);

        if (this.scene.PlayMat.playMat.selectedCard && this.scene.PlayMat.playMat.selectedCard !== this.id && this.scene.physics.overlap(this, this.scene.PlayMat.playMat)) {
            this.tweens.resetCard();
        } else if (this.scene.physics.overlap(this, this.scene.PlayMat.playMat)) {
            this.scene.PlayMat.playMat.setCard(this.id);
            this.tweens.playCard();
        } else if (this.scene.PlayMat.playMat.selectedCard === this.id) {
            this.tweens.resetCard();
            this.scene.PlayMat.playMat.setCard(undefined);
        } else {
            this.tweens.resetCard();
        }
    }

    update() {

    }
}

export default CardsController;
export { CardIds };
