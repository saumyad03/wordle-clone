//For now, word will be SALAD
let wordArr = ['S','A','L','A','D'];
let guessArr = [];
guesses = 0;
//selects all boxes
let allBoxes = document.querySelectorAll('.box');
let currBoxes = document.querySelectorAll('[data-id="0"]');
document.addEventListener('keydown', function(event) {
    //delete key pressed
    if (event.keyCode == 8) {
        //only removes letter if there are letters to be removed
        if (guessArr.length > 0) {
            //remove letter visibly (placeholder letter that is white)
            currBoxes[guessArr.length - 1].textContent = 'Z';
            currBoxes[guessArr.length - 1].style.color = 'white';
            guessArr.pop();
        }
    }
    //a-z key pressed
    if (event.keyCode <= 90 && event.keyCode >= 65) {
        //only takes input if there's room for letters
        if (guessArr.length < 5) {
            const guessedLetter = String.fromCharCode(event.keyCode);
            guessArr.push(guessedLetter);
            //shows letter visibly
            currBoxes[guessArr.length - 1].textContent = guessedLetter;
            currBoxes[guessArr.length - 1].style.color = 'black';
        }
    }
    //if enter key is pressed
    if (event.keyCode == 13) {
        if (guessArr.length >= 5) {
            checkGuess();
            //checks if win
            if (compareWordArrays(guessArr, wordArr)) {
                alert('you won');
                reset();
            } else {
                guesses += 1;
                //selects next 5 boxes (distinguished based on guessCount)
                let queryString = '[data-id="' + guesses +'"]'
                currBoxes = document.querySelectorAll(queryString);
            }
            guessArr = [];
        }
    }
});
//could pass parameter for guess
function checkGuess() {
    //checks every guessed letter
    for (let i = 0; i < guessArr.length; i++) {
        //if letter is in right spot
        if (guessArr[i] == wordArr[i]) {
            currBoxes[i].style.backgroundColor = 'green';
        //if letter in word but not right spot
        } else if (wordArr.includes(guessArr[i])) {
            currBoxes[i].style.backgroundColor = 'yellow';
        //if letter not in word
        } else {
            currBoxes[i].style.backgroundColor = 'gray';
        }
    }
}
function compareWordArrays(guess, word) {
    for (let i = 0; i < word.length; i++) {
        if (guess[i] != word[i]) {
            return false;
        }
    }
    return true;
}
function reset() {
    guessArr = [];
    guesses = 0;
    //get new word
    wordArr = ['S','A','L','T','Y'];
    for (let i = 0; i < allBoxes.length; i++) {
        allBoxes[i].textContent = 'Z';
        allBoxes[i].style.backgroundColor = 'white';
        allBoxes[i].style.color = 'white';
    }
    //resets boxes which we type into the first ones
    currBoxes = document.querySelectorAll('[data-id="0"]');
}