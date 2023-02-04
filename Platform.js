import './lib/matter.js';
import Entity from './Entity.js';
import collisions from './collisions.js';

class Platform extends Entity {
    constructor(posX, posY, sizeX, sizeY) {
        super();

        this.body = Matter.Bodies.rectangle(posX, posY, sizeX, sizeY, {
            collisionFilter: {
                category: collisions.ground, // The collision category this entity belongs to
                mask: collisions.character // The collision categories this entity collides with
            },
            render: {
                fillStyle: '#aaaaaa'
            },
            label: this.key
        });
        this.static = true;

        this.group = 'platform'

    }
}

export default Platform;