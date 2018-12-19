
var icons = ["🥫", "🍲", "🥘", "🚙", "✈", "🍵", "🛵", "🥤"];

let cards = $('.card');

function randomCheck () {
    let rndm = Math.floor((Math.random() * 20));
    if (rndm > icons.length) {
        return randomCheck();
    }    
    else {
        return rndm;
    }
}

console.log(randomCheck());

// cards.map(function () {
//     $(this).text(icons[i]);
// });