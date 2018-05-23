import spawnScript from "./script.spawn"
import transferTypes from "./script.transferTypes";
import runTower from "./script.tower";
import {runCreep} from "./scripts.run";
const config = require("config");
export class Scripts {
    /** Checks if there are enough spawned creeps for each role
     * @param {Game} game - the game object
     */
    public static checkSpawn(Game: Game) {
        spawnScript.run(Game);
    }
    public static runCreep(creep: Creep) {
        runCreep(creep);
    }
    public static get transferTypes() {return transferTypes;}

    /** Checks for dropped energy near to a creep
     *  @param {creep} creep - the creep to find resources
     */
    public static findDroppedEnergy(creep: Creep) {

        var resource:Resource =  creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
            filter: (resource) => {

                return ((resource.resourceType === RESOURCE_ENERGY))

            }})

            return resource
    }
    /** Sends creep to the safe zone specified in the config file
     *  @param {creep} creep - the creep to send
     */
    public static goToSafeZone(creep: Creep) {
        creep.moveTo(config.mapSafeMinionZone.x, config.mapSafeMinionZone.y);
    }

    public static get tower() { return runTower; }
}
