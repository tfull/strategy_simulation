var UnitClassData = (function(){
    var data = [
        {
            id: 1,
            reference: false,
            expression: {
                name: "sword man",
                next_class_id: null,
                special_move_cost: []
            }
        }
    ];

    function instantiate(expression){
        return new UnitClass(expression.name, expression.next_class_id);
    }

    function _find(id){
        var n = data.length;
        for(var i = 0; i < n; i++){
            if(data[i].id == id){
                if(! data[i].reference){
                    data[i].reference = true;
                    data[i].value = instantiate(data[i].expression);
                }
                return data[i].value;
            }
        }
    }

    return { find: _find };
})();
