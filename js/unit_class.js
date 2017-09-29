function UnitClass(object){
    this.name = object.name;
    this.next_class_id = object.next_class_id;
    this.special_move_cost = object.special_move_cost;
}

UnitClass.prototype.getMoveCost = function(geography_id){
    var n = this.special_move_cost;
    for(var i = 0; i < n; i++){
        var m = this.special_move_cost[i];
        if(m[0] == geography_id){
            return m[1];
        }
    }
    return -1;
};
