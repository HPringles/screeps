import scripts from "./scripts";

export default {

    /** Runs the upgrader functionality
     *  @param {Creep} creep
     */

    run: (creep: Creep) => {

        if (creep.memory.upgrading && creep.carry.energy === 0) {
            creep.memory.upgrading = false;
            creep.say("🔄 harvest");
        }
        if (!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say("⚡ upgrade");
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        } else {
            const result: number = scripts.transferTypes.getFromContainer(creep);
            if (result === 0) {
                return true;
            }
            const resource = scripts.findDroppedEnergy(creep);
            if (resource && creep.pickup(resource) === ERR_NOT_IN_RANGE) {
                creep.moveTo(resource);
            }

        }

    }
};
