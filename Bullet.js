import './lib/matter.js';
import Entity from "./Entity.js";
import { global } from "./lib/global.js";
import collisions from "./collisions.js";
import getByGroup from './lib/getByGroup.js';

class Bullet extends Entity {
    constructor(posX, posY, vX, vY) {
        super()

        this.body = Matter.Bodies.circle(posX, posY, 10, {
            collisionFilter: {
                category: collisions.bullet,
                mask: collisions.enemy
            },
            render: {
                fillStyle: 'blue'
            },
            label: this.key,
            mass: 1,
            friction: 0,
            frictionAir: 0
        })
        this.group = 'bullet';

        this.velocity = { x: vX, y: vY };
    }

    add() {
        super.add();

        Matter.Body.applyForce(this.body, this.body.position, this.velocity);
    }

    tick() {
        // Matter.Body.setVelocity(this.body, this.velocity);

        const enemiesColliding = Matter.Query.collides(this.body, getByGroup('enemy').bodies);

        if (enemiesColliding.length > 0) {
            console.log('hit');
            this.remove();
        }

        if (this.body.position.x > 1280 || this.body.position.x < 0 || this.body.position.y < 0 || this.body.position.y > 720) {
            this.remove();
        }
    }


}

export default Bullet;