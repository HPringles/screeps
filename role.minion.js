module.exports = {
    run: function(creep) {

        if (creep.carry.energy == 0) {

            var targets = creep.room.find(FIND_STRUCTURES, {
                

                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER )
                        structure.energy > creep.CarryCapacity/2;
                }
            
                
            });
            if (creep.withdraw(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        } else {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_TOWER || structure.structureType ===  STRUCTURE_EXTENSION) && structure.energy != structure.energyCapacity
                }
            });

            
            var transOutcome = creep.transfer(target, RESOURCE_ENERGY)
            if(transOutcome == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
}