const creepRoles = {
    harvester: require('role.harvester'),
    upgrader: require("role.upgrader"),
    builder: require("role.builder"),
    miner: require("role.miner"),
    minion: require("role.minion"),
    rubbishCollector: require("role.rubbishCollector"),
}

module.exports = {
    runCreep: (creep) => {
        if(creep.memory.currentRole) {
            creepRoles[creep.memory.currentRole].run(creep);
        }
    }
}