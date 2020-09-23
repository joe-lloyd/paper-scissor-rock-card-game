import { Scene } from 'phaser';
import Cards from '../entities/Cards';

class Game extends Scene {
    Cards: Cards;

    constructor() {
        super({
            key: "Game"
        });
    }

    preload() {
        Cards.preload(this);
    }

    create() {
        this.Cards = new Cards(this);
    }

    update(time: number, delta: number) {
        super.update(time, delta);
        this.Cards.update();
    }
}

export default Game;
