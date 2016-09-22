var action = new Creep.Action('robbing');
action.maxPerTarget = 2;
/*action.isAddableTarget = function (target) {
    return true;//!target.my;
}*/
action.isValidAction = function(creep){
    return ( _.sum(creep.carry) < creep.carryCapacity && (FlagDir.find(FLAG_COLOR.invade.robbing, creep.pos, true) != null) );
};
action.isValidTarget = function(target){
    return ( target.store && _.sum(target.store) > 0 ) || ( target.energy && target.energy > 0 );
};  
action.newTarget = function(creep){
    let that = this;
    let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: function(structure){
            return that.isValidTarget(structure);// && that.isAddableTarget(structure); 
        }
    });
    return target;
};
action.work = function(creep){
    let ret = OK;
    if( creep.target.store ) {
        for( var type in creep.target.store ){
            if( creep.target.store[type] > 0  )
                ret = creep.withdraw(creep.target, type);
        }
    } else if ( creep.target.energy ) {
        ret = creep.withdraw(creep.target, 'energy');
    }
    return ret;
};
module.exports = action;
