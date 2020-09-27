import Game from "../scenes/Game";

enum RoundState {
  WAITING = 'WAITING',
  COUNTDOWN = 'COUNTDOWN',
  RESULT = 'RESULT'
}

class RoundTracker {
  scene: Game;
  waitingTimer: Phaser.Time.TimerEvent;
  roundTimer: Phaser.Time.TimerEvent;
  roundState: RoundState;

  constructor(scene: Game) {
    this.scene = scene;
    this.roundState = RoundState.WAITING;
    this.waitingState();
  }

  waitingState = () => {
    let counter = 0;
    this.waitingTimer = this.scene.time.addEvent({
      loop: true,
      delay: 1000,
      callback: () => {
        counter += 1;

        if (counter === 3) {
          this.roundState = RoundState.COUNTDOWN;
          this.startRound();
          this.waitingTimer.remove(false);
        }
      }
    });
  }

  startRound = () => {
    let counter = 0;
    this.roundTimer = this.scene.time.addEvent({
      loop: true,
      delay: 1000,
      callback: () => {
        counter += 1;
        this.scene.CountDown.countDownText.setText(`${3 - counter}`);

        if (counter === 3) {
          this.roundState = RoundState.RESULT;
          this.roundTimer.remove(false);
        }
      }
    });
  }
}

export default RoundTracker;
export { RoundState };
