function Key(){
    this.names = ["up", "down", "left", "right", "space", "a", "b"];
    this.keys = {};
    for(var i = 0; i < this.names.length; i++){
        this.keys[this.names[i]] = 0;
    }
    this.filters = {};
    this.filters["normal"] = function(n){
        if(n < 12){
            return n == 1;
        }else if(n < 48){
            return n % 6 == 1;
        }else{
            return n % 3 == 1;
        }
    };
    this.filters["one"] = function(n){
        return n == 1;
    };
}

Key.prototype.bind = function(game){
    game.keybind(32, "space");
    game.keybind(65, "a");
    game.keybind(66, "b");
};

Key.prototype.scan = function(input){
    for(var i = 0; i < this.names.length; i++){
        var name = this.names[i];
        if(input[name]){
            this.keys[name] += 1;
        }else{
            this.keys[name] = 0;
        }
    }
};

Key.prototype.pressed = function(name){
    return this.keys[name] > 0;
};

Key.prototype.valid = function(name, type = "normal"){
    return this.filters[type](this.keys[name]);
};

Key.prototype.up = function(){
    if(this.keys["down"] > 0){
        return false;
    }
    return this.valid("up");
};

Key.prototype.down = function(){
    if(this.keys["up"] > 0){
        return false;
    }
    return this.valid("down");
};

Key.prototype.left = function(){
    if(this.keys["right"] > 0){
        return false;
    }
    return this.valid("left");
};

Key.prototype.right = function(){
    if(this.keys["left"] > 0){
        return false;
    }
    return this.valid("right");
};
