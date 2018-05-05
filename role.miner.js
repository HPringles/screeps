module.exports = {
    reset: function(creep) {
        creep.drop(RESOURCE_ENERGY);
    },

    run: function(creep) {
        if (creep.carry.energy === creep.carryCapacity) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                

                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER )
                        structure.energy < structure.energyCapacity;
                }
            
                
            });
            creep.transfer(targets[0], RESOURCE_ENERGY);
        }





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