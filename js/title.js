function Title(assets){
    this.name = "title";
    this.assets = assets;
    this.scene = new Scene();
    this.scene.backgroundColor = "#000000";
    this.difficulty = new Option(["easy", "normal", "hard"]);
    this.stage_id = new Option([1, 2, 3]);
    this.property = [{ key: "difficulty", value: this.difficulty }, { key: "stage", value: this.stage_id }];
    this.index = 0;
    this.updateScene();
    this.end = false;
}

Title.prototype.initialize = function(){
    this.end = false;
}

Title.prototype.keyLeft = function(){
    this.property[this.index].value.down();
    this.updateScene();
};

Title.prototype.keyRight = function(){
    this.property[this.index].value.up();
    this.updateScene();
};

Title.prototype.keyUp = function(){
    this.index = (this.index + 1) % this.property.length;
    this.updateScene();
};

Title.prototype.keyDown = function(){
    this.index = (this.index + this.property.length - 1) % this.property.length;
    this.updateScene();
};

Title.prototype.keyEnter = function(){
    this.finish();
};

Title.prototype.updateScene = function(){
    while(this.scene.firstChild){
        this.scene.removeChild(this.scene.firstChild);
    }
    for(var i = 0; i < this.property.length; i++){
        var prop = this.property[i];
        this.scene.addChild(makeLabel(prop.key + ": " + prop.value.getValue(), 0, i * 30, "#ddccbb"));
    }
    return this.scene;
};

Title.prototype.finish = function(){
    this.end = true;
};

Title.prototype.isEnd = function(){
    return this.end;
};

Title.prototype.getValue = function(){
    return { difficulty: this.difficulty.getValue(), stage_id: this.stage_id.getValue() };
};
