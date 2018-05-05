const spawnScript = require("script.spawn");
const transferTypes = require("script.transferTypes");
module.exports = {
    checkSpawn: function(Game) {
        spawnScript.run(Game)
    },
    transferTypes: transferTypes,
    findDroppedEnergy: (creep) => {
        return creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
            filter: (resource) => {
                
                return ((resource.resourceType === RESOURCE_ENERGY))
            
            }})
    },
    goToSafeZone: (creep) => {
        creep.moveTo(config.mapSafeMinionZone.x, config.mapSafeMinionZone.y);
    }
}