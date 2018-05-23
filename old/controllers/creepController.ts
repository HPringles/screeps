

export class CreepController {
  public static creepRole: CreepTypes = {
    miner: new RoleMiner(),
    minion: new RoleMinion(),
    builder: newRoleBuilder()
  };

  public init(): CreepController | null {
    this.initMemory();
    console.log("init creepController memory");
    return this;
  }

  public run() {
    this.processTick();
  }

  private initMemory() {

  }

  private processTick() {
    for (let i in Game.creeps) {
      const creep = Game.creeps[i]

      if (creep.memory.role !== undefined && CreepController.creepRole[creep.memory.role] !== undefined) {
        CreepController.creepRole[creep.memory.role].run(creep);
      } else {
        console.log("creep role not set or incorrect on creep" + creep.name);
      }
    }
  }
}
