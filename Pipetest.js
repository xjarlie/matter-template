import './lib/matter.js';
import Entity from "./Entity.js";
import { keyMap } from "./lib/keyMap.js";
import collisions from './collisions.js';

class Pipe extends Entity {

    constructor() {
        super()

        this.body = Matter.Bodies.rectangle(800, 0, 50, 300, {
            collisionFilter: {
                category: collisions.ground,
                mask: collisions.character
            },
            render: {
                fillStyle: '#ffffff'
            },
            label: this.key,
            frictionAir: 0,
            
        })

        this.group = 'pipe';
        this.static = false;
    }

    tick() {
        Matter.Body.applyForce(this.body, this.body.position, { x: 0, y: -0.015 });
        Matter.Body.setVelocity(this.body, {x: -10, y: 0});
        Matter.Body.setAngle(this.body, 0);
        //this.body.position.x--;
    }

}

export default Pipe;