var StageData = (function(){
    var data = [
        {
            id: 1,
            expression: {
                field: [
                    [2, 2, 2, 1, 1],
                    [1, 2, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 2],
                    [1, 1, 2, 2, 2]
                ],
                player: [{ unit_id: 1, x: 3, y: 3 }],
                enemy: [{ unit_id: 1, x: 1, y: 1 }]
            }
        },
        {
            id: 2,
            expression: {
                field: [
                    [2, 2, 1, 1, 1, 1, 1, 1, 1],
                    [2, 2, 1, 1, 1, 1, 2, 1, 1],
                    [2, 1, 1, 1, 1, 1, 2, 2, 1],
                    [2, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 2, 2, 1, 1, 2, 1, 1, 1],
                    [1, 2, 2, 1, 1, 2, 2, 2, 1]
                ],
                player: [{ unit_id: 1, x: 3, y: 3 }],
                enemy: [{ unit_id: 1, x: 1, y: 1 }]
            }
        },
        {
            id: 3,
            expression: {
                field: [
                    [2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1],
                    [2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1],
                    [2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 1, 1],
                    [2, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 1, 1],
                    [2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1],
                    [1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
                    [1, 2, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1],
                    [1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 2],
                    [1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1],
                    [1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 2, 1],
                    [1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1],
                ],
                player: [{ unit_id: 1, x: 3, y: 3 }],
                enemy: [{ unit_id: 1, x: 1, y: 1 }]
            }
        }
    ];

    function instantiate(expression){
        var player = expression.player.map(function(u){ return { unit: UnitData.find(u.unit_id), x: u.x, y: u.y }; });
        var enemy = expression.enemy.map(function(u){ return { unit: UnitData.find(u.unit_id), x: u.x, y: u.y }; });
        return { field: new Field(expression.field), player: player, enemy: enemy };
    }

    var _find = function(id){
        var n = data.length;
        for(var i = 0; i < n; i++){
            if(data[i].id == id){
                return instantiate(data[i].expression);
            }
        }
    }

    return { find: _find };
})();
