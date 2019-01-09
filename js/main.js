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

var triesCount = 0;

$(document).ready(function() {
  $(".start-button").on("mouseup", startTimer);
  window.alert("Welcome to Concentration! Hit ▶ to begin.");
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
  var pairsFound = 0;
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
      triesCount++;
      logTries(triesCount);
    } else if (shown.length >= 2 && shown[0] === shown[1]) {
      shown = [];
      $(".flip-card.rotate")
        .css("visibility", "hidden")
        .removeClass("rotate");
      pairsFound = Math.floor($('.flip-card[style*="hidden"]').length / 2);
      countPairs(pairsFound);
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
  $(".menu").addClass("-active");

  playGame();

  var timer = setInterval(count, 1000);

  $(".restart-button").on("mouseup", function() {
    clearInterval(timer);
    $(".menu").removeClass("-active");
    $(".minutes").text("00");
    $(".seconds").text("00");
    $(".tries").text("0");
    $(".pairs").text("0");
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
    if ($('.flip-card[style*="hidden"]').length === 16) {
      clearInterval(timer);
      $(".menu").removeClass("-active");
      $(".minutes").text("00");
      $(".seconds").text("00");
      $(".tries").text("0");
      $(".pairs").text("0");
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

function countPairs(nbr) {
  $(".pairs").text(nbr);
}

function logTries(nbr) {
  $(".tries").text(nbr);
}
