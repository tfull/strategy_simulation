(function(){
    window.onload = function(){
        enchant();
        var game = new Core(Master.screen_width, Master.screen_height);
        game.fps = 24;
        var key = new Key();
        key.bind(game);
        GeographyData.load(game);
        UnitData.load(game);
        var title = new Title(game.assets);
        var stage = new Stage(game.assets);
        var mode = "title";

        game.onload = function(){
        };

        game.addEventListener("enterframe", function(){
            key.scan(game.input);

            game.popScene();

            if(mode == "title"){
                if(key.up()){
                    title.keyUp();
                }
                if(key.down()){
                    title.keyDown();
                }
                if(key.left()){
                    title.keyLeft();
                }
                if(key.right()){
                    title.keyRight();
                }
                if(key.valid("space")){
                    title.keyEnter();
                }
                if(title.isEnd()){
                    stage.load(title.getValue());
                    mode = "stage";
                }
                game.pushScene(title.scene);
            }else if(mode == "stage"){
                if(key.up()){
                    stage.keyUp();
                }
                if(key.down()){
                    stage.keyDown();
                }
                if(key.left()){
                    stage.keyLeft();
                }
                if(key.right()){
                    stage.keyRight();
                }
                if(key.valid("a", "one")){
                    stage.keyA();
                }
                if(key.valid("b", "one")){
                    stage.keyB();
                }
                game.pushScene(stage.scene);
            }
        });

        game.start();
    };

})();
