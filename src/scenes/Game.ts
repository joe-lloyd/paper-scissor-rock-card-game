import { Scene } from 'phaser';
import Cards from '../entities/Cards';
import PlayMat from '../entities/PlayArea';
import CountDown from '../entities/CountDown';

class Game extends Scene {
    Cards: Cards;
    PlayMat: PlayMat;
    CountDown: CountDown;

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
        this.CountDown = new CountDown(this);
    }

    update(time: number, delta: number) {
        this.Cards.update();
    }
}

export default Game;
