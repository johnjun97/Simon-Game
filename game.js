var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);

  var n = Math.random();
  n = n * 4; // Scale to range 0 to 3
  n = Math.floor(n); // Convert to range 1 to 3 by adding 1

  var randomNumber = n;
  var randomChosenColour = buttonColours[randomNumber];
  //console.log("randomChosenClour: " +randomChosenColour);

  gamePattern.push(randomChosenColour);
  console.log("gamePattern: " + gamePattern);

  playSound(randomChosenColour);
  flashRandom(randomChosenColour);
}

function flashRandom(name) {
  $("#" + name)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(".btn").on("click", function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer();

  if(started === false){
    console.log("started: false");
    userClickedPattern = [];
  }else{
    console.log("started: true");
  }
});

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100); // 100 ms delay
}

function checkAnswer() {
  if (gamePattern.length === userClickedPattern.length) {
    if (JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern)) {
      console.log("success");

      userClickedPattern = [];

      console.log("userClickedPattern.length: " + userClickedPattern.length);
      console.log("gamePattern.length: " + gamePattern.length);

      setTimeout(function () {
        nextSequence();
      }, 1000); // 100 ms delay
    } else {
      console.log("wrong");

      var audio = new Audio("sounds/wrong.mp3");
      audio.play();

      $("body").addClass("game-over");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200); // 200 ms delay

      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
  }
}

function startOver() {
  //Inside this function, you'll need to reset the values of level, gamePattern and started variables.

  gamePattern = [];
  buttonColours = ["red", "blue", "green", "yellow"];
  userClickedPattern = [];
  started = false;
  level = 0;

  console.log("level:" + level);
  console.log("gamePattern:" + gamePattern);
  console.log("started" + started);
}