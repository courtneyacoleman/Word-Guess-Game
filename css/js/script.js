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
var wins = 0
var losses = 0
var currentWins = ''
var currentLosses = ''

alphabet = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';
document.getElementById('alphabet').innerHTML = alphabet
alphArray = Array.from(alphabet);
window.addEventListener('keydown', checkKeyPress);
var counter = document.querySelector("#timer");
setScoreboard()
function setScoreboard(){
    currentWins = localStorage.getItem('wins')
        document.getElementById('wins').innerHTML = 'Wins: ' + currentWins
    currentLosses = localStorage.getItem('losses')
         document.getElementById('losses').innerHTML = 'Losses: ' + currentLosses   
}

function getApi() {
    let requestUrl = 'https://random-word-api.herokuapp.com/word;'

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(data){
        console.log('data:',data);
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
        remaining = length + 2;
        timer.textContent = remaining + " guesses";
        console.log('remaining:', remaining)

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
         console.log('wordBlanks', wordBlanks);
         console.log("letter matched");
         document.getElementById('wordBlanks').innerHTML = wordBlanks;
        }
        gameOver();
        }
         
   function gameOver()  {   
        let compare = dataString.split('').join(' ') + (' ');
         console.log('compare:', compare.length)
         console.log('wordblanks', wordBlanks.length)
         
         if ((remaining >= 0) && (wordBlanks===compare)){
            //alert('you won')
            wins++
            timer.textContent = 'winner winner chicken dinner'
            console.log('Wins:', wins)
            document.getElementById('wordBlanks').innerHTML = dataString
            document.getElementById('wins').innerHTML = 'Wins: ' + wins
            reset()

         }
         else if (remaining === 0){
            //alert('game over')
            console.log('Losses:', losses)
            losses++
            //alert('haha loserrr')
            timer.textContent = 'you suck';
            document.getElementById('wordBlanks').innerHTML = dataString
            document.getElementById('losses').innerHTML = 'Losses: ' + losses
            reset()     
         }
        
        localStorage.setItem('wins', wins)
        localStorage.setItem('losses', losses)
        
        }
 var resetStorage = document.getElementById('reset')
resetStorage.addEventListener('click', resetScore);

function resetScore(event){
    localStorage.removeItem('wins')
    localStorage.setItem('wins', 0)
    currentWins = localStorage.getItem('wins')
    document.getElementById('wins').innerHTML = 'Wins: ' + currentWins
    
    localStorage.removeItem('losses')
    localStorage.setItem('losses', 0)
    currentLosses = localStorage.getItem('losses')
         document.getElementById('losses').innerHTML = 'Losses: ' + currentLosses 
   
    console.log("resetScore")
 }
   
        
function reset (event){
    startButton.addEventListener('click', startGame)
    getApi()
    alphabet = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';
    document.getElementById('alphabet').innerHTML = alphabet
    
}


function replaceAt(str, idx, code)
{
    return str.substring(0, idx) + code + str.substring(idx + 1);   
}