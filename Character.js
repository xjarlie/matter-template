import './matter';
import Entity from "./Entity";
import { keyMap } from "./lib/keyMap";
import collisions from './collisions';

class Character extends Entity {
    constructor() {
        super();

        this.body = Matter.Bodies.rectangle(100, 100, 50, 50, {
            collisionFilter: {
                category: collisions.character, // The collision category this entity belongs to
                mask: collisions.ground // The collision categories this entity collides with
            },
            render: {
                fillStyle: '#0000ff'
            },
            label: this.key
        });
        this.group = 'character';
    }
}