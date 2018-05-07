/* 
    Usage - require("scripts.commands").<functionname>(<@params>)
    E.G : 
            require("scripts.commands").assignCurrentRoleToRole(Game, 'builder', 'harvester')
*/

module.exports = {

    /** @param {Game} game - the game object
     *  @param {String} roleToAssignTo - The role to which a new currentRole will be assigned
     *  @param {string} roleToAssign - The role that the creep will gain as it's new current role
     */

    assignCurrentRoleToRole: function(Game, roleToAssignTo, roleToAssign) {
        creepsToChange = _.filter(Game.creeps, (creep) => creep.memory.role == roleToAssignTo);
        if (creepsToChange.length) {
            creepsToChange.forEach(function(creep) {
                creep.memory.currentRole = roleToAssign;
                return true;
            })
        } else return false;
        

    },

    /** @param {Game} game - the game object
     *  @param {String} roleToAssignTo - The group  to which a new currentRole will be assigned
     *  @param {string} roleToAssign - The role that the creep will gain as it's new current role
     */

    assignCurrentRoleToGroup: function(Game, groupToAssignTo, roleToAssign) {
        creepsToChange = _.filter(Game.creeps, (creep) => creep.memory.group == groupToAssignTo);
        if (creepsToChange.length) {
            creepsToChange.forEach(function(creep) {
                creep.memory.currentRole = roleToAssign;
                return true;
            })
        } else return false;
    },

    /** @param {Game} game - the game object
     *  @param {String} roleToAssignTo - The role to which a new group will be assigned
     *  @param {string} roleToAssign - The group that the creep will be part of
     */

    assignRoleToGroup: function(Game, roleToAssignTo, groupToAssign) {
        creepsToChange = _.filter(Game.creeps, (creep) => creep.memory.role == roleToAssignTo);
        if (creepsToChange.length) {
            creepsToChange.forEach(function(creep) {
                creep.memory.group = groupToAssign;
                return true;
            })
        } else return false;
    },

    /** @param {Game} game - The game object
     *  @param {string} homeFlag - the flag that is the home
     *  @param {string} groupToSend - the group you wish to send home
     */
    sendGroupHome: function(Game, homeFlag='HomePoint', groupToSend) {
        creepsToSend = _.filter(Game.creeps, (creep) => creep.memory.group === groupToSend);
        if (creepsToSend.length) {
            creepsToSend.forEach(function (creep) {
                creep.memory.moveOverridePoint = Game.flags[homeFlag];
                creep.memory.currentRole = "move_override";
            })
        }
    }

    

}