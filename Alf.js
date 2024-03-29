import './lib/matter.js';
import Entity from "./Entity.js";
import { keyMap } from "./lib/keyMap.js";
import collisions from './collisions.js';
import getByGroup from './lib/getByGroup.js';
import Bullet from './Bullet.js'
import { ticks } from './lib/tickCounter.js';
import getByKey from './lib/getByKey.js';

class Alf extends Entity {
    constructor() {
        super()

        this.body = Matter.Bodies.rectangle(40, 60, 32, 32, {
            collisionFilter: {
                category: collisions.character, // The collision category this entity belongs to
                mask: collisions.ground | collisions.enemy // The collision categories this entity collides with
            },
            render: {
                sprite: {
                    texture: 'New Piskel.png',
                    xScale: 1,
                    yScale: 1
                }
            },
            label: this.key,
            mass: 1,
            friction: 0
        })

        this.group = 'player'
        this.delay = 10
        this.lastFired = 0
        this.ammo = 5

        this.facing = 1

    }

    tick() {

        if (keyMap['ArrowRight'] === true) {
            this.facing = 1
            Matter.Body.applyForce(this.body, this.body.position, { x: 0.001, y: 0 })

        }

        if (keyMap['ArrowLeft'] === true) {
            this.facing = -1
            Matter.Body.applyForce(this.body, this.body.position, { x: -0.001, y: 0 })
        }

        if (keyMap[' '] === true) {
            
            if (ticks > this.lastFired + this.delay) {

                if (this.ammo > 0) {

                    const bullet = new Bullet(this.body.position.x, this.body.position.y, (5 * this.facing), 0)
                    bullet.add()
                    this.lastFired = ticks
                    this.ammo = this.ammo - 1

                }
                
            }

        }


        if (Matter.Query.collides(this.body, getByGroup('platform').bodies).length > 0) {

            if (keyMap['ArrowUp'] === true) {

                Matter.Body.applyForce(this.body, this.body.position, { x: 0, y: -0.05 })
    
            }

        }

        if (Matter.Query.collides(this.body, getByGroup('enemy').bodies).length > 0) {

            Matter.Body.setPosition(this.body, { x: 40, y: 60 });
 
        }

        if (Matter.Query.collides(this.body, getByGroup('pickup').bodies).length > 0) {
            console.log('here')
            this.ammo = this.ammo + 5

            const id = Matter.Query.collides(this.body, getByGroup('pickup').bodies)[0].bodyA.label;
            getByKey(id).remove()

        }
    }
}

export default Alf