
    /** Gets all towers in the game and runs the runTower function for each of them
     *  @param {Game} game - the game object
     */
    export default function run(Game: Game) {
        const towers: Structure[] = _.filter(Game.structures, (structure: Structure) =>
            structure.structureType === STRUCTURE_TOWER);

        towers.forEach((tower: StructureTower) => {
            runTower(tower);
        });
    }
    function runTower(tower: Tower) {
        if (tower) {
            const closestHostile: Creep = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

            const closestDamagedStructure: Structure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => ((Game.time % 49 === 0 && structure.structureType === STRUCTURE_CONTAINER)
                    || (Game.time % 10 === 0 && structure.structureType === STRUCTURE_RAMPART
                        && Memory.lastRepairedRampart.indexOf(structure.id) === -1)
                    || structure.hits < (structure.hitsMax * 0.000003)) ||
                    (structure.structureType === STRUCTURE_ROAD && structure.hits < structure.hitsMax * 0.5)
            });

            const ramparts = tower.room.find(FIND_STRUCTURES, {
                filter: (struct) => (struct.structureType === STRUCTURE_RAMPART)
            })

            if (closestDamagedStructure && !closestHostile) {
                tower.repair(closestDamagedStructure);
                if (closestDamagedStructure.structureType === STRUCTURE_RAMPART) {
                    Memory.lastRepairedRampart.push(closestDamagedStructure.id)
                    if (Memory.lastRepairedRampart.length === ramparts.length) {
                        Memory.lastRepairedRampart.shift();
                    }
                }

            }

            if (closestHostile) {
                console.log(tower.attack(closestHostile));
            }
        }
    }
