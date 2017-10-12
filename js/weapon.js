function Weapon(object){
    this.name = object.name;
    this.type = object.type;
    this.attribute = object.attribute;
    this.target = object.target;
    this.power = object.power;
    this.range = object.range;
    this.accuracy = object.accuracy;
    this.level = object.level;
    this.number = object.number;
    this.max_number = object.max_number;
}

Weapon.prototype.invincible = function(){
    return this.number === undefined;
};

Weapon.prototype.reach = function(distance){
    if(typeof(this.range) == "number"){
        return this.range == distance;
    }else{
        return this.range[0] <= distance && this.range[1] >= distance;
    }
};

Weapon.prototype.getRange = function(unit = null){
    if(typeof(this.range) == "number"){
        return [this.range];
    }else{
        var a = [];
        for(var i = this.range[0]; i <= this.range[1]; i++){
            a.push(i);
        }
        return a;
    }
};
