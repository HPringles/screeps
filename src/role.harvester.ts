export default {
    getTargetStructure: function(creep: Creep, structureType: string) {
        return creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (struct) => {

                return (struct.structureType === structureType && (struct.energy != struct.energyCapacity))
            }
        });



    },

    getTargetStorage: (creep: Creep) => {
        return creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (struct) => {

                return (struct.structureType === STRUCTURE_STORAGE && (struct.store.energy !== struct.storeCapacity));
            }
        });
    },

    getTarget: function (creep: Creep) {
        let extensions:StructureExtension[] = creep.room.find(FIND_STRUCTURES, {
            filter: (structure: Structure) => {
                return (structure.structureType === STRUCTURE_EXTENSION)
            }
        });

        let numFullExtensions:number = _.filter(extensions, (ext:StructureExtension) => {
            return (ext.energy === ext.energyCapacity);
        }).length;

        if (numFullExtensions !== extensions.length) {

            return this.getTargetStructure(creep, STRUCTURE_EXTENSION)
        }

        if (Game.spawns["Spawn1"].energy !== Game.spawns["Spawn1"].energyCapacity) {

            return Game.spawns["Spawn1"]
        }

        let towers:StructureTower[] = creep.room.find(FIND_STRUCTURES, {
            filter: (structure: Structure) => {
                return (structure.structureType === STRUCTURE_TOWER)
            }
        });

        const numFullTowers: number = _.filter(towers, (tower: StructureTower) => {
            return (tower.energy >= tower.energyCapacity * 0.8);

        }).length;

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
    run: (creep:Creep) => {
        console.log(creep)
    }
}
