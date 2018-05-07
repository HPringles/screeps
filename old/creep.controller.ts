const creepRole = {
  miner: require("miner.role"),
//   minion: require("minion.role"),
//   builder: require("builder.role"),
//   upgrader: require("upgrader.role"),
//   rubbishCollector: require("rubbishCollector.role"),
//   upkeeper: require("upkeeper.role"),
}

const creepC = {
  init: () => {
    if(Memory.factoryIsInitialised === true)
      return;

    creepC.initMemory();
  },

  run: () => {
    if (Memory.thinking === false) return;

    creepC.processTick();
  },

  initMemory: () => {

  },

  processTick: () => {
    for (let i in Game.creeps) {
      let creep:Creep = Game.creeps[i];

      if (creep.memory.role && creepRole[creep.memory.role]) {
        creepRole[creep.memory.role].run({creep: creep})
      } else {
        console.log("undefined creep role: " + creep.memory.role + " on creep" + creep.name);
      }
    }
  },

  getRoleConfig: (role: string) => {
    return creepRole[role].config;
  }
}

export default creepC;
