import scripts from "./scripts"


module.exports.loop = function () {
    scripts.checkSpawn(Game);


    scripts.tower(Game);

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        scripts.runCreep(creep);

    }
}
