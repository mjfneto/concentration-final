
var icons = ["🥫", "🍲", "🥘", "🚙", "✈", "🍵",
    "🛵", "🥤", "🌷", "🎴", "🏯", "🍕", "👾", "🦎",
    "🐦", "🐕", "♈", "♉", "♊", "♋", "♌", "♍",
    "♎", "♐", "♑", "♒", "♓", "⛎", "🙈", "🙉",
    "🙊", "🚀"];

function cardDealer() {
    $('.grid').html($('<div>', { class: 'card' }));
    let firstBorn = $('.card').eq(0);
    for (var i = 0; i < ((icons.length / 2) - 1); i++) {
        firstBorn.clone().insertAfter(firstBorn);
    };
    for (var j = 0; j < (icons.length / 2); j++) {
        $('.card').eq(j).text(icons[j]);
    };
    $('.card').map(function () {
        $(this).clone().insertAfter($(this));
    });
    let sliceDeck = $('.card').slice(randomShuffle()).detach();
};

cardDealer();

function genRandomIndexes () {
    var biggerBox = [];
    function genRandom() {
        while (biggerBox.length < icons.length) {
            let rndm = Math.floor((Math.random() * 40));
            return checkAndPlaceNumber(rndm);
        };
    };

    var checkAndPlaceNumber = function(number) {
        if ((biggerBox.includes(number)) || (number >= icons.length))  {
            return genRandom();
        }
        else {
            var box = number;
            biggerBox.push(box);
            return genRandom();
        };
    };

    genRandom();
};