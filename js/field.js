function Field(field){
    this.field = field;
    this.width = field[0].length;
    this.height = field.length;
}

Field.prototype.at = function(x, y){
    return this.field[y][x];
};

Field.prototype.pointAt = function(p){
    return this.field[p.y][p.x];
};

Field.prototype.valid = function(x, y){
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
};

Field.prototype.clone = function(){
    var field = new Array(this.height);
    for(var i = 0; i < this.height; i++){
        field[i] = new Array(this.width);
        for(var j = 0; j < this.width; j++){
            field[i][j] = this.field[i][j];
        }
    }
    return field;
};
