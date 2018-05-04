var config = require("config")

var spawnScript = {

    /** @param {Game} game */

    run: function(Game) {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var builders =  _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var wallBreakers = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallbreaker');

        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        if(harvesters.length < config.numHarvesters) {
            var newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(config.harvesterConfig, newName, 
                {memory: {role: 'harvester', currentRole: 'harvester'}});        
        }

        if(wallBreakers.length < config.numTestWallBreakers) {
            var newName = 'WallBreaker' + Game.time;
            console.log('Spawning new wallbreaker: ' + newName);
            console.log(Game.spawns['Spawn1'].spawnCreep(config.testWallBreakerConfig, newName, 
                {memory: {role: 'wallbreaker', currentRole: 'wallbreaker'}}));        
        }
        
        if(upgraders.length < config.numUpgraders) {
            var newName = 'Upgrader' + Game.time;
            console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(config.upgraderConfig, newName, 
                {memory: {role: 'upgrader', currentRole: 'upgrader'}});        
        }
        if(builders.length < config.numBuilders) {
            var newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(config.builderConfig, newName, 
                {memory: {role: 'builder', currentRole: "builder"}});        
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

module.exports = spawnScript;