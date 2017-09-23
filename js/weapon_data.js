var WeaponData = (function(){
    var data = [
        {
            id: 1,
            expression: {
                name: "ponkikki sword",
                type: "sword",
                power: 3,
                accuracy: 80
            }
        }

    ];

    function instantiate(expression){
        return new Weapon(expression.name, expression.type, expression.power, expression.accuracy);
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
