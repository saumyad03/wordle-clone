const words = ["ABUSE","ADULT","AGENT","ANGER","APPLE","AWARD","BASIS","BEACH","BIRTH","BLOCK","BLOOD","BOARD","BRAIN","BREAD","BREAK","BROWN","BUYER","CAUSE","CHAIN","CHAIR","CHEST","CHIEF","CHILD","CHINA","CLAIM","CLASS","CLOCK","COACH","COAST","COURT","COVER","CREAM","CRIME","CROSS","CROWD","CROWN","CYCLE","DANCE","DEATH","DEPTH","DOUBT","DRAFT","DRAMA","DREAM","DRESS","DRINK","DRIVE","EARTH","ENEMY","ENTRY","ERROR","EVENT","FAITH","FAULT","FIELD","FIGHT","FINAL","FLOOR","FOCUS","FORCE","FRAME","FRANK","FRONT","FRUIT","GLASS","GRANT","GRASS","GREEN","GROUP","GUIDE","HEART","HENRY","HORSE","HOTEL","HOUSE","IMAGE","INDEX","INPUT","ISSUE","JAPAN","JONES","JUDGE","KNIFE","LAURA","LAYER","LEVEL","LEWIS","LIGHT","LIMIT","LUNCH","MAJOR","MARCH","MATCH","METAL","MODEL","MONEY","MONTH","MOTOR","MOUTH","MUSIC","NIGHT","NOISE","NORTH","NOVEL","NURSE","OFFER","ORDER","OTHER","OWNER","PANEL","PAPER","PARTY","PEACE","PETER","PHASE","PHONE","PIECE","PILOT","PITCH","PLACE","PLANE","PLANT","PLATE","POINT","POUND","POWER","PRESS","PRICE","PRIDE","PRIZE","PROOF","QUEEN","RADIO","RANGE","RATIO","REPLY","RIGHT","RIVER","ROUND","ROUTE","RUGBY","SCALE","SCENE","SCOPE","SCORE","SENSE","SHAPE","SHARE","SHEEP","SHEET","SHIFT","SHIRT","SHOCK","SIGHT","SIMON","SKILL","SLEEP","SMILE","SMITH","SMOKE","SOUND","SOUTH","SPACE","SPEED","SPITE","SPORT","SQUAD","STAFF","STAGE","START","STATE","STEAM","STEEL","STOCK","STONE","STORE","STUDY","STUFF","STYLE","SUGAR","TABLE","TASTE","TERRY","THEME","THING","TITLE","TOTAL","TOUCH","TOWER","TRACK","TRADE","TRAIN","TREND","TRIAL","TRUST","TRUTH","UNCLE","UNION","UNITY","VALUE","VIDEO","VISIT","VOICE","WASTE","WATCH","WATER","WHILE","WHITE","WHOLE","WOMAN","WORLD","YOUTH","ADMIT","ADOPT","AGREE","ALLOW","ALTER","APPLY","ARGUE","ARISE","AVOID","BEGIN","BLAME","BREAK","BRING","BUILD","BURST","CARRY","CATCH","CAUSE","CHECK","CLAIM","CLEAN","CLEAR","CLIMB","CLOSE","COUNT","COVER","CROSS","DANCE","DOUBT","DRINK","DRIVE","ENJOY","ENTER","EXIST","FIGHT","FOCUS","FORCE","GUESS","IMPLY","ISSUE","JUDGE","LAUGH","LEARN","LEAVE","LIMIT","MARRY","MATCH","OCCUR","OFFER","ORDER","PHONE","PLACE","POINT","PRESS","PROVE","RAISE","REACH","REFER","RELAX","SERVE","SHALL","SHARE","SHIFT","SHOOT","SLEEP","SOLVE","SOUND","SPEAK","SPEND","SPLIT","STAND","START","STATE","STICK","STUDY","TEACH","THANK","THINK","THROW","TOUCH","TRAIN","TREAT","TRUST","VISIT","VOICE","WASTE","WATCH","WORRY","WOULD","WRITE","ABOVE","ACUTE","ALIVE","ALONE","ANGRY","AWARE","AWFUL","BASIC","BLACK","BLIND","BRAVE","BRIEF","BROAD","BROWN","CHEAP","CHIEF","CIVIL","CLEAN","CLEAR","CLOSE","CRAZY","DAILY","DIRTY","EARLY","EMPTY","EQUAL","EXACT","EXTRA","FAINT","FALSE","FIFTH","FINAL","FIRST","FRESH","FRONT","FUNNY","GIANT","GRAND","GREAT","GREEN","GROSS","HAPPY","HARSH","HEAVY","HUMAN","IDEAL","INNER","JOINT","LARGE","LEGAL","LEVEL","LIGHT","LOCAL","LOOSE","LUCKY","MAGIC","MAJOR","MINOR","MORAL","NAKED","NASTY","NAVAL","OTHER","OUTER","PLAIN","PRIME","PRIOR","PROUD","QUICK","QUIET","RAPID","READY","RIGHT","ROMAN","ROUGH","ROUND","ROYAL","RURAL","SHARP","SHEER","SHORT","SILLY","SIXTH","SMALL","SMART","SOLID","SORRY","SPARE","STEEP","STILL","SUPER","SWEET","THICK","THIRD","TIGHT","TOTAL","TOUGH","UPPER","UPSET","URBAN","USUAL","VAGUE","VALID","VITAL","WHITE","WHOLE","WRONG","YOUNG"];
let word = words[Math.floor(Math.random() * words.length)];
let wordArr = createWordArr(word);
let wordMap = createWordMap(wordArr);
let guessArr = [];
let gameOver = false;
guesses = 0;
const blankColor = 'black';
const textColor = ' #36454F'
const resultDisplay = document.querySelector('#result');
//selects all boxes
let allBoxes = document.querySelectorAll('.box');
let currBoxes = document.querySelectorAll('[data-id="0"]');
const newGameBtn = document.querySelector('#new-game-btn')
document.addEventListener('keydown', function(event) {
    //if game is over, user can't do anything except play new game
    if (gameOver == true) {
        return;
    }
    //delete key pressed
    if (event.keyCode == 8) {
        //only removes letter if there are letters to be removed
        if (guessArr.length > 0) {
            //remove letter visibly (placeholder letter that is black)
            currBoxes[guessArr.length - 1].textContent = 'Z';
            currBoxes[guessArr.length - 1].style.color = blankColor; //changed
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
            currBoxes[guessArr.length - 1].style.color = textColor; //changed
        }
    }
    //if enter key is pressed
    if (event.keyCode == 13) {
        if (guessArr.length >= 5) {
            checkGuess();
            //checks if win
            if (compareWordArrays(guessArr, wordArr)) {
                resultDisplay.textContent = "YOU WON";
                resultDisplay.style.color = "green"
                gameOver = true;
            } else {
                guesses += 1;
                //loss code
                if (guesses >= 6) {
                    resultDisplay.textContent = "YOU LOST, the word was " + word;
                    resultDisplay.style.color = "red"
                    gameOver = true;
                } 
                //next guess code
                else {
                    //selects next 5 boxes (distinguished based on guessCount)
                    let queryString = '[data-id="' + guesses +'"]'
                    currBoxes = document.querySelectorAll(queryString);
                }
            }
            guessArr = [];
        }
    }
});
newGameBtn.addEventListener('click', function(event) {
    reset();
})
//When hover over, new game button turns different color
newGameBtn.addEventListener('mouseover', (e) => {
    e.target.style.background = 'gray';
})
//When unhover over, new game button reverts back to original color
newGameBtn.addEventListener('mouseout', (e) => {
    e.target.style.background = '#36454F';
})
//could pass parameter for guess
function checkGuess() {
    //clone hashmap
    let cloneMap = createWordMap(wordArr);
    //handle greens
    for (let i = 0; i < guessArr.length; i++) {
        if (guessArr[i] == wordArr[i]) {
            currBoxes[i].style.backgroundColor = 'green';
            let occ = cloneMap.get(guessArr[i]);
            occ -= 1;
            cloneMap.set(guessArr[i], occ);
        }
    }
    //handle yellows and grays
    for (let i = 0; i < guessArr.length; i++) {
        //if green skip
        if (guessArr[i] == wordArr[i]) {
            continue;
        }
        //handles yellows and grays
        if (cloneMap.has(guessArr[i]) && cloneMap.get(guessArr[i]) > 0) {
            currBoxes[i].style.backgroundColor = 'yellow';
            let occ = cloneMap.get(guessArr[i]);
            occ -= 1;
            cloneMap.set(guessArr[i], occ);

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
    gameOver = false;
    //get new word
    word = words[Math.floor(Math.random() * words.length)];
    wordArr = createWordArr(word);
    for (let i = 0; i < allBoxes.length; i++) {
        allBoxes[i].textContent = 'Z';
        allBoxes[i].style.backgroundColor = blankColor; //changed
        allBoxes[i].style.color = blankColor; //changed
    }
    //resets boxes which we type into the first ones
    currBoxes = document.querySelectorAll('[data-id="0"]');
    //resets results display to empty
    resultDisplay.textContent = '';
    //defocuses from all elements so enter doesn't do anything
    newGameBtn.blur();
}
function createWordArr(w) {
    arr = []
    for (let i = 0; i < w.length; i++) {
        arr.push(w[i]);
    }
    return arr;
}
function createWordMap(wArr) {
    let letterMap = new Map();
    for (let i = 0; i < wArr.length; i++) {
        letter = wArr[i];
        if (letterMap.has(letter)) {
            let occ = letterMap.get(letter);
            occ += 1;
            letterMap.set(letter, occ);
        } else {
            letterMap.set(letter, 1)
        }
    }
    return letterMap;

}