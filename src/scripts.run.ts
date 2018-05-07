import harvester from "./role.harvester"
import upgrader from "./role.upgrader"
import builder from "./role.builder"
import miner from "./role.miner"
import minion from "./role.minion"
import rubbishCollector from "./role.rubbishCollector";

const creepRoles = {
    harvester: harvester,
    upgrader: upgrader,
    builder: builder,
    miner: miner,
    minion: minion,
    rubbishCollector: rubbishCollector,
}


    export function runCreep (creep: Creep) {
        if(creep.memory.currentRole) {
            creepRoles[creep.memory.currentRole].run(creep);
        } else {
            console.log("error")
        }
    }

