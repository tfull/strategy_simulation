function makeLabel(s, x, y, c){
    var label = new Label(s);
    label.x = x;
    label.y = y;
    label.color = c;
    return label;
}

function getImagePath(path){
    return "img/" + path;
}

function getImage(assets, path){
    return assets["img/" + path];
}

function debug(s){
    var debug = document.getElementById("debug");
    var textarea;
    if(debug.firstChild){
        textarea = debug.firstChild;
    }else{
        textarea = document.createElement("textarea");
        debug.appendChild(textarea);
    }
    textarea.value += s + "\n";
}

function makeImageSprite(image, width, height, x, y){
    var sprite = new Sprite(image.width, image.height);
    sprite.scaleX = width / image.width;
    sprite.scaleY = height / image.height;
    sprite.x = x - (1 - sprite.scaleX) / 2 * image.width;
    sprite.y = y - (1 - sprite.scaleY) / 2 * image.height;
    return sprite;
}
