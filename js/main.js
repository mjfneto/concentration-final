
// var iconsThirtytwo = ["🥫", "🍲", "🥘", "🚙", "✈", "🍵",
//     "🛵", "🥤", "🌷", "🎴", "🏯", "🍕", "👾", "🦎",
//     "🐦", "🐕", "♈", "♉", "♊", "♋", "♌", "♍",
//     "♎", "♐", "♑", "♒", "♓", "⛎", "🙈", "🙉",
//     "🙊", "🚀"];

var icons = ["🛵", "🛵", "🌷", "🌷", "🦎", "🦎", "🐦", "🐦",
    "🐕", "🐕", "🙈", "🙈", "🙉", "🙉", "🙊", "🙊"];

$(document).ready(function () {
    playGame();
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
        $('<div class="card veil">').text(board[index]).appendTo($('.item').eq(index));
    });
};

function playGame() {
    $('.-start').click(function () {
        cardHandler(getRandomIndexes(icons.length));
        $('.item').removeClass("veil");
        $('.-start').off("click");
        flipCardEvaluate();
        let trigger = true;
        if (trigger === true) {
            $('.-restart').click(function () {
                $('.card').detach();
                cardHandler(getRandomIndexes(icons.length));
            });
        };
    });
};

function flipCardEvaluate() {
    var shown = [];
    console.log("Hey");
    $('.item').on("click", function (event) {
        var target = $(event.target);
        $(this).toggleClass("rotate");
        $(this).children().toggleClass("veil");
    });
};