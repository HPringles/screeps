var scripts = require("scripts");


module.exports.loop = function () {
    scripts.checkSpawn(Game);

    
    scripts.tower.run(Game);

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        scripts.runCreep(creep);

    }
}