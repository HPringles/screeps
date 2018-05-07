const config = require("config")
export default {
    /** Places energy in container
     *  @param {creep} creep - the creep to place the energy
     *  @param {boolean} allowMove - boolean to determine whether the creep is allowed to move to place it.
     */
    placeInContainer: (creep: Creep, allowMove=true) => {
        var closestContainer: StructureContainer = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (struct: Structure) => {
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
     * Moves a creep to a targeted piece of energy and picks it up.
     * @param {creep} creep - the creep to move
     *
     */
    pickupDroppedEnergy: (creep: Creep, target: Resource) => {


        if(target) {
            if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else {
            creep.moveTo(config.mapSafeMinionZone.x, config.mapSafeMinionZone.y);
        }
    },
    /** Gets energy from a container
     *  @param {creep} - the creep that will collect energy
     */
    getFromContainer: (creep: Creep) => {
        var source: StructureContainer = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return(structure.structureType === STRUCTURE_CONTAINER) && structure.energy > 10;
            }
        });


        if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
}
