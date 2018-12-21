// ***COULD BE USED FURTHER ON***    

//
function randomCheck() {
    let rndm = Math.floor((Math.random() * 40) + 1);
    if (rndm > icons.length - 1) {
        return randomCheck();
    }
    else {
        return rndm;
    };
};
//