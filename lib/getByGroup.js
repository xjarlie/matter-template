import { global } from "./global.js";

export default function getByGroup(group) {

    let entities = global.entities;
    entities = entities.filter(e => e.group.includes(group) === true);

    let bodies = Array.from(entities, e => e.body);
    return { entities, bodies };

}