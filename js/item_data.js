var ItemData = (function(){
    var data = [
        {
            id: 1,
            type: "weapon",
            expression: {
                name: "鉄の剣",
                type: "sword",
                attribute: "physical",
                target: "enemy",
                power: 6,
                accuracy: 80,
                range: 1,
                level: 2
            }
        },
        {
            id: 2,
            type: "item",
            expression: {
                name: "傷薬",
                type: "heal",
                recovery_point: 20,
                number: 8
            }
        }
    ];

    function instantiate(type, expression){
        if(type == "weapon"){
            return new Weapon(expression);
        }else{
            return new Item(expression);
        }
    }

    function _find(id){
        var n = data.length;
        for(var i = 0; i < n; i++){
            if(data[i].id == id){
                return instantiate(data[i].type, data[i].expression);
            }
        }
    }

    return { find: _find };
})();
