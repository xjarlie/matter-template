import './lib/matter.js';
import Entity from './Entity.js';
import collisions from './collisions.js';
import { global } from './lib/global.js';

class MovingPlatform extends Entity {
    constructor(posX, posY, sizeX, sizeY, anchorX, anchorY) {
        super();

        this.body = Matter.Bodies.rectangle(posX, posY, sizeX, sizeY, {
            collisionFilter: {
                category: collisions.ground, // The collision category this entity belongs to
                mask: collisions.character // The collision categories this entity collides with
            },
            render: {
                fillStyle: 'green'
            },
            label: this.key,
            mass: 1000
        });

        this.constraint = Matter.Constraint.create({
            bodyA: this.body,
            pointB: { x: anchorX, y: anchorY }
        });

        this.static = false;

        this.group = 'platform'

    }

    add() {
        super.add();

        Matter.Composite.add(this.world, this.constraint);
    }

    tick() {
        // Negate gravity
        Matter.Body.applyForce(this.body, this.body.position, {x: 0, y: -1});

        //Matter.Body.setAngle(this.body, 0);
    }
}

export default MovingPlatform;