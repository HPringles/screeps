var config = require("config");
var roleHarvester = require("role.harvester");
const scripts = require("scripts");
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var justHarvested = false;
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
            
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                
                
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                if (!creep.memory.harvesterConfig){
                    roleHarvester.setup(Game, creep)
                }
                creep.moveTo(config.mapSafeMinionZone.x, config.mapSafeMinionZone.y);
                // justHarvested = true;
            }
	    }
	    else if (!justHarvested) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                

                filter: (structure) => {
                   
                    return (structure.structureType === "container")
                }
            
                
            });


            if (creep.withdraw(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }

            // var target = scripts.findDroppedEnergy(creep);
            
            // scripts.transferTypes.pickupDroppedEnergy(creep, target);
	    
	    }
	}
};

module.exports = roleBuilder;