function Geography(object){
    this.name = object.name;
    this.image = object.image;
    this.default_cost = object.default_cost;
    this.recovery = 0;
    if(object.recovery !== undefined){
        this.recovery = object.recovery;
    }
    this.avoidance = 0;
    if(object.avoidance !== undefined){
        this.avoidance = object.avoidance;
    }
}
