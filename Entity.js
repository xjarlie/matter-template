import './lib/matter.js';
import { global } from "./lib/global.js";

// The default template for any entity in the game
class Entity {
    constructor() {
        this.world = global.world;
        this.body = 0;
        this.group = 'default';
        this.key = crypto.randomUUID(); // Unique, randomised key
        this.static = false;
        this.sprites = {};
    }

    add() {

        if (this.static) {
            Matter.Body.setStatic(this.body, true);
        }

        Matter.Composite.add(this.world, this.body);
        global.entities.push(this);
    }

    remove() {
        global.entities = global.entities.filter(e => e !== this);
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