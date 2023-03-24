import './lib/matter.js';
import Entity from "./Entity.js";
import { keyMap } from "./lib/keyMap.js";
import collisions from './collisions.js';
import getByGroup from './lib/getByGroup.js';
import Bullet from './Bullet.js'
import { ticks } from './lib/tickCounter.js';

class Pickup extends Entity {

    constructor(posX, posY) {
        super()

        this.body = Matter.Bodies.rectangle(posX, posY, 10, 10, {
            collisionFilter: {
                category: collisions.enemy,
                mask: collisions.character
            },
            render: {
                fillStyle: 'green'
            },
            label: this.key
        })
        this.group = 'pickup'
        this.static = true

    }

    tick() {

        // if (Matter.Query.collides(this.body, getByGroup('player').bodies).length > 0) {
            
        // }

    }



}

export default Pickup