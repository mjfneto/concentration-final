
// var iconsThirtytwo = ["🥫", "🍲", "🥘", "🚙", "✈", "🍵",
//     "🛵", "🥤", "🌷", "🎴", "🏯", "🍕", "👾", "🦎",
//     "🐦", "🐕", "♈", "♉", "♊", "♋", "♌", "♍",
//     "♎", "♐", "♑", "♒", "♓", "⛎", "🙈", "🙉",
//     "🙊", "🚀"];

var icons = ["🛵", "🛵", "🌷", "🌷", "🦎", "🦎", "🐦", "🐦",
    "🐕", "🐕", "🙈", "🙈", "🙉", "🙉", "🙊", "🙊"];

$(document).ready(function () {
    playGame();
    $('.flip-card').css("visibility", "hidden");
});

function getRandomIndexes(length) {
    var biggerBox = [];
    function genRandom() {
        while (biggerBox.length < length) {
            let rndm = Math.floor((Math.random() * 40));
            return checkAndPlaceNumber(rndm);
        };
    };

    var checkAndPlaceNumber = function (number) {
        if ((biggerBox.includes(number)) || (number >= length)) {
            return genRandom();
        }
        else {
            var box = number;
            biggerBox.push(box);
            return genRandom();
        };
    };

    genRandom();
    return biggerBox;
};

function cardHandler(array) {
    var board = [];
    array.forEach(function (item, index) {
        board[index] = icons[item];
        $('<div class="flip-card-back rotate">').text(board[index]).insertAfter($('.flip-card-front').eq(index));
    });
};

function playGame() {
    $('.-start').click(function () {
        cardHandler(getRandomIndexes(icons.length));
        $('.flip-card').removeAttr("style");
        $('.-start').off("click");
        flipCardEvaluate();
        let trigger = true;
        if (trigger === true) {
            $('.-restart').click(function () {
                $('.flip-card-back').detach();
                $('.flip-card.rotate').toggleClass("rotate");
                cardHandler(getRandomIndexes(icons.length));
            });
        };
    });
};

function flipCardEvaluate() {
    var shown = [];
    $('.flip-card').on("click", function () {
        $(this).toggleClass("rotate");
        shown.push($(this).find("div.flip-card-back").text());
        console.log(shown);
        if ((shown.length > 2) && (shown[0] !== shown[1])) {
            shown = [];
            $('.flip-card.rotate').toggleClass("rotate");
        }
        else if ((shown.length >= 2) && (shown[0] === shown[1])) {
            shown = [];
            $('.flip-card.rotate').css("visibility", "hidden").removeClass("rotate");
            console.log($('.grid > div[style]').length);
            if ($('.grid > div[style]').length >= 16) {
                window.alert("You have found all the " + $('.grid > div[style]').length + " cards");
            }
        }
    });
};