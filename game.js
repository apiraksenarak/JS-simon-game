
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var firstTime = false;
var level = 0;

$(document).keypress(function() {

    // if true => going to do nextSequence. After nextSequence the check will be true
    if (!firstTime) {
        // select where #level-title are the change text to  "Level " + level
        $("#level-title").text("Level " + level);
        nextSequence();
        firstTime = true;
    }
})

$(".btn").click( function() {

    var userChosenColor = $(this).attr("id");

    playSound(userChosenColor);
    animatePress(userChosenColor);

    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    // [1] check current pressed
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        // [2] check length of pattern => ถ้าถูกหมดก็จะไป level ต่อไป ถ้ายังไม่หมดก็กดเรื่อยๆจน length เท่ากัน
        if (userClickedPattern.length === gamePattern.length) {

            //Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    }
    else {

        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function nextSequence() {

    userClickedPattern = []; // set to empty every next sequence
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function startOver() {

    // reset all values
    gamePattern = [];
    firstTime = false;
    level = 0;
}

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
        console.log(audio);
}

function animatePress(currentColor) {

    // add class 'pressed' to the button that clicked
    $("#" + currentColor).addClass("pressed");

    // remove class 'pressed' after 100 milliseconds
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}