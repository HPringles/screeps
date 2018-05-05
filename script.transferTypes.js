const transferTypes = {
    placeInContainer: (creep, allowMove=true) => {
        var closestContainer = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (struct) => {
                // console.log(struct.structureType)
                return ((struct.structureType === STRUCTURE_CONTAINER))
            
            }
        });
        if(closestContainer) {
            if (creep.transfer(closestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                if (allowMove) {
                    creep.moveTo(closestContainer)
                }
                
            }
        }
    },
    /** 
     * Moves a creep to a 
     * @param {creep} creep - the creep to move
     * 
     */
    pickupDroppedEnergy: (creep, target) => {

        
        if(target) {
            if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else {
            creep.moveTo(config.mapSafeMinionZone.x, config.mapSafeMinionZone.y);
        }
    },
}

module.exports = transferTypes;