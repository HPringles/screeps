module.exports = function (Game, x, y) {
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        creep.moveTo(x,y);
    }
}