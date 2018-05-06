const roles = {
    miner: require("role.miner"),
    minion: require("role.minion"),
    rubbishCollector: require("role.rubbishCollector"),
    upgrader: require("role.rubbishCollector"),
    builder: require("role.builder")
}

module.exports = {
    init: () => {

    },

    run: () => {
        this.processTick();
    },

    processTick: () => {
        for (let i in Game.creeps) {
            let creep = Game.creeps[i];

            if (creep.memory.role && roles[creep.memory.role]) {
                roles[creep.memory.role].run(creep);
            } else {
                console.log("No Creep Role for creep: " + creep.name + ", " + creep.memory.role)
            }
        }
    }
}

Creep.prototype.goToSafeZone = (safeZoneObj) => {
    creep.moveTo(safeZoneObj.x, safeZoneObj.y);
}