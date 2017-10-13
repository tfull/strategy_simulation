function Animation(){
    this.queue = [];
}

Animation.prototype.work = function(){
    return this.queue.length > 0;
};

Animation.prototype.step = function(){
    var n = this.queue[0].length;
    for(var i = 0; i < n; i++){
        this.queue[0][i][1] -= 1;
        if(this.queue[0][i][1] <= 0){
            this.queue[0][i] = null;
        }
    }
    this.queue[0] = this.queue[0].filter(function(x){ return x !== null; });
    if(this.queue[0].length == 0){
        this.queue.shift();
    }
};

Animation.prototype.add = function(item){
    this.queue.push(item);
};

var AnimationImage = (function(){
    var data = [
        {
            id: 1,
            name: "damage",
            value: {
                path: "dummy_damage.png",
                width: 256,
                height: 256
            }
        },
        {
            id: 2,
            name: "miss",
            value: {
                path: "dummy_miss.png",
                width: 256,
                height: 256
            }
        }
    ];

    function _findByName(name){
        var n = data.length;
        for(var i = 0; i < n; i++){
            if(data[i].name == name){
                return data[i].value;
            }
        }
        return null;
    }

    function _load(game){
        var n = data.length;
        for(var i = 0; i < n; i++){
            game.preload(getImagePath(data[i].value.path));
        }
    }

    return { findByName: _findByName, load: _load };
})();
