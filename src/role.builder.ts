import roleUpgrader from "./role.upgrader";
import {Scripts} from "./scripts";

export default {

    /** @param {Creep} creep **/
    run: function (creep: Creep) {
        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if (creep.memory.building) {
            var container: StructureContainer = Game.getObjectById("5aedf9a4d7b511312de0e510");
            if (container && container.hits <= 235000 && creep.memory.upkeep === true) {
                if (creep.repair(container) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, { visualizePathStyle: { stroke: '#ffffff' } });

                }
                return;
            }

            var targets: ConstructionSite[] = creep.room.find(FIND_CONSTRUCTION_SITES);


            if (targets.length) {


                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {

                roleUpgrader.run(creep);
                // justHarvested = true;
            }
        } else {
            const result: number = Scripts.transferTypes.getFromContainer(creep);
            if (result === 0) {
                return true;
            }
            const resource = Scripts.findDroppedEnergy(creep)
            if (resource && creep.pickup(resource) === ERR_NOT_IN_RANGE) {
                creep.moveTo(resource);
            }

            // var target = Scripts.findDroppedEnergy(creep);

            // Scripts.transferTypes.pickupDroppedEnergy(creep, target);

        }
    }
};
