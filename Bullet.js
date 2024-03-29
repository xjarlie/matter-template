import './lib/matter.js'
import Entity from "./Entity.js"
import collisions from './collisions.js'
import getByGroup from './lib/getByGroup.js';
import { ticks } from './lib/tickCounter.js'

class Bullet extends Entity {
    constructor(posX, posY, vX, vY) {
        super()

        this.body = Matter.Bodies.rectangle(posX, posY, 15, 10, {
            collisionFilter: {
                category: collisions.character,
                mask: collisions.enemy
            },
            render: {
                fillStyle: 'blue'
            },
            label: this.key,
            mass: 1
        })
        this.group = 'bullet'

        this.velocity = { x: vX, y: vY }

    }

    tick() {

        Matter.Body.setVelocity(this.body, this.velocity);

        if (Matter.Query.collides(this.body, getByGroup('platform').bodies).length > 0) {
            this.remove()
        }

    }
}

export default Bullet