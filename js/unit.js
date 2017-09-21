function Unit(name, type, level, parameter, weapons){
    this.type = type;
    this.level = level;
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
