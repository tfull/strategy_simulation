(function(){
    window.onload = function(){
        enchant();
        var game = new Core(Master.screen_width, Master.screen_height);
        game.fps = 24;
        var key = new Key();
        key.bind(game);
        GeographyData.load(game);
        var title = new Title(game.assets);
        var stage = new Stage(game.assets);
        var mode = "title";
        var debug = document.getElementById("debug");

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
                game.pushScene(stage.scene);
            }
        });

        game.start();
    };

})();