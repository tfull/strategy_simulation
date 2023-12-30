var UnitData = (function(){
    var data = [
        {
            id: 1,
            expression: {
                name: "frkw swordman",
                image: {
                    path: "dummy_chara_sword.png",
                    width: 256,
                    height: 256
                },
                unit_class_id: 1,
                level: 1,
                hit_point: 20,
                power: 8,
                magic: 1,
                technique: 11,
                speed: 12,
                luck: 6,
                defense: 5,
                resist: 3,
                movement: 6,
                sword: 2,
                lance: 0,
                axe: 0,
                bow: 0,
                item_ids: [1, 2]
            }
        },
        {
            id: 2,
            expression: {
                name: "frkw_lance",
                image: {
                    path: "dummy_chara_sword.png",
                    width: 256,
                    height: 256
                },
                unit_class_id: 2,
                level: 1,
                hit_point: 20,
                power: 9,
                magic: 1,
                technique: 9,
                speed: 9,
                luck: 5,
                defense: 7,
                resist: 4,
                movement: 6,
                sword: 0,
                lance: 2,
                axe: 0,
                bow: 0,
                item_ids: [2]
            }
        }
    ];

    function instantiate(expression){
        return new Unit(expression);
    }

    function _find(id){
        var n = data.length;
        for(var i = 0; i < n; i++){
            if(data[i].id == id){
                return instantiate(data[i].expression);
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
