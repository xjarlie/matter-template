import collisions from "./collisions.js";
import Entity from "./Entity.js";
import { global } from "./lib/global.js";

class PassiveEnemy extends Entity {
    constructor(pointA, pointB) {
        super();

        this.body = Matter.Bodies.rectangle(400, 60, 32, 64, {
            collisionFilter: {
                category: collisions.character, // The collision category this entity belongs to
                mask: collisions.ground | collisions.character // The collision categories this entity collides with
            },
            render: {
                fillStyle: 'red'
            },
            label: this.key,
            mass: 1,
            friction: 0
        })

        this.facing = 'right';
        this.target = pointA;
        this.speed = 3;
    }

    tick() {

        const position = this.body.position;
        const target = this.target;

        const xDirectionToTarget = Math.sign(position.x - target.x);

        Matter.Body.setVelocity(this.body, { x: xDirectionToTarget * this.speed, y: this.body.velocity.y })

    }
}

export default PassiveEnemy;