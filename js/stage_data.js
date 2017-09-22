var StageData = (function(){
    var data = [
        {
            id: 1,
            field: [
                [2, 2, 2, 1, 1],
                [1, 2, 1, 1, 1],
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1, 2],
                [1, 1, 2, 2, 2]
            ],
            player: [UnitData.find(1)],
            enemy: [UnitData.find(1)]
        },
        {
            id: 2,
            field: [
                [2, 2, 1, 1, 1, 1, 1, 1, 1],
                [2, 2, 1, 1, 1, 1, 2, 1, 1],
                [2, 1, 1, 1, 1, 1, 2, 2, 1],
                [2, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 2, 2, 1, 1, 2, 1, 1, 1],
                [1, 2, 2, 1, 1, 2, 2, 2, 1]
            ]
        }
    ];

    var _find = function(id){
        var n = data.length;
        for(var i = 0; i < n; i++){
            if(data[i].id == id){
                return data[i];
            }
        }
    }

    return { find: _find };
})();
