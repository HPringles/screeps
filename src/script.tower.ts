
    /** Gets all towers in the game and runs the runTower function for each of them
     *  @param {Game} game - the game object
    */
    export default function run(Game: Game) {
        var towers: Structure[] = _.filter(Game.structures, (structure: Structure) => structure.structureType == STRUCTURE_TOWER);

        towers.forEach((tower: StructureTower) => {
            runTower(tower)
        })
    }
    function runTower(tower: Tower) {
        if(tower) {
            var closestHostile: Creep = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

            var closestDamagedStructure: Structure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => ((Game.time % 50 === 0 && structure.structureType === STRUCTURE_CONTAINER) || structure.hits < (structure.hitsMax*0.0003))
            });

            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }

            if(closestHostile) {
                console.log(tower.attack(closestHostile));
            }


        }
    }
