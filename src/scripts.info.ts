module.exports = {
    /** @param {Game} Game - the game object
     *  @param {String} roleName - the role to search
    */
    getNumInRole: (Game: Game, roleName: string) => {
        return _.filter(Game.creeps, (creep) => creep.memory.currentRole == roleName).length;
    }
}
