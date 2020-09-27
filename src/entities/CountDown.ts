import * as Phaser from 'phaser';
import Game from "../scenes/Game";

class CountDownController {
  countDownText: CountDownText;
  constructor(scene) {
    this.countDownText = new CountDownText(scene);
    scene.add.existing(this.countDownText);
  }

  update() {

  }
}

class CountDownText extends Phaser.GameObjects.Text {
  constructor(scene: Game) {
    const style: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'PressStart2P',
      fontSize: "32px"
    }

    super(scene, scene.scale.width / 2, scene.scale.height / 4, "Round Start", style);

    this.setOrigin(0.5, 0.5);
  }
}

export default CountDownController;
