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
      evaluateScore(score);
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

let topScores = $(".top");
let scoreBoard = [];

function evaluateScore(score) {
  arrivingSum = score[3];
  for (let i = 0; i <= scoreBoard.length; i++) {
    if (i >= scoreBoard.length) {
      scoreBoard.push(score);
      break;
    }
    let itemSum = scoreBoard[i][3];
    if (arrivingSum > itemSum) {
      continue;
    }
    if (arrivingSum < itemSum) {
      scoreBoard.splice(i, 0, score);
      break;
    }
  }
  placeScore();
}

function placeScore() {
  for (let i = 0; i < scoreBoard.length; i++) {
    if (scoreBoard[i][0] === 1) {
      topScores[i].textContent =
        scoreBoard[i][0] +
        " try in " +
        scoreBoard[i][1] +
        ":" +
        scoreBoard[i][2];
    } else {
      topScores[i].textContent =
        scoreBoard[i][0] +
        " tries in " +
        scoreBoard[i][1] +
        ":" +
        scoreBoard[i][2];
    }
  }
}
