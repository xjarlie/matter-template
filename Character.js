import './lib/matter.js';
import Entity from "./Entity.js";
import { keyMap } from "./lib/keyMap.js";
import collisions from './collisions.js';

class Character extends Entity {
    constructor(...props) {
        super(...props);

        this.body = Matter.Bodies.rectangle(this.posX, this.posY, this.sizeX, this.sizeY, {
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
        console.log('character tick');
    }
}

export default Character;