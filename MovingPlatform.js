import './lib/matter.js';
import Entity from './Entity.js';
import collisions from './collisions.js';
import { global } from './lib/global.js';

class MovingPlatform extends Entity {
    constructor(posX, posY, sizeX, sizeY, anchorX, anchorY, anchorLength) {
        super();

        this.body = Matter.Bodies.rectangle(posX, posY, sizeX, sizeY, {
            collisionFilter: {
                category: collisions.ground, // The collision category this entity belongs to
                mask: collisions.character // The collision categories this entity collides with
            },
            render: {
                fillStyle: 'green'
            },
            label: this.key
        });

        this.constraint = Matter.Constraint.create({
            bodyA: this.body,
            pointB: { x: anchorX, y: anchorY },
            length: anchorLength,
            stiffness: 1,
            render: {
                type: 'line'
            }
        });

        this.static = false;

        this.group = 'moving platform'

    }

    add() {
        super.add();

        Matter.Composite.add(this.world, this.constraint);
    }
}

export default MovingPlatform;