function Point(x, y){
    this.x = x;
    this.y = y;
}

Point.prototype.sub = function(p){
    return new Point(this.x - p.x, this.y - p.y);
};
