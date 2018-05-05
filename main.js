var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require("role.miner");
var roleMinion = require("role.minion");
var scripts = require("scripts");
var config = require("config")
module.exports.loop = function () {
    

    scripts.checkSpawn(Game);

    if(!Game.getObjectById("59f1a01c82100e1594f36134").safeMode) {
        Game.getObjectById("59f1a01c82100e1594f36134").activateSafeMode()
    }
    
    var tower = Game.getObjectById("5aeda00fc1b95d38f405ec15");
    
    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

        if(closestHostile) {
            console.log(tower.attack(closestHostile));
        }
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < (structure.hitsMax*0.003)
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
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
        if (creep.memory.currentRole == 'miner') {
            roleMiner.run(creep);
        }
        if (creep.memory.currentRole == 'minion') {
            roleMinion.run(creep);
        }

    }
}