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
            var container = Game.getObjectById("5aedf9a4d7b511312de0e510");
            if (container.hits <= 235000 && creep.memory.upkeep == true) {
                if(creep.repair(container) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});

                }
                return;
            }
            
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            

            if(targets.length) {
                
                
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                
                scripts.goToSafeZone(creep);
                // justHarvested = true;
            }
	    }
	    else {

            scripts.transferTypes.getFromContainer(creep);

            // var target = scripts.findDroppedEnergy(creep);
            
            // scripts.transferTypes.pickupDroppedEnergy(creep, target);
	    
	    }
	}
};

module.exports = roleBuilder;