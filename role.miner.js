const scripts = require("scripts");

module.exports = {
    reset: function(creep) {
        creep.drop(RESOURCE_ENERGY);
    },

    run: function(creep) {
        
    if (/*false*/creep.carry.energy == creep.carryCapacity) {
        
            scripts.transferTypes.placeInContainer(creep, false)
            // creep.drop(RESOURCE_ENERGY);
            
        } else {
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
    }





        
}