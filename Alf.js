import './lib/matter.js';
import Entity from "./Entity.js";
import { keyMap } from "./lib/keyMap.js";
import collisions from './collisions.js';
import getByGroup from './lib/getByGroup.js';

class Alf extends Entity {
    constructor() {
        super()

        this.body = Matter.Bodies.rectangle(40, 60, 32, 32, {
            collisionFilter: {
                category: collisions.character, // The collision category this entity belongs to
                mask: collisions.ground // The collision categories this entity collides with
            },
            render: {
                sprite: {
                    texture: 'New Piskel.png',
                    xScale: 1,
                    yScale: 1
                }
            },
            label: this.key,
            density: 0.01,
        })

    }

    tick() {

        if (keyMap['ArrowRight'] === true) {

            Matter.Body.applyForce(this.body, this.body.position, { x: 0.01, y: 0 })

        }

        if (keyMap['ArrowLeft'] === true) {

            Matter.Body.applyForce(this.body, this.body.position, { x: -0.01, y: 0 })
        }

    
        if (Matter.Query.collides(this.body, getByGroup('platform').bodies).length > 0) {

            if (keyMap['ArrowUp'] === true) {

                Matter.Body.applyForce(this.body, this.body.position, { x: 0, y: -0.5 })
    
            }

        }

    }
}

export default Alf