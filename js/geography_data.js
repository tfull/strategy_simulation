var GeographyData = (function(){
    var data = [
        {
            id: 1,
            value: {
                name: "plain",
                image: {
                    path: "map_plain.png",
                    width: 256,
                    height: 256
                }
            }
        },
        {
            id: 2,
            value: {
                name: "rough",
                image: {
                    path: "map_rough.png",
                    width: 256,
                    height: 256
                }
            }
        }
    ];

    function _find(id){
        var n = data.length;
        for(var i = 0; i < n; i++){
            if(data[i].id == id){
                return data[i].value;
            }
        }
    }

    function _load(game){
        var n = data.length;
        for(var i = 0; i < n; i++){
            game.preload(getImagePath(data[i].value.image.path));
        }
    }

    return { find: _find, load: _load };
})();
