import './lib/matter.js';
import Entity from './Entity.js';
import collisions from './collisions.js';

class Platform extends Entity {
    constructor(...props) {
        super(...props);

        this.body = Matter.Bodies.rectangle(this.posX, this.posY, this.sizeX, this.sizeY, {
            collisionFilter: {
                category: collisions.ground, // The collision category this entity belongs to
                mask: collisions.character // The collision categories this entity collides with
            },
            render: {
                fillStyle: '#ffffff'
            },
            label: this.key
        });

        this.static = true;
    }
}

export default Platform;