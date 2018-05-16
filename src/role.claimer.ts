let config = require("./config")

export default {
  run: (creep: Creep) => {
    if (creep.room.name !== "W47S19") {
      creep.moveTo(config.targetRoomSpace.x, config.targetRoomSpace.y);
    } else {
      if (creep.claimController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      } else {
        creep.attackController(creep.room.controller)
      }
    }

  }
};
