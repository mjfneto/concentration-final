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

let scoreBoard = [];

$(document).ready(function() {
  $(".start-button").on("mouseup", startTimer);
  window.alert(`Welcome to Concentration!
   Hit ▶ to begin, and ↺ to restart.`);
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
  var triesCount = 0;
  var shown = [];
  $(".flip-card").on("mouseup", function() {
    var flippedCard = $(this);
    if (!flippedCard.attr("name")) {
      if (shown.length === 0) {
        flippedCard.attr("name", "marked");
      }
      flippedCard.addClass("rotate");
      shown.push(flippedCard.find("div.flip-card-back").text());
      if (shown.length === 2) {
        $('.flip-card[name*="marked"]').removeAttr("name");
      }
      if (shown.length > 2 && shown[0] !== shown[1]) {
        shown = [];
        $(".flip-card.rotate").toggleClass("rotate");
        triesCount++;
        logTries(triesCount);
      } else if (shown.length >= 2 && shown[0] === shown[1]) {
        shown = [];
        $(".flip-card.rotate")
          .css("visibility", "hidden")
          .removeClass("rotate");
        if ($(".grid > div[style]").length >= 2) {
          window.alert(
            "Congratulations! You have found all the " +
              $(".grid > div[style]").length / 2 +
              " pairs of cards."
          );
        }
      }
    }
  });
}

function startTimer() {
  $(".wrap.-buttons").addClass("-active");

  playGame();

  var timer = setInterval(count, 1000);

  $(".restart-button").on("mouseup", function() {
    clearInterval(timer);
    playGame();
    $(".flip-card").off("mouseup");
    $(".wrap.-buttons").removeClass("-active");
    $(".minutes").text("00");
    $(".seconds").text("00");
    $(".tries").text("0");
  });

  function count() {
    if ($('.flip-card[style*="hidden"]').length < 16) {
      var mnts, scnds;
      mnts = Number($(".minutes").text());
      scnds = Number($(".seconds").text());
      scnds++;
      if (scnds === 60) {
        scnds = 0;
        mnts = mnts + 1;
      }
      $(".seconds").text(checkNumber(scnds));
      $(".minutes").text(checkNumber(mnts));
    }
    if ($('.flip-card[style*="hidden"]').length === 2) {
      clearInterval(timer);
      $(".wrap.-buttons").removeClass("-active");
      playGame();
      $(".flip-card").off("mouseup");
      let scoreTries = Number($(".tries").text());
      let scoreMinutes = Number($(".minutes").text());
      let scoreSeconds = Number($(".seconds").text());
      let sum = scoreTries + scoreMinutes + scoreSeconds;
      let score = [scoreTries, scoreMinutes, scoreSeconds, sum];
      evaluateAndPlaceScore(score);
      $(".minutes").text("00");
      $(".seconds").text("00");
      $(".tries").text("0");
    }
  }

  function checkNumber(nbr) {
    if (nbr < 10) {
      nbr = "0" + nbr;
      return nbr;
    } else {
      return nbr;
    }
  }
}

function logTries(nbr) {
  $(".tries").text(nbr);
}

function evaluateAndPlaceScore(score) {
  console.log(score);
  arrivingSum = score[3];
  for (let i = 0; i <= scoreBoard.length; i++) {
    console.log("Turn " + i);
    console.log(scoreBoard.length);
    if (i >= scoreBoard.length) {
      scoreBoard.push(score);
      break;
    }
    let itemSum = scoreBoard[i][3];
    if (arrivingSum > itemSum) {
      console.log("It's bigger than the item with index " + i);
      continue;
    }
    if (arrivingSum < itemSum) {
      console.log("It's smaller than the item with index " + i);
      scoreBoard.splice(i, 0, score);
      break;
    }
  }
  console.log(scoreBoard);
}
