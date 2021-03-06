import {Scripts} from "./scripts";

export default {

    getTargetStructure: function(creep: Creep, structureType: string) {

        return creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (struct) => {

                return (struct.structureType === structureType && (struct.energy != struct.energyCapacity))
            }
        });



    },

    getTargetStorage: (creep: Creep) => {
        return creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (struct) => {

                return (struct.structureType === STRUCTURE_STORAGE && (struct.store.energy !== struct.storeCapacity));
            }
        });
    },

    getTarget: function (creep: Creep) {
        let extensions: StructureExtension[] = creep.room.find(FIND_STRUCTURES, {
            filter: (structure: Structure) => {
                return (structure.structureType === STRUCTURE_EXTENSION)
            }
        });

        let towers: StructureTower[] = creep.room.find(FIND_STRUCTURES, {
            filter: (structure: Structure) => {
                return (structure.structureType === STRUCTURE_TOWER)
            }
        });

        const numFullTowers: number = _.filter(towers, (tower: StructureTower) => {
            return (tower.energy >= tower.energyCapacity * 0.8);

        }).length;

        if (numFullTowers !== towers.length && creep.memory.tower) {
            return (this.getTargetStructure(creep, STRUCTURE_TOWER));
        }

        let numFullExtensions:number = _.filter(extensions, (ext:StructureExtension) => {
            return (ext.energy === ext.energyCapacity);
        }).length;

        if (numFullExtensions !== extensions.length) {

            return this.getTargetStructure(creep, STRUCTURE_EXTENSION)
        }

        if (Game.spawns["Spawn1"].energy !== Game.spawns["Spawn1"].energyCapacity) {

            return Game.spawns["Spawn1"]
        }




        if (numFullTowers !== towers.length) {
            return this.getTargetStructure(creep, STRUCTURE_TOWER);
        }
        let storageUnits: StructureStorage[] = creep.room.find(FIND_STRUCTURES, {
            filter: (structure: Structure) => {
                return (structure.structureType === STRUCTURE_STORAGE);
            }
        });

        const fullStorageUnits:number = _.filter(storageUnits, (unit:StructureStorage) => {
            return (unit.store.energy === unit.storeCapacity);
        }).length;

        if (storageUnits.length !== fullStorageUnits) {

            return this.getTargetStorage(creep);
        }
    },
    run: function(creep: Creep) {

        if (creep.memory.doing === undefined) {
            creep.memory.doing = true;
        }

        if (creep.carry.energy === 0 && creep.memory.doing) {
            creep.memory.doing = false;
        }

        if (creep.carry.energy === creep.carryCapacity && !creep.memory.doing) {
            creep.memory.doing = true;
        }

        if (creep.carry.energy < creep.carryCapacity && !creep.memory.doing) {

            var targets: Structure[] = creep.room.find(FIND_STRUCTURES, {


                filter: (structure) => {

                    return (structure.structureType === STRUCTURE_CONTAINER ) && (structure.energy !== 0);
                }


            });
            if (targets.length === 0) {
                const resource = Scripts.findDroppedEnergy(creep);
                if(resource) {
                    if (creep.pickup(resource) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(resource);
                        return;
                    }
                }
            }
            if (creep.withdraw(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        } else {
            var target:Structure = this.getTarget(creep);
            var transOutcome = creep.transfer(target, RESOURCE_ENERGY)
            if(transOutcome == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            } else if (!transOutcome) {
                // console.log("Supplied Energy to: " + target.structureType + ", " + target.id)
            }
        }
    }
}
