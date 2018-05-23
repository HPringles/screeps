import {Scripts} from "./scripts";

module.exports.loop =  () => {
    Scripts.checkSpawn(Game);
    Scripts.tower(Game);

    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        Scripts.runCreep(creep);

    }
};
