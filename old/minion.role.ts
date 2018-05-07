module.exports = {
  config: {

  },

  init: (creep: Creep) => {
    if (!creep.memory.role) {
        console.log("Something is wrong, this isn't initialised");
    }

    console.log("Initialised new creep");
  },

  /** @param {Creep} creep **/
  run: (parameters: {creep: Creep}) => {
      this.think(parameters.creep);
  },

  think: (creep: Creep) => {
    if (_.sum(creep.carry) != creep.carryCapacity) {
      this.deposit(creep);
      return;
    }

    this.collect(creep);
  },

  collect: (creep: Creep) => {
    let container: Container = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {structure.structureType === STRUCTURE_CONTAINER && structure.energy > 10});
    if(container) {
      let collectResult: number = creep.withdraw(container, RESOURCE_ENERGY);

      if(collectResult === OK)
        return;
      else if (collectResult === ERR_NOT_IN_RANGE)
        creep.moveTo(container);
      else
        creep.say(collectResult.toString())
    }
  },

  deposit:
}
