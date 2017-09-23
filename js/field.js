function Field(field){
    this.field = field;
    this.width = field[0].length;
    this.height = field.length;
}

Field.prototype.at = function(x, y){
    return this.field[y][x];
}
