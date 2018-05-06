module.exports = {
    mapSafeMinionZone: {
        x: 21,
        y: 10
    },
    numBuilders: 2,
    numHarvesters: 0,
    numUpgraders: 3,
    numMiners: 3,
    numMinions: 3,
    numUpkeepers: 1,
    numRubbishCollectors: 1,
    rubbishCollectorConfig: [CARRY, CARRY, CARRY, CARRY, MOVE],
    builderConfig: [WORK, WORK, CARRY, CARRY, MOVE],
    harvesterConfig: [WORK,CARRY, MOVE, MOVE],
    upgraderConfig: [WORK,CARRY,CARRY, MOVE],
    minerConfig: [WORK, WORK, CARRY, MOVE],
    minionConfig: [WORK, CARRY, CARRY, CARRY, MOVE],
}