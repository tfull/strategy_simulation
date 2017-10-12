var GeographyData = (function(){
    var data = [
        {
            id: 1,
            expression: {
                name: "plain",
                image: {
                    path: "map_plain.png",
                    width: 256,
                    height: 256
                },
                default_cost: 1
            }
        },
        {
            id: 2,
            expression: {
                name: "rough",
                image: {
                    path: "map_rough.png",
                    width: 256,
                    height: 256
                },
                default_cost: 2,
                avoidance: 10
            }
        }
    ];

    function instantiate(expression){
        return new Geography(expression);
    }

    function _find(id){
        var n = data.length;
        for(var i = 0; i < n; i++){
            if(data[i].id == id){
                if(data[i].value === undefined){
                    data[i].value = instantiate(data[i].expression);
                }
                return data[i].value;
            }
        }
    }

    function _load(game){
        var n = data.length;
        for(var i = 0; i < n; i++){
            game.preload(getImagePath(data[i].expression.image.path));
        }
    }

    return { find: _find, load: _load };
})();
