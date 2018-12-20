
var icons = ["🥫", "🍲", "🥘", "🚙", "✈", "🍵", "🛵", "🥤"];

function randomCheck () {
    let rndm = Math.floor((Math.random() * 20));
    if (rndm > icons.length - 1) {
        return randomCheck();
    }    
    else {
        return rndm;
    }
}

function cardHandler () {
    for (var i=0; i < $('.card').length; i++) {
        $('.card').eq(i).text(icons[i]);
    }
    $('.card').map(function () {
        $(this).clone().insertAfter($(this));
    });
    for (var j=0; i < $('.card').length; i++) {
        let x = $('.card:odd').detach();
        x.insertAfter($('.card').eq(randomCheck()));
    }
}

cardHandler();