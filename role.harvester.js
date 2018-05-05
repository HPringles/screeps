var roleUpgrader = require("role.upgrader")

var roleHarvester = {
    /** @param {Game} game 
     *  @param {creep} creep **/

    setup: function (Game, creep) {
        var spawnHarvesters = _.filter(Game.creeps, (creep) => creep.memory.currentRole == 'harvester' && creep.memory.harvestConfig && creep.memory.harvestConfig.targetType == "spawn");
        var extensionHarvesters = _.filter(Game.creeps, (creep) => creep.memory.currentRole == 'harvester' && creep.memory.harvestConfig && creep.memory.harvestConfig.targetType == "extension");
        var towerHarvesters = _.filter(Game.creeps, (creep) => creep.memory.currentRole == 'harvester' && creep.memory.harvestConfig && creep.memory.harvestConfig.targetType == "tower");
        var towers = _.filter(Game.structures, (struct) => struct.structureType === STRUCTURE_TOWER)
        if (!creep.memory.harvestConfig || extensionHarvesters.length < 2 || spawnHarvesters.length < 2) {

            targetType = null;
            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.currentRole == 'harvester');
            
            if (towers.length && towerHarvesters.length < harvesters.length/3){
                targetType = "tower"
            }
            else if (spawnHarvesters.length < harvesters/3) {
                targetType = "spawn"
            } else if (extensionHarvesters.length < harvesters.length/3) {
                targetType = "extension"
            } else {
                targetType = "extension"
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
                if (creep.moveTo(sources[0]) == ERR_NO_PATH) {
                    if (sources[1]){
                    if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                        if (creep.moveTo(sources[0]) == ERR_NO_PATH) {
                            
                        }
                    }
                }
                }
            }
        }
        else {
            targetType = (creep.memory.harvestConfig.targetType == "spawn") ? STRUCTURE_SPAWN : (creep.memory.harvestConfig.targetType == "extension") ? STRUCTURE_EXTENSION : STRUCUTRE_TOWER
            var targets = creep.room.find(FIND_STRUCTURES, {
                

                    filter: (structure) => {
                        return (structure.structureType == targetType )
                            structure.energy < structure.energyCapacity;
                    }
            });

            if (!targets.length) {
                targets = creep.room.find(FIND_STRUCTURES, {
                

                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCUTRE_TOWER )
                            structure.energy < structure.energyCapacity;
                    }
            });
            }

            for (var target in targets) {
                if (targets[target].energyCapacity == targets[target].energy) {
                    targets.splice(target, 1);
                }
            }


            if(targets.length > 0) {
                var targetFound = false
                target = 0
                

                while (!targetFound){
                    if (!targets[target]) {
                        
                        targetFound = true;
                    }
                    var resultOfTransfer = creep.transfer(targets[target], RESOURCE_ENERGY);
                    if(resultOfTransfer == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[target]);
                        targetFound = true;
                    } 
                    else if(resultOfTransfer == ERR_FULL) {
                        
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