function Stage(assets){
    this.name = "stage";
    this.block_size = 9;
    this.cell_size = Master.screen_height / this.block_size;
    this.assets = assets;
    this.scene = new Scene();
    this.scene.backgroundColor = "#eeeecc";
    var view_field = new Group();
    view_field.x = 0;
    view_field.y = 0;
    var view_status = new Group();
    view_status.x = Master.screen_height;
    view_status.y = 0;
    this.view = { field: view_field, status: view_status };
    this.vertex = new Point(1, 1);

    this.cursor = new Point(0, 0);

    this.scene.addChild(this.view.field);
    this.scene.addChild(this.view.status);

    this.mode = "field";
    this.move_map = null;
    this.selected_unit_object = null;
}

Stage.prototype.load = function(args){
    var stage = StageData.find(args.stage_id);
    var field = stage.field;
    this.field = field;
    this.player = stage.player;
    for(var i = 0; i < this.player.length; i++){
        this.player[i].selected = false;
        this.player[i].temporary_point = null;
    }
    this.enemy = stage.enemy;
    this.cursor = this.player[0].point.clone();

    if(field.width < this.block_size){
        this.vertex.x = parseInt((field.width - this.block_size) / 2);
    }else{
        this.vertex.x = this.player[0].point.x - parseInt(this.block_size / 2);
    }
    if(field.height < this.block_size){
        this.vertex.y = parseInt((field.height - this.block_size) / 2);
    }else{
        this.vertex.y = this.player[0].point.y - parseInt(this.block_size / 2);
    }

    this.updateField();
    this.updateStatus();
};

Stage.prototype.drawField = function(){
    for(var i = 0; i < this.block_size; i++){
        for(var j = 0; j < this.block_size; j++){
            var x = this.vertex.x + j;
            var y = this.vertex.y + i;
            if(x >= 0 && x < this.field.width && y >= 0 && y < this.field.height){
                var image = GeographyData.find(this.field.at(x, y)).image;
                var sprite = makeImageSprite(image, this.cell_size, this.cell_size, j * this.cell_size, i * this.cell_size);
                sprite.image = getImage(this.assets, image.path);

                this.view.field.addChild(sprite);
            }
        }
    }
};

Stage.prototype.drawUnits = function(){
    for(var i = 0; i < this.player.length; i++){
        var object = this.player[i];
        var j_cell;
        var i_cell;

        if(object.temporary_point !== null){
            j_cell = object.temporary_point.x - this.vertex.x;
            i_cell = object.temporary_point.y - this.vertex.y;
        }else{
            j_cell = object.point.x - this.vertex.x;
            i_cell = object.point.y - this.vertex.y;
        }

        if(j_cell >= 0 && j_cell < this.block_size && i_cell >= 0 && i_cell < this.block_size){
            var image = object.unit.image;
            var sprite = makeImageSprite(image, this.cell_size, this.cell_size, j_cell * this.cell_size, i_cell * this.cell_size);
            sprite.image = getImage(this.assets, image.path);
            this.view.field.addChild(sprite);
        }
    }

    for(var i = 0; i < this.enemy.length; i++){
        var object = this.enemy[i];
        var j_cell = object.point.x - this.vertex.x;
        var i_cell = object.point.y - this.vertex.y;

        if(j_cell >= 0 && j_cell < this.block_size && i_cell >= 0 && i_cell < this.block_size){
            var image = object.unit.image;
            var sprite = makeImageSprite(image, this.cell_size, this.cell_size, j_cell * this.cell_size, i_cell * this.cell_size);
            sprite.image = getImage(this.assets, image.path);
            this.view.field.addChild(sprite);
        }
    }
};

Stage.prototype.drawCursor = function(){
    var j_cell = this.cursor.x - this.vertex.x;
    var i_cell = this.cursor.y - this.vertex.y;
    if(j_cell >= 0 && j_cell < this.block_size && i_cell >= 0 && i_cell < this.block_size){
        var sprite = new Sprite(this.cell_size, this.cell_size);
        sprite.backgroundColor = "rgba(128, 128, 0, 0.2)";
        sprite.x = j_cell * this.cell_size;
        sprite.y = i_cell * this.cell_size;
        this.view.field.addChild(sprite);
    }
};

Stage.prototype.cursorValid = function(){
    return this.mode == "field" || this.mode == "movement" || this.mode == "action";
};

Stage.prototype.keyLeft = function(){
    if(this.cursorValid()){
        if(this.cursor.x > 0){
            this.cursor.x -= 1;
            if(this.cursor.x < this.vertex.x){
                this.vertex.x = this.cursor.x;
            }
            this.updateField();
            this.updateStatus();
        }
    }
};

Stage.prototype.keyRight = function(){
    if(this.cursorValid()){
        if(this.cursor.x < this.field.width - 1){
            this.cursor.x += 1;
            if(this.cursor.x > this.vertex.x + (this.block_size - 1)){
                this.vertex.x = this.cursor.x - (this.block_size - 1);
            }
            this.updateField();
            this.updateStatus();
        }
    }
};

Stage.prototype.keyUp = function(){
    if(this.cursorValid()){
        if(this.cursor.y > 0){
            this.cursor.y -= 1;
            if(this.cursor.y < this.vertex.y){
                this.vertex.y = this.cursor.y;
            }
            this.updateField();
            this.updateStatus();
        }
    }
};

Stage.prototype.keyDown = function(){
    if(this.cursorValid()){
        if(this.cursor.y < this.field.height - 1){
            this.cursor.y += 1;
            if(this.cursor.y > this.vertex.y + (this.block_size - 1)){
                this.vertex.y = this.cursor.y - (this.block_size - 1);
            }
            this.updateField();
            this.updateStatus();
        }
    }
};

Stage.prototype.keyA = function(){
    if(this.mode == "field"){
        var unit_object = this.focusedUnitObject();
        if(unit_object !== null && unit_object.affiliation == "player"){
            unit_object.selected = true;
            this.selected_unit_object = unit_object;
            this.mode = "movement";
            var move_map = this.searchMovement(unit_object);
            this.move_map = move_map;
            this.updateField();
        }
    }else if(this.mode == "movement"){
        if(this.move_map[this.cursor.y][this.cursor.x] >= 0){
            var unit_object = this.selected_unit_object;
            unit_object.temporary_point = this.cursor.clone();
            this.mode = "action";
            this.move_map = null;
            this.updateField();
        }
    }else if(this.mode == "action"){
    }
};

Stage.prototype.keyB = function(){
    if(this.mode == "movement"){
        var unit_object = this.selected_unit_object;
        this.mode = "field";
        unit_object.selected = false;
        this.selected_unit_object = null;
        this.move_map = null;
        this.updateField();
    }else if(this.mode == "action"){
        var unit_object = this.selected_unit_object;
        this.mode = "movement";
        unit_object.temporary_point = null;
        this.move_map = this.searchMovement(unit_object);
        this.updateField();
    }
};

Stage.prototype.searchMovement = function(unit_object){
    var unit = unit_object.unit;
    var cost_map = this.field.clone();
    for(var i = 0; i < this.field.height; i++){
        for(var j = 0; j < this.field.width; j++){
            cost_map[i][j] = unit.getMoveCost(cost_map[i][j]);
        }
    }
    if(unit_object.affiliation == "player"){
        var n = this.enemy.length;
        for(var i = 0; i < n; i++){
            var point = this.enemy[i].point;
            cost_map[point.y][point.x] = 10000;
        }
    }else{
        var n = this.player.length;
        for(var i = 0; i < n; i++){
            var point = this.player[i].point;
            cost_map[point.y][point.x] = 10000;
        }
    }
    var move_map = this.field.clone();
    for(var i = 0; i < this.field.height; i++){
        for(var j = 0; j < this.field.width; j++){
            move_map[i][j] = -1;
        }
    }

    var queue = [{ point: unit_object.point, move: unit_object.unit.movement }];
    while(queue.length > 0){
        var object = queue.shift();
        var point = object.point;
        var move = object.move;
        if(move_map[point.y][point.x] == -1 || move_map[point.y][point.x] < move){
            move_map[point.y][point.x] = move;
            var diff = [[0, -1], [1, 0], [0, 1], [-1, 0]];
            for(var i = 0; i < diff.length; i++){
                var x_new = point.x + diff[i][0];
                var y_new = point.y + diff[i][1];
                if(x_new >= 0 && x_new < this.field.width && y_new >= 0 && y_new < this.field.height){
                    var new_move = move - cost_map[y_new][x_new];
                    if(new_move >= 0){
                        queue.push({ point: new Point(x_new, y_new), move: new_move });
                    }
                }
            }
        }
    }

    return move_map;
};

Stage.prototype.drawStatus = function(){
    var sprite_width = Master.screen_width - Master.screen_height;
    var sprite_height = parseInt(Master.screen_height / 2);
    var sprite = new Sprite(sprite_width, sprite_height);
    sprite.backgroundColor = "rgba(0, 0, 0, 0.2)";
    this.view.status.addChild(sprite);
    var unit_object = this.focusedUnitObject();
    if(unit_object !== null){
        var unit = unit_object.unit;
        icon_size = Math.min(parseInt(sprite_width / 4), parseInt(sprite_height / 3));
        sprite = makeImageSprite(unit.image, icon_size, icon_size, parseInt(sprite_width / 4), 0);
        sprite.image = getImage(this.assets, unit.image.path);
        this.view.status.addChild(sprite);

        var top_group = new Group();
        parameters = [["名前", unit.name], ["兵種", unit.unit_class.name], ["レベル", unit.level], ["体力", unit.hit_point + " / " + unit.max_hit_point]];
        for(var i = 0; i < parameters.length; i++){
            top_group.addChild(makeLabel(parameters[i][0] + ": " + parameters[i][1], 0, parseInt(sprite_height / (parameters.length * 3) * i), "#ffffff"));
        }
        this.view.status.addChild(top_group);

        var parameter_group = new Group();
        parameter_group.y = parseInt(sprite_height / 3);
        parameters = [["　力", unit.power], ["魔力", unit.magic], ["　技", unit.technique], ["速さ", unit.speed], ["幸運", unit.luck], ["守備", unit.defense], ["魔防", unit.resist]];
        for(var i = 0; i < 7; i++){
            parameter_group.addChild(makeLabel(parameters[i][0] + ": " + parameters[i][1], 0, parseInt(sprite_height * 2 / (7 * 3) * i), "#ffffff"));
        }
        this.view.status.addChild(parameter_group);

        var item_group = new Group();
        item_group.x = parseInt(sprite_width / 2);
        item_group.y = parseInt(sprite_height / 3);
        for(var i = 0; i < Master.max_item_number; i++){
            if(i < unit.items.length){
                var item = unit.items[i];
                item_group.addChild(makeLabel(item.get("name"), 0, parseInt(sprite_height * 2 / (3 * Master.max_item_number) * i), "#888800"));
            }
        }
        this.view.status.addChild(item_group);
    }
};

Stage.prototype.updateStatus = function(){
    this.clearView(this.view.status);
    this.drawStatus();
};

Stage.prototype.clearView = function(target){
    while(target.firstChild){
        target.removeChild(target.firstChild);
    }
};

Stage.prototype.updateField = function(){
    this.clearView(this.view.field);
    this.drawField();
    this.drawMoveMap();
    this.drawUnits();
    this.drawCursor();
};

Stage.prototype.drawMoveMap = function(){
    if(this.move_map === null){
        return;
    }

    for(var i = 0; i < this.block_size; i++){
        for(var j = 0; j < this.block_size; j++){
            var x = this.vertex.x + j;
            var y = this.vertex.y + i;
            if(this.field.valid(x, y) && this.move_map[y][x] >= 0){
                var sprite = new Sprite(this.cell_size, this.cell_size);
                sprite.x = j * this.cell_size;
                sprite.y = i * this.cell_size;
                sprite.backgroundColor = "rgba(0, 0, 255, 0.2)";
                this.view.field.addChild(sprite);
            }
        }
    }
}

Stage.prototype.focusedUnitObject = function(){
    var n = this.player.length;
    for(var i = 0; i < n; i++){
        var u = this.player[i];
        if(u.point.equal(this.cursor)){
            return u;
        }
    }
    n = this.enemy.length;
    for(var i = 0; i < n; i++){
        var u = this.enemy[i];
        if(u.point.equal(this.cursor)){
            return u;
        }
    }
    return null;
};
