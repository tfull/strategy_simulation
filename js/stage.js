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
}

Stage.prototype.load = function(args){
    var stage = StageData.find(args.stage_id);
    var field = stage.field;
    this.field = field;
    this.player = stage.player;
    this.enemy = stage.enemy;
    this.cursor = new Point(this.player[0].point.x, this.player[0].point.y);

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
        var j_cell = object.point.x - this.vertex.x;
        var i_cell = object.point.y - this.vertex.y;

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

Stage.prototype.keyLeft = function(){
    if(this.mode == "field"){
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
    if(this.mode == "field"){
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
    if(this.mode == "field"){
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
    if(this.mode == "field"){
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
    this.drawUnits();
    this.drawCursor();
};

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
