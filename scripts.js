const spawnScript = require("script.spawn");
const transferTypes = require("script.transferTypes");
const tower = require("script.tower");
module.exports = {
    /** Checks if there are enough spawned creeps for each role 
     * @param {Game} game - the game object */
    checkSpawn: function(Game) {
        spawnScript.run(Game)
    },
    runCreep: (creep) => {
        require("scripts.run").runCreep(creep);
    },
    transferTypes: transferTypes,
    /** Checks for dropped energy near to a creep
     *  @param {creep} creep - the creep to find resources */
    findDroppedEnergy: (creep) => {
        return creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
            filter: (resource) => {
                
                return ((resource.resourceType === RESOURCE_ENERGY))
            
            }})
    },
    /** Sends creep to the safe zone specified in the config file
     *  @param {creep} creep - the creep to send
     */
    goToSafeZone: (creep) => {
        creep.moveTo(config.mapSafeMinionZone.x, config.mapSafeMinionZone.y);
    },
    tower : tower,
}