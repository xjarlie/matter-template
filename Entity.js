import { global } from "./lib/global";

// The default template for any entity in the game
class Entity {
    constructor() {
        this.world = global.world;
        this.body = 0;
        this.group = 'default';
        this.key = crypto.randomUUID(); // Unique, randomised key
    }

    add() {
        Matter.Composite.add(this.world, this.body);
        global.entities.push(this);
    }

    remove() {
        global.entities = window.entities.filter(e => e !== this);
        Matter.Composite.remove(this.world, this.body);
    }

    tick() {

    }

    setSize(px) {
        const multiplyDiff = px / this.width;
        Matter.Body.scale(this.body, multiplyDiff, multiplyDiff);
        this.width = px;
    }
}

export default Entity;