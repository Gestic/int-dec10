var behaviour = new MODULES.creep.Behaviour();

behaviour.run = function(creep) {
    var assignment;
    if( creep.room.situation.invasion )
        assignment = this.assignAction(creep, MODULES.creep.action.healing);
    else {
        var flag = _.find(Game.flags, FLAG_COLOR.destroy.filter) || _.find(Game.flags, FLAG_COLOR.invade.filter);
        if( flag ) 
            assignment = this.assignAction(creep, MODULES.creep.action.settling, flag);
        else {
            assignment = this.assignAction(creep, MODULES.creep.action.healing);
            if(!assignment)
                assignment = this.assignAction(creep, MODULES.creep.action.guarding);
        }
    }
    if( !assignment ) this.assignAction(creep, MODULES.creep.action.idle);
    
    if( creep.action ) creep.action.step(creep);
};

module.exports = behaviour;