import * as Phaser from 'phaser';
import PlayMat from '../assets/images/play-area.png';
import Game from "../scenes/Game";
import { CardIds } from './Cards';

class PlayAreaController {
  playMat: PlayAreaGameObject;

  constructor(scene) {
    this.playMat = new PlayAreaGameObject(scene);
    scene.add.existing(this.playMat);
  }

  static preload(scene) {
    scene.load.image('play-mat', PlayMat);
  }
}

class PlayAreaGameObject extends Phaser.Physics.Arcade.Image {
  selectedCard: CardIds;

  constructor(scene: Game) {
    super(scene, 0, 0, 'play-mat');
    this.scene = scene;
    this.scale = 3;
    this.setOrigin(0.5, 0.5);
    this.setPosition(scene.scale.width / 2, scene.scale.height / 2);
    scene.physics.world.enable(this);
  }

  setCard = (cardId) => {
    this.selectedCard = cardId;
  }

  removeCard = (cardId) => {
    this.selectedCard = cardId;
  }
}

export default PlayAreaController;
