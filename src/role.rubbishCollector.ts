import {Scripts} from "./scripts";

export default {
    run: (creep: Creep) => {
        let target: Resource;
        target = Scripts.findDroppedEnergy(creep);
        if (creep.carry.energy !== creep.carryCapacity && target) {
            Scripts.transferTypes.pickupDroppedEnergy(creep, target);
        } else if (!target && creep.carry.energy === 0) {
            Scripts.goToSafeZone(creep);
        } else {
            Scripts.transferTypes.placeInContainer(creep, true);
        }
    }
};
