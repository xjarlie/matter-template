import './lib/matter.js';
import Entity from "./Entity.js";
import { keyMap } from "./lib/keyMap.js";
import collisions from './collisions.js';

class Character extends Entity {
    constructor(posX, posY, sizeX, sizeY) {
        super();

        this.body = Matter.Bodies.rectangle(posX, posY, sizeX, sizeY, {
            collisionFilter: {
                category: collisions.character, // The collision category this entity belongs to
                mask: collisions.ground // The collision categories this entity collides with
            },
            render: {
                fillStyle: '#0000ff'
            },
            label: this.key,
            density: 10
        });
        this.group = 'character';
    }

    tick() {
        console.log(keyMap);
    }
}

export default Character;