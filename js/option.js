function Option(choices, index = 0){
    this.size = choices.length;
    this.choices = choices;
    this.index = index;
}

Option.prototype.getValue = function(){
    return this.choices[this.index];
};

Option.prototype.up = function(){
    this.index = (this.index + 1) % this.size;
};

Option.prototype.down = function(){
    this.index = (this.index + this.size - 1) % this.size;
};

Option.prototype.list = function(){
    var result = [];
    for(var i = 0; i < this.size; i++){
        result.push({ selected: i == this.index, value: this.choices[i] });
    }
    return result;
};
