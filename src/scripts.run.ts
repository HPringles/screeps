import {RoleAttacker} from "./role.attacker"
import builder from "./role.builder"
import harvester from "./role.harvester"
import miner from "./role.miner"
import minion from "./role.minion"
import rubbishCollector from "./role.rubbishCollector";
import upgrader from "./role.upgrader";
import claimer from "./role.claimer";

const creepRoles = {
    harvester,
    upgrader,
    builder,
    miner,
    minion,
    rubbishCollector,
    attacker: RoleAttacker,
    claimer,
}


export function runCreep (creep: Creep) {
    try {
        if(creep.memory.currentRole) {
            creepRoles[creep.memory.currentRole].run(creep);
        } else {
            console.log("error" + creep.name)
        }

    } catch (err) {
        console.log(creep.name + ": " +  err);
    }
}
