var roleUpgrader = require("role.upgrader")

var roleHarvester = {
    /** @param {Game} game 
     *  @param {creep} creep **/

    setup: function (Game, creep) {
        var spawnHarvesters = _.filter(Game.creeps, (creep) => creep.memory.currentRole == 'harvester' && creep.memory.harvestConfig && creep.memory.harvestConfig.targetType == "spawn");
        var extensionHarvesters = _.filter(Game.creeps, (creep) => creep.memory.currentRole == 'harvester' && creep.memory.harvestConfig && creep.memory.harvestConfig.targetType == "extension");
        
        console.log( "Extension Suppliers: " + extensionHarvesters)
        console.log("Spawn Suppliers: " + spawnHarvesters)
        if (!creep.memory.harvestConfig || extensionHarvesters.length < 2 || spawnHarvesters.length < 2) {

            targetType = null;
            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.currentRole == 'harvester');
            
            
            if (spawnHarvesters.length < harvesters/2) {
                targetType = "spawn"
            } else if (extensionHarvesters.length < harvesters.length/2) {
                targetType = "extension"
            } else {
                targetType = "spawn"
            }
            
            creep.memory.harvestConfig = {
                targetType : targetType
            }
        }
    },

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                if (creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}}) == ERR_NO_PATH) {
                    if (sources[1]){
                    if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                        if (creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}}) == ERR_NO_PATH) {
                            
                        }
                    }
                }
                }
            }
        }
        else {
            targetType = (creep.memory.harvestConfig.targetType == "spawn") ? STRUCTURE_SPAWN : STRUCTURE_EXTENSION
            var targets = creep.room.find(FIND_STRUCTURES, {
                

                    filter: (structure) => {
                        return (structure.structureType == targetType )
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                var targetFound = false
                target = 0
                while (!targetFound){
                    var resultOfTransfer = creep.transfer(targets[target], RESOURCE_ENERGY);
                    if(resultOfTransfer == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    } 
                    else if(resultOfTransfer == ERR_FULL) {
                        console.log("Spawn Full")
                        target++ 
                    } else {
                        targetFound = true;
                    }
                }
            }
        }
	}
};

module.exports = roleHarvester;