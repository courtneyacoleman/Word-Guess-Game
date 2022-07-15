var word = ''
var length = ''
var dataString = ''
var alphabet = ''
var dataArray = ''
var index = '';
var code = '';
var wordBlanks = ''
var alphArray = ''
var alphabet = ''
var remaining = ''

alphabet = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';
document.getElementById('alphabet').innerHTML = alphabet
alphArray = Array.from(alphabet);
window.addEventListener('keydown', checkKeyPress);
var counter = document.querySelector("#timer");
remaining = 10;  
counter.textContent = remaining + " guesses";

function getApi() {
    let requestUrl = 'https://random-word-api.herokuapp.com/word;'

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(data){
        console.log(data);
        word = data;
        console.log('word', word);
        dataString = word.toString();
        console.log('dataString:', dataString);
        length = dataString.length;
        console.log('length:', length);
        dataArray = Array.from(dataString);
        console.log('dataArray', dataArray)
        
    } )
}
getApi();

var startButton = document.getElementById('startButton')
startButton.addEventListener('click', startGame);

function startGame(){
    setWord ();
}

function setWord() {
    wordBlanks = '';
    let underScores = '_ ';
    for (let i = 0; i < dataString.length; i++) {
        wordBlanks =  wordBlanks.concat(underScores);
    }
        document.getElementById('wordBlanks').innerHTML = wordBlanks;

}



function checkKeyPress(event) {

    index = (event.keyCode - 65)
    console.log('index:', index)
    code = event.key;
    console.log('code:', code)


    for (let i = 0; i < alphArray.length; i++) 
        if (alphArray[i] === code) {
        alphabet = replaceAt(alphabet, i, '-')
        console.log('alphabet',alphabet)
        document.getElementById('alphabet').innerHTML = alphabet;
        }
        console.log('length of alphArray:', alphArray.length)
        
        onkeydown =
        remaining--;
        timer.textContent = remaining + " guesses";
        gamePlay()
    }

function gamePlay() {
    for (let i = 0; i < dataArray.length; i++)
        if (dataArray[i] === code) {
         wordBlanks = replaceAt(wordBlanks, i*2, code);
         console.log(wordBlanks);
         console.log("letter matched");
         document.getElementById('wordBlanks').innerHTML = wordBlanks;
         gameWon();
        }
    }

function gameWon(){
    if (wordBlanks === dataString){
    document.getElementById('word').innerHTML = "You Won!"
    }
    else if (remaining === 0) {
     document.getElementById('word').innerHTML = 'Game Over'
     document.getElementById('wordblanks').innerHTML = dataString
    }
}
function replaceAt(str, idx, code)
{
    return str.substring(0, idx) + code + str.substring(idx + 1);   
}

//function setTime() {
//     var timer = document.querySelector("#timer");
//     remaining = 60;  
//     gameClock = setInterval(function() {
//     remaining--;
//     timer.textContent = remaining + " seconds";
//     if(remaining === 0) {
//       clearInterval(gameClock);
//     }
//   }, 1000);
// }