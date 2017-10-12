function Unit(object){
    this.name = object.name;
    this.image = object.image;
    this.unit_class = UnitClassData.find(object.unit_class_id);
    this.level = object.level;
    this.max_hit_point = object.hit_point;
    this.hit_point = object.hit_point;
    this.power = object.power;
    this.magic = object.magic;
    this.technique = object.technique;
    this.speed = object.speed;
    this.luck = object.luck;
    this.defense = object.defense;
    this.resist = object.resist;
    this.movement = object.movement;
    this.sword = object.sword;
    this.lance = object.lance;
    this.axe = object.axe;
    this.bow = object.bow;
    this.items = object.item_ids.map(function(id){ return ItemData.find(id); });
    this.equipment = false;
    if(this.items.length > 0 && this.items[0].constructor.name == "Weapon"){
        this.equipment = true;
    }
}

Unit.prototype.getMoveCost = function(geography_id){
    var cost = this.unit_class.getMoveCost(geography_id);
    if(cost == -1){
        return GeographyData.find(geography_id).default_cost;
    }else{
        return cost;
    }
};

Unit.prototype.getUsableWeapons = function(range = -1){
    var weapons = [];
    var n = this.items.length;
    for(var i = 0; i < n; i++){
        var item = this.items[i];
        if(item.constructor.name == "Weapon" && this.getWeaponLevel(item.type) >= item.level){
            if(range >= 0){
                if(item.reach(range)){
                    weapons.push(item);
                }
            }else{
                weapons.push(item);
            }
        }
    }
    return weapons;
};

Unit.prototype.getWeaponLevel = function(type){
    if(type == "sword"){
        return this.sword;
    }else if(type == "lance"){
        return this.lance;
    }else if(type == "axe"){
        return this.axe;
    }else if(type == "bow"){
        return this.bow;
    }
};

Unit.prototype.getAttackRange = function(){
    var weapons = this.getUsableWeapons();
    var range = weapons.map(function(weapon){
        if(! (weapon.target == "enemy" || weapon.target == "both")){
            return [];
        }
        return weapon.getRange(this);
    }).flatten().unique().sort(function(a, b){ return a - b; });
    return range;
};

Unit.prototype.getAvoidance = function(){
    return this.speed * 2 + this.luck;
};

Unit.prototype.getAccuracy = function(){
    return this.technique * 2 + this.luck;
};

Unit.prototype.getSpeed = function(){
    return this.speed;
};
