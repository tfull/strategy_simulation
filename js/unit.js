function Unit(name, image, unit_class, parameter, weapons){
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
    this.weapons = weapons;
}
