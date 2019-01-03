
// var iconsThirtytwo = ["🥫", "🍲", "🥘", "🚙", "✈", "🍵",
//     "🛵", "🥤", "🌷", "🎴", "🏯", "🍕", "👾", "🦎",
//     "🐦", "🐕", "♈", "♉", "♊", "♋", "♌", "♍",
//     "♎", "♐", "♑", "♒", "♓", "⛎", "🙈", "🙉",
//     "🙊", "🚀"];

var icons = ["🛵", "🛵", "🌷", "🌷", "🦎", "🦎", "🐦", "🐦",
    "🐕", "🐕", "🙈", "🙈", "🙉", "🙉", "🙊", "🙊"];

$(document).ready(function () {
    $('.menu').mousedown(handle_mousedown);
    window.alert("Welcome to Concentration! Pull the pink ribbon to begin.");
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
    var shuffledDeck = [];
    array.forEach(function (item, index) {
        var frontBack = [];
        board[index] = icons[item];
        $('<div class="flip-card">').appendTo($('.grid'));
        frontBack.push($('<div class="flip-card-front">').text("🧠"));
        frontBack.push($('<div class="flip-card-back rotate">').text(board[index]));
        shuffledDeck.push(frontBack);
    });
    return shuffledDeck;
};

function playGame() {
    $('.flip-card').remove();
    var cardsToBePlaced = cardHandler(getRandomIndexes(icons.length));
    cardsToBePlaced.forEach(function (item, index) {
        item[0].appendTo($('.flip-card').eq(index));
        item[1].appendTo($('.flip-card').eq(index));
    });
    flipCardEvaluate();
};

function flipCardEvaluate() {
    var shown = [];
    $('.flip-card').on("click", function () {
        $(this).toggleClass("rotate");
        shown.push($(this).find("div.flip-card-back").text());
        if ((shown.length > 2) && (shown[0] !== shown[1])) {
            shown = [];
            $('.flip-card.rotate').toggleClass("rotate");
        }
        else if ((shown.length >= 2) && (shown[0] === shown[1])) {
            shown = [];
            $('.flip-card.rotate').css("visibility", "hidden").removeClass("rotate");
            if ($('.grid > div[style]').length >= 16) {
                window.alert("Congratulations! You have found all the " + $('.grid > div[style]').length / 2 + " pairs of cards.");
            }
        }
    });
};

function handle_mousedown(e) {
    window.my_dragging = {};
    my_dragging.pageX0 = e.pageX;
    my_dragging.elem = this;
    my_dragging.offset0 = $(this).offset();
    function handle_dragging(e) {
        var left = my_dragging.offset0.left + (e.pageX - my_dragging.pageX0);
        $(my_dragging.elem).offset({ left: left });
        if (Math.floor(left) <= Math.floor(95 / 100 * my_dragging.offset0.left)) {
            $(my_dragging.elem).offset({ left: my_dragging.offset0.left });
            $('body')
                .off('mousemove', handle_dragging)
                .off('mouseup', handle_mouseup);
            startTimer();
            playGame();
        };
    }
    function handle_mouseup(e) {
        $('body')
            .off('mousemove', handle_dragging)
            .off('mouseup', handle_mouseup);
    }
    $('body')
        .on('mouseup', handle_mouseup)
        .on('mousemove', handle_dragging);
}

function startTimer() {
    var seconds = 0;
    var minutes = 0;
    var timer = setInterval(function () {
        seconds++;
        if (seconds === 59) {
            minutes++;
            seconds = 0;
        }
        var secondsToString = checkNumber(seconds);
        var minutesToString = checkNumber(minutes);
        $('.timer > p').text(minutesToString + ":" + secondsToString)
    }, 1000);
};

function checkNumber(nbr) {
    if (nbr < 10) {
        nbr = ("0" + nbr);
        return nbr;
    }
    else {
        return nbr;
    }
};