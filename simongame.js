let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let playerPattern = [];
let position = 0;
var red_s = new Audio('sounds/red.mp3');
var blue_s = new Audio('sounds/blue.mp3');
var green_s = new Audio('sounds/green.mp3');
var yellow_s = new Audio('sounds/yellow.mp3');
var wrong_s = new Audio('sounds/wrong.mp3');
let running = 0;

function nextSequence() {
    let randomNumber = Math.floor(Math.random()*4);
    // console.log(randomNumber);
    gamePattern.push(buttonColours[Math.floor(Math.random()*4)]);

    (function soundLoop(i) {
        setTimeout(function() {
            flashButton(gamePattern[gamePattern.length-i]);               
            if (--i) soundLoop(i);   //  decrement i and call myLoop again if i > 0
        }, 1000)
        })(gamePattern.length); 
    console.log(gamePattern);
    running = 2;
}

function gameOver() {
    wrong_s.play();
    running = 0;
    playerPattern = [];
    gamePattern = [];
    position = 0;    
    $("body").addClass("game-over");
    setTimeout(function(){ $("body").removeClass("game-over"); }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
}

function flashButton(color) {
    //console.log(color);
    $("#"+color).addClass("pressed");
    setTimeout(function(){ $("#"+color).removeClass("pressed"); }, 200);
    switch (color){
        case "red":
            red_s.play();
            break;
        case "blue":
            blue_s.play();
            break;
        case "green":
            green_s.play();
            break;
        case "yellow":
            yellow_s.play();
            break;
        default:
            console.log(color)
            break;
        }
}

$("div.btn").click(function() {
    // $("button").this.addClass("button-change");
    if(running === 2) {
        flashButton(this.id);
        playerPattern.push(this.id);
        console.log(playerPattern);
        console.log(this.id + " | " + gamePattern[position])
        if(this.id === gamePattern[position]) {
            position += 1;
        }
        else {
            gameOver();
        }

        if(playerPattern.length === gamePattern.length && running === 2) { 
            running = 1;
            playerPattern = [];
            position = 0;
            nextSequence();
        }
    }   

});

$(document).on("keydown", function(event) {
    if(running === 0) { 
        nextSequence();
        $("h1").text("Try to match the pattern!");
        running = 2;     
    }
});