var dt = 1 / 10;
var fps = 100;
 
var player_image = new Image();
player_image.src = "Test Sprite.png";
player_points = 0;
player_xvel = 0;
player_yvel = 0;
player_x = 0;
player_y = 540;
var moveright = false;
var moveleft = false;
var jump = false;
var ground = true;
 
function scaninput(e) {
    if (window.event) {
        keypress = e.keyCode;
    } else if (e.which) {
        keypress = e.which;
    }
    switch (keypress) {
    case 38: //Up key
        console.log("you pressed up");
        jump = true;
        break;
    case 39: //Right key
        console.log("you pressed right");
        moveright = true;
        break;
    case 37: //Left Key
        console.log("you pressed left");
        moveleft = true;
        break;
    }
}
 
function stopmove(e) {
    if (window.event) {
        keyup = e.keyCode;
    } else if (e.which) {
        keyup = e.which;
    }
    switch (keyup) {
    case 38: // Up
        jump = false;
        break;
    case 39: // Right
        moveright = false;
        break;
    case 37: // Left
        moveleft = false;
        break;
    }
}
 
var update = function () {
 
    if (moveright) {
        player_xvel = 200
    }
    if (moveleft) {
        player_xvel = -200
    }
    if (!moveleft && !moveright) {
        player_xvel = 0
    }
    if (jump && ground) {
        player_yvel = -170
    }
    if (!ground) {
        player_yvel = player_yvel + (196 * dt);
    }
    player_x = player_xvel * dt + player_x;
    player_y = player_yvel * dt + player_y;
    if (player_y > 540) {
        player_y = 540;
        player_yvel = 0;
        grounded = true;
    }
    if (jump) {
        ground = false;
    }
    if (player_y === 540) {
        ground = true;
    }
};
 
function draw() {
    var c = document.getElementById("canvas");
    var context = c.getContext("2d");
    context.clearRect(0, 0, 800, 600);
    context.fillStyle = "#4444ff";
    context.fillRect(0, 0, 800, 600);
 
 
    //draw floor
    context.fillStyle = "#000000";
    context.fillRect(0, 540, 800, 40);
 
    //Draw player
    context.save();
    context.translate(player_x, player_y);
    context.drawImage(player_image, 0, -115);
    context.restore();
}
 
function run() {
    update();
    draw();
//    console.log("x,y" + player_x + ", " + player_y + " xvel:" + player_xvel + " yvel:" + player_yvel + "ground? " + ground);
}
 
_intervalId = setInterval(run, 10000 / fps);