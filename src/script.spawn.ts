var config = require("config")

export default {

    /** @param {Game} game */

    run: function(Game: Game) {
        if (Game.spawns["Spawn1"].spawning) {
            return;
        }

        var harvesters: Creep[] = _.filter(Game.creeps, (creep) =>
            creep.memory.role === 'harvester');
        var miners: Creep[] = _.filter(Game.creeps, (creep) =>
            creep.memory.role === 'miner');
        var minons: Creep[] = _.filter(Game.creeps, (creep) =>
            creep.memory.role === 'minion');
        var builders: Creep[] =  _.filter(Game.creeps, (creep) =>
            creep.memory.role === 'builder' && !creep.memory.upkeep);
        var upkeepers: Creep[] =  _.filter(Game.creeps, (creep) =>
            creep.memory.role === 'builder' && creep.memory.upkeep == true);
        var upgraders: Creep[] = _.filter(Game.creeps, (creep) =>
            creep.memory.role === 'upgrader');
        var rubbishCollectors: Creep[] = _.filter(Game.creeps, (creep) =>
            creep.memory.role === 'rubbishCollector');
        var attackers: Creep[] = _.filter(Game.creeps, (creep) =>
        creep.memory.role === 'attacker');
        var claimers: Creep[] = _.filter(Game.creeps, (creep) =>
        creep.memory.role === 'claimer');

        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        if(harvesters.length < config.numHarvesters) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            return Game.spawns['Spawn1'].spawnCreep(config.harvesterConfig, newName,
                {memory: {role: 'harvester', currentRole: 'harvester'}});
        }

        if(miners.length < config.numMiners) {
            var newName = 'Miner' + Game.time;
            console.log('Spawning new miner: ' + newName);
            return Game.spawns['Spawn1'].spawnCreep(config.minerConfig, newName,
                {memory: {role: 'miner', currentRole: 'miner'}});
        }

        if(minons.length < config.numMinions) {
            var newName = 'Minion' + Game.time;
            console.log('Spawning new minion: ' + newName);
            return Game.spawns['Spawn1'].spawnCreep(config.minionConfig, newName,
                {memory: {role: 'minion', currentRole: 'minion'}});
        }

        if(upgraders.length < config.numUpgraders) {
            var newName = 'Upgrader' + Game.time;
            console.log('Spawning new upgrader: ' + newName);
            return Game.spawns['Spawn1'].spawnCreep(config.upgraderConfig, newName,
                {memory: {role: 'upgrader', currentRole: 'upgrader'}});
        }

        if(attackers.length < config.numAttackers) {
            var newName = 'Attacker' + Game.time;
            console.log('Spawning new attacker: ' + newName);
            return Game.spawns['Spawn1'].spawnCreep(config.attackerConfig, newName,
                {memory: {role: 'attacker', currentRole: 'attacker'}});
        }

        if(claimers.length < config.numClaimers) {
            var newName = 'Claimer' + Game.time;
            console.log('Spawning new claimer: ' + newName);
            return Game.spawns['Spawn1'].spawnCreep(config.claimerConfig, newName,
                {memory: {role: 'claimer', currentRole: 'claimer'}});
        }

        if(upkeepers.length < config.numUpkeepers) {
            var newName = 'Upkeeper' + Game.time;
            console.log('Spawning new upkeeper: ' + newName);
            return Game.spawns['Spawn1'].spawnCreep(config.builderConfig, newName,
                {memory: {role: 'builder', currentRole: "builder", upkeep:true}});
        }

        if(builders.length < config.numBuilders) {
            var newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            return Game.spawns['Spawn1'].spawnCreep(config.builderConfig, newName,
                {memory: {role: 'builder', currentRole: "builder"}});
        }

        if(rubbishCollectors.length < config.numRubbishCollectors) {
            var newName = 'RubbishCollector' + Game.time;
            console.log('Spawning new rubbish collector: ' + newName);
            return Game.spawns['Spawn1'].spawnCreep(config.rubbishCollectorConfig, newName,
                {memory: {role: 'rubbishCollector', currentRole: 'rubbishCollector'}});
        }



        if(Game.spawns['Spawn1'].spawning) {
            var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
            Game.spawns['Spawn1'].room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                {align: 'left', opacity: 0.8});
        }
    }
}
