export default {
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
        if (_.sum(creep.carry) >= creep.carryCapacity) {
            this.deposit(creep);
            return;
        }

        this.mine(creep);

        if (creep.memory.targetContainer)
            this.repairContainer(creep)
    },

    mine: (creep: Creep) => {
        let sources: {} = creep.room.find(FIND_SOURCES);
        let harvestResult: number = creep.harvest(sources[0])
        if (harvestResult === ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
        else if (harvestResult === OK){
            return true;
        }
        else {
            creep.say(harvestResult.toString());
        }
    },

    deposit: (creep: Creep) => {
        if (creep.memory.targetContainer === undefined) {
            this.findContainer(creep);
        }

        if(creep.memory.targetContainer === false) {
            creep.drop(RESOURCE_ENERGY);
        }
        else {
            let container: Container = Game.getObjectById(creep.memory.targetContainer)
            creep.transfer(container, RESOURCE_ENERGY);
        }

        if (Game.time % 50 && Memory.creep.targetContainer === false) {
            delete creep.memory.targetContainer;
            this.findContainer(creep);
        }
    },

    repairContainer: (creep: Creep) => {
        try {
            let container: Container = Game.getObjectById(creep.memory.targetContainer);
            if(container.hits < container.hitsMax / 10)
                creep.repair(container);
        } catch (ex) {

        }
    },

    findContainer: (creep: Creep) => {
        const containers: Container[] = creep.pos.findInRange(FIND_STRUCTURES, 1, {filter: {strucutreType: STRUCTURE_CONTAINER}})
        creep.memory.targetContainer = containers.length <= 0 ? false : containers[0].id;
    }
}
