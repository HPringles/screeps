const towerScript = {
    /** Gets all towers in the game and runs the runTower function for each of them 
     *  @param {Game} game - the game object
    */
    run: (Game) => {
        var towers = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_TOWER);

        towers.forEach((tower) => {
            towerScript.runTower(tower)
        })
    },
    runTower: (tower) => {
        if(tower) {
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    
            if(closestHostile) {
                tower.attack(closestHostile);
            }
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => (structure.structureType === STRUCTURE_CONTAINER) || structure.hits < (structure.hitsMax*0.0003)
            });
            
            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }
            
        }
    }
}

module.exports = towerScript;