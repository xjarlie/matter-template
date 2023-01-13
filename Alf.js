import './lib/matter.js';
import Entity from "./Entity.js";
import { keyMap } from "./lib/keyMap.js";
import collisions from './collisions.js';

class Alf extends Entity {
    constructor() {
        super()

        this.body = Matter.Bodies.rectangle(40, 60, 60, 60, {
            collisionFilter: {
                category: collisions.character, // The collision category this entity belongs to
                mask: collisions.ground // The collision categories this entity collides with
            },
            render: {
                fillStyle: '#ff26f4',
            },
            label: this.key,

        })

    }

    tick() {
        console.log('hello')

        if (keyMap['ArrowRight'] === true) {

            Matter.Body.applyForce(this.body, this.body.position, { x: 0.01, y: 0 })

        }

        if (keyMap['ArrowLeft'] === true) {

            Matter.Body.applyForce(this.body, this.body.position, {x: -0.01, y: 0})
        }

        if (keyMap['ArrowUp'] === true) {

            Matter.Body.applyForce(this.body, this.body.position, {x:0, y:-20});

        }
        
    }
}

export default Alf