module.exports = {
    /** @param {Game} Game - the game object
     *  @param {String} roleName - the role to search
    */
    getNumInRole: (Game, roleName) => {
        return _.filter(Game.creeps, (creep) => creep.memory.currentRole == roleName).length;
    }
}