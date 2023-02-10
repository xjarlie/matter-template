import './lib/matter.js';
import Entity from './Entity.js';
import collisions from './collisions.js';

class Collectible extends Entity {
    constructor(posX, posY, radius) {

        super();

        this.body = Matter.Bodies.circle(posX, posY, radius, {
            collisionFilter: {
                category: collisions.collectible,
                mask: 0
            },
            render: {
                fillStyle: 'green'
            }
        });

        this.static = true;

    }
}

export default Collectible;