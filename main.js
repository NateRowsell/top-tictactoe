const gameModeSlider = document.getElementById('gameModeSlider')
const gameModeCheckbox = document.getElementById('gameModeCheckbox')
const playAsSlider = document.getElementById('playAsSlider')
const playAsCheckbox = document.getElementById('playAsCheckbox')
const controlPanel = document.getElementById('controlPanel')
const X = document.createElement('span')
X.classList.add('material-icons')
X.innerText = 'clear'
const O = document.createElement('span')
O.classList.add('material-icons')
O.innerText = 'radio_button_unchecked'
let bottomControlPanel = document.createElement('div')
bottomControlPanel.setAttribute('id', 'bottomControlPanel')
let difficultyDiv = document.createElement('div')
difficultyDiv.setAttribute('id', 'difficulty')
let difficultySpan = document.createElement('span')
difficultySpan.innerText = 'Difficulty:'
let difficultyButtonEasy = document.createElement('button')
difficultyButtonEasy.classList.add('difficulty-button')
difficultyButtonEasy.innerText = 'Easy'
let difficultyButtonHard = document.createElement('button')
difficultyButtonHard.classList.add('difficulty-button')
difficultyButtonHard.innerText = 'Hard'
let difficultyButtonImpossible = document.createElement('button')
difficultyButtonImpossible.classList.add('difficulty-button')
difficultyButtonImpossible.innerText = 'Impossible'
difficultyDiv.append(
  difficultySpan,
  difficultyButtonEasy,
  difficultyButtonHard,
  difficultyButtonImpossible,
)
bottomControlPanel.appendChild(difficultyDiv)

// Show difficulty when Player V Comp selected

if (gameModeCheckbox.checked == true) {
  controlPanel.appendChild(bottomControlPanel)
}

gameModeSlider.addEventListener('click', () => {
  if (gameModeCheckbox.checked == false) {
    controlPanel.appendChild(bottomControlPanel)
  } else if (gameModeCheckbox.checked == true) {
    controlPanel.removeChild(bottomControlPanel)
  } else {
  }
})

// Find play as value x or o

function getPlayAsValue() {
  if (playAsCheckbox.checked == true) {
    return X
  } else {
    return O
  }
}

// set reset button funcionality

function reset() {
  // do after
}

// let gameBoard = {}
// gameBoard.currentGame = new Array()
// console.log(gameBoard)

// const TicTacToe = () => {
//   const gameBoard = {}
//   const newGame = () => {
//     gameBoard.gameboard = new Array()
//     return gameBoard
//   }
//   return { newGame, gameBoard }
// }

// console.log(TicTacToe.gameBoard)
// console.log(TicTacToe.newGame)

//Player will need playas() and score()
const Player = () => {
  let playAs = () => {
    if (playAsCheckbox.checked == true) {
      return O
    } else {
      return X
    }
  }

  return { playAs }
}

// TESTING AREA
// testing for adding divs with factory function

let playerOne = Player()

console.log(playerOne.playAs())

const topLeft = document.getElementById('top-left')

topLeft.appendChild(playerOne.playAs())

// TESTING AREA
