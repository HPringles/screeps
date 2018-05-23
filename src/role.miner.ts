import {Scripts} from "./scripts";

export default {
    reset: (creep) => {
        creep.drop(RESOURCE_ENERGY);
    },

    run: (creep: Creep) => {

    if (/*false*/creep.carry.energy === creep.carryCapacity) {

            const result = Scripts.transferTypes.placeInContainer(creep, false);
            if (result === 1) {
                creep.drop(RESOURCE_ENERGY);
            }
            // creep.drop(RESOURCE_ENERGY);

        } else {
            var sources: Source[] = creep.room.find(FIND_SOURCES);
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
