const creepC = require("creep.controller");

module.exports = {
    init: () => {
        if (Memory.factoryIsInitialised === true)
            return;
        
        console.log("Initalising memory");

        this.initMemory();
    },

    run: () => {
        this.processTick;
    },

    initMemory: () => {
        Memory.capacities = {
            miner: 3,
            minion: 3,
            builder: 2,
            upkeeper: 1,
            rubbishCollector: 1,
            upgrader: 1,
        }

        Memory.factories = {};
        Memory.factoryIsInitialised = true;

    },

    processTick: () => {
        for (let i in Game.spawns) {
            if (Game.time % 50) this.evaluateRequirements(Game.spawns[i]);

            this.processSpawnQueue(Game.spawns[i]);
        }
    },

    evaluateRequirements: (spawn) => {

        let live = {
            miners:  _.filter(Game.creeps, (creep) => creep.memory.role === 'miner').length,
            minions: _.filter(Game.creeps, (creep) => creep.memory.role === 'minion').length,
            builders:  _.filter(Game.creeps, (creep) => creep.memory.role === 'builder' && !creep.memory.upkeep).length,
            upkeepers: _.filter(Game.creeps, (creep) => creep.memory.role === 'builder' && creep.memory.upkeep).length,
            rubbishCollectors = _.filter(Game.creeps, (creep) => creep.memory.role === 'rubbishCollector').length,
            upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader').length
        }

        let liveMiners = _.filter(Game.creeps, (creep) => creep.memory.role === 'miner').length;
        let liveMinions = _.filter(Game.creeps, (creep) => creep.memory.role === 'minion').length;
        let liveBuilders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder' && !creep.memory.upkeep).length;
        let liveUpkeepers = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder' && creep.memory.upkeep).length;
        let liveRubbishCollectors = _.filter(Game.creeps, (creep) => creep.memory.role === 'rubbishCollector').length;
        let liveUpgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader').length;

        let queued = {
            miners: 0,
            minions: 0,
            builders: 0,
            upkeepers: 0,
            rubbishCollectors: 0,
            upgraders: 0
        };

        if (spawn.memory.spawnQueue) {

            queued = {
                miners:  _.filter(Game.creeps, (creep) => item === 'miner').length,
                minions: _.filter(Game.creeps, (creep) => item === 'minion').length,
                builders:  _.filter(Game.creeps, (creep) => item === 'builder' && !creep.memory.upkeep).length,
                upkeepers: _.filter(Game.creeps, (creep) => item === 'builder' && creep.memory.upkeep).length,
                rubbishCollectors = _.filter(Game.creeps, (creep) => item === 'rubbishCollector').length,
                upgraders = _.filter(Game.creeps, (creep) => item === 'upgrader').length
            }

            

        }

        for (let i in live) {
            if ((live[i] + queued[i]) < Memory.capacities[i]) {
                spawn.EnqueueSpawn(i)
            }
        }

        
    
    }
}