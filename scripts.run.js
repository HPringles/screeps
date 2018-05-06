var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require("role.miner");
var roleMinion = require("role.minion");
var roleRubbishCollector = require("role.rubbishCollector");

module.exports = {
    runCreep: (creep) => {
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
        if (creep.memory.currentRole == 'rubbishCollector') {
            roleRubbishCollector.run(creep);
        }
    }
}