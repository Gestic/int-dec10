var setup = new MODULES.creep.Setup();

setup.type = 'claimer';
setup.multiBody = [CLAIM, MOVE];
setup.fixedBody = [CLAIM, MOVE, CLAIM, MOVE];
setup.minAbsEnergyAvailable = 1300;
setup.maxMulti = 0;
setup.minControllerLevel = 4;
setup.globalMeasurement = true;
setup.multiplicationPartwise = false;

setup.minEnergyAvailable = function(){
    return 0.9;
}
setup.maxCount = function(spawn){
    return _.filter(Game.flags, function(flag){
        return flag.color == FLAG_COLOR.claim.color && 
            (!flag.room || 
            (!flag.room.controller.my || !flag.room.controller.reservation) || 
            flag.room.controller.reservation.ticksToEnd < 4000)}).length;
}
setup.maxWeight = function(spawn){
    return null; // TODO: limit regarding to missing reservation points
}
module.exports = setup;
