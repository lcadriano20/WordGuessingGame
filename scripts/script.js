const inputs        =   document.querySelector(".inputs")
const resetBtn      =   document.querySelector('.reset-btn')
const hint          =   document.querySelector('.hint span')
const guessLeft     = document.querySelector('.guess-left span')
const wrongLetter   =   document.querySelector('.wrong-letter span')
const typingInput   =   document.querySelector('.typing-input')

let word,incorrectLetters =[],correctLetters =[]
let maxGuesses


function randomWord() {

    // Getting random object from wordList
    let randomObj = wordList[Math.floor(Math.random()*wordList.length)]
    word = randomObj.word // getting word of random object
    maxGuesses = 5; correctLetters = [], incorrectLetters= []
    console.log(word)

    hint.innerHTML = randomObj.hint
    guessLeft.innerText = maxGuesses
    wrongLetter.innerText = incorrectLetters

    let html = "";

    for(let i = 0 ; i < word.length ; i++) {
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;
    
}


function initGame(e) {
    let key = e.target.value

    if(key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        console.log(key)
        if(word.includes(key)) { //if user letter found in the word
           showLetter(word,key)
           
        } else {
            maxGuesses-- //Decrement maxGuesses by 1;
            incorrectLetters.push(` ${key}`)
        }
    }
    guessLeft.innerText = maxGuesses

    wrongLetter.innerText = incorrectLetters
    typingInput.value = ''

   setTimeout(()=> {
    if(correctLetters.length === word.length) {
        alert(`Congrats! You found the word ${word.toUpperCase()}`)
        randomWord() // reset the Game
    }

    else if(maxGuesses < 1) {
        alert("Game Over!")
        for(let i = 0; i < word.length ; i++) {
            // showing matched letter in the input value
    
            inputs.querySelectorAll("input")[i].value = word[i]
            
        }
    }
   });

}
function showLetter(word,key) {
    for(let i = 0; i < word.length ; i++) {
        // showing matched letter in the input value

        if(word[i] === key) {
            correctLetters.push(key)
            inputs.querySelectorAll("input")[i].value = key
        }
    }
}


randomWord()

resetBtn.addEventListener('click',randomWord)
typingInput.addEventListener('input',initGame)
document.addEventListener('keydown', ()=> typingInput.focus())
inputs.addEventListener('click',()=> typingInput.focus())