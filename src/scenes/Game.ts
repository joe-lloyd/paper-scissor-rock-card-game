import { Scene } from 'phaser';
import Cards from '../entities/Cards';
import PlayMat from '../entities/PlayArea';

class Game extends Scene {
    Cards: Cards;
    PlayMat: PlayMat;

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
        this.PlayMat = new PlayMat(this);
        this.Cards = new Cards(this);
    }

    update(time: number, delta: number) {
        this.Cards.update();
    }
}

export default Game;
