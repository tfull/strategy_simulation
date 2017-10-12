function Item(object){
    this.name = object.name;
    this.number = object.number;
    this.max_number = object.number;
}

Item.prototype.get = function(s){
    return this.data[s];
};
