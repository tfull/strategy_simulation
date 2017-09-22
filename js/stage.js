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
    this.view = { field: view_field };
    this.vertex = { x: 1, y: 1 };

    this.scene.addChild(this.view.field);
}

Stage.prototype.load = function(args){
    var stage = StageData.find(args.stage_id);
    this.field = stage.field;
    this.vertex.x = parseInt((stage.field[0].length - this.block_size) / 2);
    this.vertex.y = parseInt((stage.field.length - this.block_size) / 2);

    this.drawField();
};

Stage.prototype.drawField = function(){
    while(this.view.field.firstChild){
        this.view.field.removeChild(this.view.field.firstChid);
    }

    for(var i = 0; i < this.block_size; i++){
        for(var j = 0; j < this.block_size; j++){
            var x = this.vertex.x + j;
            var y = this.vertex.y + i;
            if(x >= 0 && x < this.field[0].length && y >= 0 && y < this.field.length){
                var image = GeographyData.find(this.field[y][x]).image;
                var sprite = makeImageSprite(image, this.cell_size, this.cell_size, j * this.cell_size, i * this.cell_size);
                sprite.image = getImage(this.assets, image.path);

                this.view.field.addChild(sprite);
            }
        }
    }
};