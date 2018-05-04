var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleWallBreaker = require("role.wallbreaker"); 
var scripts = require("scripts");
var config = require("config")
module.exports.loop = function () {
    

    scripts.checkSpawn(Game);
    
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
        if(creep.memory.currentRole == 'wallbreaker') {
            roleWallBreaker.run(creep);
        }
    }
}