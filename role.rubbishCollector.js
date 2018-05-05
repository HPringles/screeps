const scripts = require("scripts")
var config = require("config");


const rubbishCollectorV2 = {
    run: (creep) => {
        var target = scripts.findDroppedEnergy(creep)
        if(creep.carry.energy != creep.carryCapacity && target) {
            scripts.transferTypes.pickupDroppedEnergy(creep, target)
        } else if (!target && creep.carry.energy != 0) {
            scripts.goToSafeZone(creep);
        } 
        
        else {
            scripts.transferTypes.placeInContainer(creep, true);
        }
    }
}



module.exports = rubbishCollectorV2;