function Unit(name, image, unit_class, parameter, items){
    this.name = name;
    this.image = image;
    this.unit_class = unit_class;
    this.level = parameter.level;
    this.max_hit_point = parameter.hit_point;
    this.hit_point = parameter.hit_point;
    this.power = parameter.power;
    this.magic = parameter.magic;
    this.technique = parameter.technique;
    this.speed = parameter.speed;
    this.luck = parameter.luck;
    this.defense = parameter.defense;
    this.resist = parameter.resist;
    this.movement = parameter.movement;
    this.items = items;
    this.equipment = false;
    if(items.length > 0 && items[0].type == "weapon"){
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
