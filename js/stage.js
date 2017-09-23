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
    this.view = { field: view_field };
    this.vertex = { x: 1, y: 1 };

    this.scene.addChild(this.view.field);
}

Stage.prototype.load = function(args){
    var stage = StageData.find(args.stage_id);
    var field = stage.field;
    this.field = field;
    this.vertex.x = parseInt((field.width - this.block_size) / 2);
    this.vertex.y = parseInt((field.height- this.block_size) / 2);
    this.player = stage.player;
    this.enemy = stage.enemy;

    this.clearField();
    this.drawField();
    this.drawUnits();
};

Stage.prototype.clearField = function(){
    while(this.view.field.firstChild){
        this.view.field.removeChild(this.view.field.firstChid);
    }
}

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
        var j_cell = object.x - this.vertex.x;
        var i_cell = object.y - this.vertex.y;

        if(j_cell >= 0 && j_cell < this.block_size && i_cell >= 0 && i_cell < this.block_size){
            var image = object.unit.image;
            var sprite = makeImageSprite(image, this.cell_size, this.cell_size, j_cell * this.cell_size, i_cell * this.cell_size);
            sprite.image = getImage(this.assets, image.path);
            this.view.field.addChild(sprite);
        }
    }

    for(var i = 0; i < this.enemy.length; i++){
        var object = this.enemy[i];
        var j_cell = object.x - this.vertex.x;
        var i_cell = object.y - this.vertex.y;

        if(j_cell >= 0 && j_cell < this.block_size && i_cell >= 0 && i_cell < this.block_size){
            var image = object.unit.image;
            var sprite = makeImageSprite(image, this.cell_size, this.cell_size, j_cell * this.cell_size, i_cell * this.cell_size);
            sprite.image = getImage(this.assets, image.path);
            this.view.field.addChild(sprite);
        }
    }
}
