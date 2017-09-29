function Item(object){
    this.data = object;
    if(! (object.number === undefined)){
        this.data["max_number"] = object.number;
    }
}

Item.prototype.get = function(s){
    return this.data[s];
};
