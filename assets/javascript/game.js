

var wordOptions = ["mystic","bundle","winter","recycle","candles","van","frozen","fairy"]
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blanksAndSuccess = []; //_ _ _ _
var wrongLetters = [];


//Game Counters
var winCount = 0;
var guessLeft = 12;


function startGame() {
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)]
    lettersinWord = selectedWord.split("");
    numBlanks = lettersinWord.length; // the length of the letter e.g = 3

    //Reset
    guessLeft = 12;
    wrongLetters = [];
    blanksAndSuccess = []; //the user wins



    //populate blanks and success with the right number of blanks
    for(var i = 0; i < numBlanks; i++){
        blanksAndSuccess.push("_") //to append
    }

    // change HTML to refelct round condition
    document.getElementById("wordtoguess").innerHTML = blanksAndSuccess.join(" ");
    document.getElementById("alreadyGuessed").innerHTML = wrongLetters.join(" ");
    document.getElementById("guessRe").innerHTML = guessLeft;
    document.getElementById("winCounter").innerHTML = winCount;

    
    //testing to console
    console.log(selectedWord);
    console.log(lettersinWord);
    console.log(numBlanks);
    console.log(blanksAndSuccess);
}



function checkLetters(letter){
    //check if the letter exists in code
    var isLetterInWord = false;

    //var doubleLetter = true;
    
    for(var i=0; i<numBlanks; i++)
    {
        if(selectedWord[i] === letter){
           // doubleLetter = false;
            isLetterInWord = true;
         
        } 
    }

    //check where the letter exists and adjust with the blanksandSuccess array

    if(isLetterInWord){
        for(var i=0; i<numBlanks; i++){
            if(selectedWord[i] === letter){
                blanksAndSuccess[i] = letter;
            }
        }
    }
    else{
        wrongLetters.push(letter);
        guessLeft--;
        
    }
    console.log(blanksAndSuccess);
   
}

function roundComplete(){
    console.log("Win Count: " + winCount + " Guess remaining: " + guessLeft);

   // update the HTML to reflect the most recent pages, e.g: counts
    document.getElementById("guessRe").innerHTML = guessLeft;
    document.getElementById("wordtoguess").innerHTML = blanksAndSuccess.join(" ");
    document.getElementById("alreadyGuessed").innerHTML = wrongLetters.join(" ");
   
   
    //check if user win
    if (lettersinWord.toString() === blanksAndSuccess.toString()) {
        winCount++;

    // To update the win counter, the blanks space for new words, and wrong letters in the Html: (position/order matters)
        document.getElementById("winCounter").innerHTML = winCount;
        document.getElementById("wordtoguess").innerHTML = blanksAndSuccess.join(" ");
        document.getElementById("alreadyGuessed").innerHTML = wrongLetters.join(" ");
   
       
        startGame();
    }
    else if(guessLeft === 0){

        startGame();
    }

}

//----------------------------------------------------
//initiates the code for the first time
startGame();


//register keyClicks

document.onkeyup = function(event){
    const letter = event.key;
    if(letter != 'Enter'){
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();
    console.log(letterGuessed);

    }else{
      
        startGame();
    }
}