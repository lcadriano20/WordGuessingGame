const inputs        =   document.querySelector(".inputs")
const resetBtn      =   document.querySelector('.reset-btn')
const hint          =   document.querySelector('.hint span')
const guessLeft     =   document.querySelector('.guess-left span')
const wrongLetter   =   document.querySelector('.wrong-letter span')
const typingInput   =   document.querySelector('.typing-input')
const cronometer    =   document.querySelector('.gamerTime p')
let intervalo;

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
    document.removeEventListener('keydown',blockKeyboard)
    timer(10)

    
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
        clearInterval(intervalo)


        


    }

    else if(maxGuesses < 1) {
        alert("Game Over!")
        document.addEventListener('keydown',blockKeyboard)

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
function pauseTimer() {
    clearInterval(intervalo)
    console.log('pausado')
}
function timer(duracao) {
    let timer = duracao,minutes,seconds; 
    cronometer.style.color = "black"

    const intervalo = setInterval(function() {
        minutes = parseInt(timer/60,10)
        seconds = parseInt(timer% 60,10)

        minutes = minutes < 10? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        
        cronometer.textContent = minutes + ":" + seconds;

        if(--timer<0) {
            clearInterval(intervalo) 
            cronometer.textContent  = "Seu tempo Acabou!";
            cronometer.style.color  = "red" 
            const inputPlaces = inputs.querySelectorAll('input')
            inputPlaces.forEach((input)=> {
                input.style.backgroundColor = 'gray'
                
            })
            
            document.addEventListener('keydown',blockKeyboard)
            
            
           
            
        }
    },1000)
   
}
function blockKeyboard(event) {
    event.preventDefault()

}   





randomWord()

resetBtn.addEventListener('click',randomWord)
typingInput.addEventListener('input',initGame)
document.addEventListener('keydown', ()=> typingInput.focus())
inputs.addEventListener('click',()=> typingInput.focus())