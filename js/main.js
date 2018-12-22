
var iconsThirtytwo = ["🥫", "🍲", "🥘", "🚙", "✈", "🍵",
    "🛵", "🥤", "🌷", "🎴", "🏯", "🍕", "👾", "🦎",
    "🐦", "🐕", "♈", "♉", "♊", "♋", "♌", "♍",
    "♎", "♐", "♑", "♒", "♓", "⛎", "🙈", "🙉",
    "🙊", "🚀"];

var icons = ["🛵", "🌷", "🦎", "🐦", "🐕", "🙈", "🙉", "🙊"];

var icons = ["🛵", "🛵", "🌷", "🌷", "🦎", "🦎", "🐦", "🐦",
 "🐕", "🐕", "🙈", "🙈", "🙉", "🙉", "🙊", "🙊"];

function getRandomIndexes (length) {
    var biggerBox = [];
    function genRandom() {
        while (biggerBox.length < length) {
            let rndm = Math.floor((Math.random() * 40));
            return checkAndPlaceNumber(rndm);
        };
    };

    var checkAndPlaceNumber = function(number) {
        if ((biggerBox.includes(number)) || (number >= length))  {
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

function cardHandler (array) {
    var board = [];
    array.forEach(function(item, index) {
        board[index] = icons[item];
        $('<div class="card">').text(board[index]).appendTo($('.grid'));
    });
};

cardHandler(getRandomIndexes(icons.length));