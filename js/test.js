var icons = ["🥫", "🍲", "🥘", "🚙", "✈", "🍵",
    "🛵", "🥤", "🌷", "🎴", "🏯", "🍕", "👾", "🦎",
    "🐦", "🐕", "♈", "♉", "♊", "♋", "♌", "♍",
    "♎", "♐", "♑", "♒", "♓", "⛎", "🙈", "🙉",
    "🙊", "🚀"];

function cardDealer () {
    var biggerBox = [];
    function genRandom() {
        while (biggerBox.length < icons.length) {
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
        if ((biggerBox.includes(number)) || (number >= icons.length))  {
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
};

