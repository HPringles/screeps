module.exports = {
    mapSafeMinionZone: {
        x: 21,
        y: 10
    },
    numAttackers: 1,
    numBuilders: 2,
    numDefenders: 0,
    numHarvesters: 0,
    numMiners: 3,
    numMinions: 4,
    numRubbishCollectors: 1,
    numUpgraders: 2,
    numUpkeepers: 1,
    numClaimers: 0,
    // tslint:disable-next-line:object-literal-sort-keys
    attackerConfig: [ATTACK , ATTACK, ATTACK, MOVE, MOVE, RANGED_ATTACK, TOUGH],
    rubbishCollectorConfig: [CARRY, CARRY, CARRY, CARRY, MOVE],
    builderConfig: [ WORK, CARRY, CARRY, MOVE],
    harvesterConfig: [WORK, CARRY, MOVE, MOVE],
    upgraderConfig: [WORK, CARRY, CARRY, MOVE],
    minerConfig: [WORK, WORK, WORK, CARRY, MOVE],
    minionConfig: [CARRY, CARRY, CARRY, CARRY, CARRY, MOVE],
    claimerConfig: [CLAIM, MOVE],
    targetRoomSpace: {
        x: 0,
        y: 14
    }
};
