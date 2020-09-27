import { Scene } from 'phaser';
import Cards, { AiCardsController } from '../entities/Cards';
import PlayMat from '../entities/PlayArea';
import CountDown from '../entities/CountDown';
import RoundTracker from '../entities/RoundTracker';

class Game extends Scene {
    Cards: Cards;
    PlayMat: PlayMat;
    CountDown: CountDown;
    RoundTracker: RoundTracker;
    AiCardsController: AiCardsController;

    constructor() {
        super({
            key: "Game"
        });
    }

    preload() {
        Cards.preload(this);
        PlayMat.preload(this);
    }

    create() {
        this.cameras.main.backgroundColor.setTo(129, 133, 166);
        this.PlayMat = new PlayMat(this);
        this.Cards = new Cards(this);
        this.AiCardsController = new AiCardsController(this);
        this.RoundTracker = new RoundTracker(this);
        this.CountDown = new CountDown(this);
    }

    update() {
        this.AiCardsController.update()
    }
}

export default Game;
