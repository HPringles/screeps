let config = require("./config");

export default {
  run: (creep: Creep) => {
    if (creep.room.name !== "W47S19") {
      creep.moveTo(config.targetRoomSpace.x, config.targetRoomSpace.y);
    } else {
      for (let i in Game.flags) {

        if (Game.flags[i].color === 1) {

          let targets: Structure[] = Game.flags[i].pos.lookFor(LOOK_STRUCTURES)
          targets = _.filter(targets, (target) => {
            return (target.structureType === STRUCTURE_RAMPART || target.structureType === STRUCTURE_TOWER ||
               target.structureType === STRUCTURE_CONTAINER || target.structureType === STRUCTURE_WALL ||
                target.structureType === STRUCTURE_SPAWN);
          })


          if (creep.attack(targets[0]) === ERR_NOT_IN_RANGE ) {
            return creep.moveTo(targets[0]);
          }

        } else if (Game.flags[i].color === 2) {
          console.log(creep.attackController(creep.room.controller));
          if (creep.attackController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            return creep.moveTo(creep.room.controller);
          }
        }
      }
    }
  }
};
