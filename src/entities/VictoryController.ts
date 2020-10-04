import Game from "../scenes/Game";
import {RoundState} from "./RoundTracker";
import {CardIds} from "./Cards";

enum Results {
  Drawer= 'Drawer',
  Win= 'Win',
  Lose= 'Lose',
}

class VictoryController {
  scene: Game;
  playResult: boolean;
  result: Results;

  constructor(scene: Game) {
    this.scene = scene;
    this.playResult = false;
  }

  resultCheck = () => {
    const { aiSelectedCard } = this.scene.AiCardsController;
    const { selectedCard } = this.scene.PlayMat.playMat;

    if (aiSelectedCard === selectedCard) {
      this.result = Results.Drawer
    } else if (
        selectedCard === CardIds.ROCK && aiSelectedCard === CardIds.SCISSOR
        || selectedCard === CardIds.SCISSOR && aiSelectedCard === CardIds.PAPER
        || selectedCard === CardIds.PAPER && aiSelectedCard === CardIds.ROCK
    ) {
      this.result = Results.Win
    } else {
      this.result = Results.Lose
    }
    this.scene.CountDown.countDownText.setText(this.result);
  }

  update() {
    if (!this.playResult && this.scene.RoundTracker.roundState === RoundState.RESULT) {
      this.playResult = true;
      this.resultCheck();
    }
  }
}

export default VictoryController;
