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
                parameter: {
                    level: 1,
                    hit_point: 20,
                    power: 8,
                    magic: 1,
                    technique: 11,
                    speed: 12,
                    luck: 6,
                    defense: 5,
                    resist: 3
                },
                weapon_ids: [1]
            }
        }
    ];

    function instantiate(expression){
        var e = expression;
        var weapons = e.weapon_ids.map(function(id){ return WeaponData.find(id); });
        return new Unit(e.name, e.image, UnitClassData.find(e.unit_class_id), e.parameter, weapons);
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
