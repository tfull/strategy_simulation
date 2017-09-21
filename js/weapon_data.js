var WeaponData = (function(){
    var data = [
        {
            id: 1,
            weapon: Weapon("sword", "ponkikki sword", 3, 80)
        }

    ];

    var _find = function(id){
        var n = data.length;
        for(var i = 0; i < n; i++){
            if(data[i].id == id){
                return data[i].weapon;
            }
        }
    }

    return { find: _find };
})();
