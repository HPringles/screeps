import {Scripts} from "scripts";

let config = require("./config");

export class RoleAttacker {

  public static run(creep: Creep) {

    if (creep.room.name !== "W46S19") {
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

        }
      }

      Scripts.goToSafeZone(creep);
    }
  }
};
