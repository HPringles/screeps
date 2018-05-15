import scripts from "./scripts";

export default {
    run: (creep: Creep) => {
        let target: Resource;
        target = scripts.findDroppedEnergy(creep);
        if (creep.carry.energy !== creep.carryCapacity && target) {
            scripts.transferTypes.pickupDroppedEnergy(creep, target);
        } else if (!target && creep.carry.energy === 0) {
            scripts.goToSafeZone(creep);
        } else {
            scripts.transferTypes.placeInContainer(creep, true);
        }
    }
};
