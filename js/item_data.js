var ItemData = (function(){
    var data = [
        {
            id: 1,
            expression: {
                name: "ponkikki sword",
                type: "weapon",
                weapon_type: "sword",
                power: 3,
                accuracy: 80
            }
        },
        {
            id: 2,
            expression: {
                name: "傷薬",
                type: "heal",
                recovery_point: 20,
                number: 8
            }
        }
    ];

    function instantiate(expression){
        return new Item(expression);
    }

    function _find(id){
        var n = data.length;
        for(var i = 0; i < n; i++){
            if(data[i].id == id){
                return instantiate(data[i].expression);
            }
        }
    }

    return { find: _find };
})();
