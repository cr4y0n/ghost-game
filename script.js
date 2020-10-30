var character = document.querySelector("#character");
var skull = document.querySelector("#skull");
var score = 0;
var highScore = 0;

// var html = document.querySelector('html');

function jump() {
  if (character.classList != "animate") {
    character.classList.add("animate");
  }
  setTimeout(() => {
    character.classList.remove("animate");
  }, 1000);
}
var gameOver = setInterval(() => {
  var ghostTop = parseInt(
    window.getComputedStyle(character).getPropertyValue("top")
  );
  var skullLeft = parseInt(
    window.getComputedStyle(skull).getPropertyValue("left")
  );

  if (skullLeft < 85 && skullLeft > 0 && ghostTop >= 110) {
    skull.style.animation = "none";
    skull.style.display = "none";
    document.querySelector(".over").style.display = "block";
    //* Kollar om nuvarande score är högre än highScore, isf ersätts highScore med nya siffran
    if (score > highScore && Math.floor(score / 100) > 0) {
      highScore = score;
      document.getElementById("highScoreSpan").innerHTML = Math.floor(
        highScore / 100
      );
    }
    //* Återställer poängen till 0
    score = 0;
    clearInterval(gameOver);
  } else {
    score++;
    //* Skriver ut poäng och rekordpoäng på motsvarande html-element i spelet
    document.getElementById("highScoreSpan").innerHTML = Math.floor(
      highScore / 100
    );
    document.getElementById("scoreSpan").innerHTML = Math.floor(score / 100);
  }
}, 10);

function reload() {
  location.reload();
}
