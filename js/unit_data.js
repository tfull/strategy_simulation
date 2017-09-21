var UnitData = (function(){
    var data = [
        {
            id: 1,
            unit: Unit("frkw swordman", "swordman", 1, {
                hit_point: 20,
                power: 8,
                magic: 1,
                technique: 11,
                speed: 12,
                luck: 6,
                defense: 5,
                resist: 3
            }, [WeaponData.find(1)])
        }
    ];

    function _find(id){
        var n = data.length;
        for(var i = 0; i < n; i++){
            if(data[i].id == id){
                return data[i].unit;
            }
        }
    }

    return { find: _find };
})();
