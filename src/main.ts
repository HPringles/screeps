import scripts from "./scripts";

module.exports.loop =  () => {
    scripts.checkSpawn(Game);
    scripts.tower(Game);

    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        scripts.runCreep(creep);

    }
};
