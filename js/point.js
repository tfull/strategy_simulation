function Point(x, y){
    this.x = x;
    this.y = y;
}

Point.prototype.equal = function(p){
    return this.x == p.x && this.y == p.y;
};

Point.prototype.sub = function(p){
    return new Point(this.x - p.x, this.y - p.y);
};

Point.prototype.clone = function(){
    return new Point(this.x, this.y);
};

Point.prototype.distance = function(p){
    return Math.abs(this.x - p.x) + Math.abs(this.y - p.y);
};
