var roleHarvester = require("role.harvester")
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
                roleHarvester.run(creep);
                console.log(creep.name + ": No work , harvesting")
                // creep.say("harvesting")
                justHarvested = true;
            }
	    }
	    else if (!justHarvested) {
	        var sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return(structure.structureType === STRUCTURE_CONTAINER)
                        structure.energy > 10;
                }
            });
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
	}
};

module.exports = roleBuilder;