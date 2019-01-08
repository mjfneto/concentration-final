// var iconsThirtytwo = ["🥫", "🍲", "🥘", "🚙", "✈", "🍵",
//     "🛵", "🥤", "🌷", "🎴", "🏯", "🍕", "👾", "🦎",
//     "🐦", "🐕", "♈", "♉", "♊", "♋", "♌", "♍",
//     "♎", "♐", "♑", "♒", "♓", "⛎", "🙈", "🙉",
//     "🙊", "🚀"];

var icons = [
  "🛵",
  "🛵",
  "🌷",
  "🌷",
  "🦎",
  "🦎",
  "🐦",
  "🐦",
  "🐕",
  "🐕",
  "🙈",
  "🙈",
  "🙉",
  "🙉",
  "🙊",
  "🙊"
];

$(document).ready(function() {
  $(".start-button").on("click", function() {
    playGame();
    startTimer();
    $(".start-button").off("click");
  });
  window.alert("Welcome to Concentration! Press the start button to begin.");
});

function getRandomIndexes(length) {
  var biggerBox = [];
  function genRandom() {
    while (biggerBox.length < length) {
      let rndm = Math.floor(Math.random() * 40);
      return checkAndPlaceNumber(rndm);
    }
  }

  var checkAndPlaceNumber = function(number) {
    if (biggerBox.includes(number) || number >= length) {
      return genRandom();
    } else {
      var box = number;
      biggerBox.push(box);
      return genRandom();
    }
  };

  genRandom();
  return biggerBox;
}

function cardHandler(array) {
  var board = [];
  var shuffledDeck = [];
  array.forEach(function(item, index) {
    var frontBack = [];
    board[index] = icons[item];
    $('<div class="flip-card">').appendTo($(".grid"));
    frontBack.push($('<div class="flip-card-front">').text("🧠"));
    frontBack.push($('<div class="flip-card-back rotate">').text(board[index]));
    shuffledDeck.push(frontBack);
  });
  return shuffledDeck;
}

function playGame() {
  $(".flip-card").remove();
  var cardsToBePlaced = cardHandler(getRandomIndexes(icons.length));
  cardsToBePlaced.forEach(function(item, index) {
    item[0].appendTo($(".flip-card").eq(index));
    item[1].appendTo($(".flip-card").eq(index));
  });
  flipCardEvaluate();
}

function flipCardEvaluate() {
  var shown = [];
  $(".flip-card").on("click", function() {
    $(this).toggleClass("rotate");
    shown.push(
      $(this)
        .find("div.flip-card-back")
        .text()
    );
    if (shown.length > 2 && shown[0] !== shown[1]) {
      shown = [];
      $(".flip-card.rotate").toggleClass("rotate");
    } else if (shown.length >= 2 && shown[0] === shown[1]) {
      shown = [];
      $(".flip-card.rotate")
        .css("visibility", "hidden")
        .removeClass("rotate");
      if ($(".grid > div[style]").length >= 16) {
        window.alert(
          "Congratulations! You have found all the " +
            $(".grid > div[style]").length / 2 +
            " pairs of cards."
        );
      }
    }
  });
}

function startTimer() {
  var seconds = 0;
  var minutes = 0;
  var timer = setInterval(function() {
    seconds++;
    if (seconds === 59) {
      minutes++;
      seconds = 0;
    }
    var secondsToString = checkNumber(seconds);
    var minutesToString = checkNumber(minutes);
    $(".timer > p").text(minutesToString + ":" + secondsToString);
  }, 1000);
}

function checkNumber(nbr) {
  if (nbr < 10) {
    nbr = "0" + nbr;
    return nbr;
  } else {
    return nbr;
  }
}
