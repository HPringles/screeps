var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var scripts = require("scripts");
var config = require("config")
module.exports.loop = function () {
    

    scripts.checkSpawn(Game);

    if(!Game.getObjectById("59f1a01c82100e1594f36134").safeMode) {
        Game.getObjectById("59f1a01c82100e1594f36134").activateSafeMode()
    }
    
    var tower = null;
    
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.currentRole == 'harvester') {
            if (!creep.memory.harvesterConfig){
                roleHarvester.setup(Game, creep)
            }
            roleHarvester.run(creep);
        }
        if(creep.memory.currentRole == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.currentRole == 'builder') {
            roleBuilder.run(creep)
        }

    }
}