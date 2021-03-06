
var icons = ["🛵", "🛵", "🌷", "🌷", "🦎", "🦎", "🐦", "🐦",
 "🐕", "🐕", "🙈", "🙈", "🙉", "🙉", "🙊", "🙊"];

function getRandomIndexes (length) {
    var biggerBox = [];
    function genRandom() {
        while (biggerBox.length < length) {
            console.log("genRandom has started");
            let rndm = Math.floor((Math.random() * 40));
            console.log("number is " + rndm);
            console.log("genRandom ended")
            return checkAndPlaceNumber(rndm);
        };
    };

    var checkAndPlaceNumber = function(number) {
        console.log("checkAndPlaceNumber has started");
        console.log(number + " is caught");
        if ((biggerBox.includes(number)) || (number >= length))  {
            console.log("The number is not fit")
            return genRandom();
        }
        else {
            var box = number;
            biggerBox.push(box);
            console.log(biggerBox + " in biggerBox");
            return genRandom();
        };
    };

    genRandom();
    console.log(biggerBox.length);
    console.log(biggerBox);
    return biggerBox;
};

function cardHandler (array) {
    var board = [];
    array.forEach(function(item, index) {
        board[index] = icons[item];
        $('<div class="card">').text(board[index]).appendTo($('.grid'));
        console.log($('.card').length)
    });
};

function startGame() {
    $('.-start').click(function() {
        cardHandler(getRandomIndexes(icons.length));
        $('.-start').off( "click");
        let trigger = true;
        if (trigger === true) {
            $('.-restart').click(function() {
                $('.card').remove();
                cardHandler(getRandomIndexes(icons.length));
            });
        };    
    });
};

startGame();