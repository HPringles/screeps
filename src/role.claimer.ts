let config = require("./config")

export default {
  run: (creep: Creep) => {
    if (creep.room.name !== "W47S19") {
      creep.moveTo(config.targetRoomSpace.x, config.targetRoomSpace.y);
    } else {
      if (creep.claimController(creep.room.controller) !== 0) {
        creep.moveTo(creep.room.controller);
      }
    }

  }
}
