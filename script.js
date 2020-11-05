var player = document.querySelector("#player");
var obstacle = document.querySelector("#obstacle");
var score = 0; 
var highScore = 0;
var activeKeys = {};

// var html = document.querySelector('html');

document.addEventListener("keydown", function(keyboardEvent) { //läser av tangentnedtryckningar
  activeKeys[keyboardEvent.code] = true; //"aktiverar" aktuell nedtryckt tangents id
  if(activeKeys["Space"]) { //kontrollerar om nedtryckt tangent motsvarar mellanslag
    jump();
  }
  if(activeKeys["Enter"] || activeKeys["NumpadEnter"]) { //kontrollerar om nedtryckt tangent motsvarar enter
    reload();
  }
}); 
document.addEventListener("keyup", function(keyboardEvent) { //läser av tangentsläpp
  activeKeys[keyboardEvent.code] = false; //"inaktiverar" aktuell nedtryckt tangents id
});

function jump() {
  if(player.classList != "animate") {
    player.classList.add("animate");
  }
  setTimeout(() => {
    player.classList.remove("animate");
  }, 1000);
}
var gameOver = setInterval(() => {
  var playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
  var obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

  if(obstacleLeft < 90 && obstacleLeft > 0 && playerTop >= 110) {
    obstacle.style.animation = "none";
    obstacle.style.display = "none";
    document.querySelector(".message").style.display = "block";
    //* Kollar om nuvarande score är högre än highScore, isf ersätts highScore med nya siffran
    if(score > highScore && Math.floor(score / 100) > 0) {
      highScore = score;
      document.getElementById("highScoreBoard").innerHTML = Math.floor(highScore / 100);
      if(typeof(Storage) !== "undefined") { //kontrollerar om webläsaren stödjer lokal lagring
        localStorage.setItem("highScore", highScore); //sparar värdet från variabeln i attributet "highScore"
      }
    }
    //* Återställer poängen till 0
    score = 0;
    clearInterval(gameOver);
  } else {
    score++;
    //* Skriver ut poäng och rekordpoäng på motsvarande html-element i spelet
    document.getElementById("highScoreBoard").innerHTML = Math.floor(localStorage.getItem("highScore") / 100);
    document.getElementById("scoreBoard").innerHTML = Math.floor(score / 100);
  }
}, 10);

function reload() {
  location.reload();
}
