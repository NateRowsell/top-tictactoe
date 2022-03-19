const resetButton = document.getElementById('resetButton')
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
const boardSpaces = document.querySelectorAll('.boardSpace')
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

// set reset button funcionality
resetButton.addEventListener('click', () => {
  Gameboard.newGameboard()
})

//GAMEBOARD MODULE
const Gameboard = (() => {
  const topLeftSpace = document.getElementById('top-left')
  const topMiddleSpace = document.getElementById('top-middle')
  const topRightSpace = document.getElementById('top-right')
  const middleLeftSpace = document.getElementById('middle-left')
  const centerSpace = document.getElementById('center')
  const middleRightSpace = document.getElementById('middle-right')
  const bottomLeftSpace = document.getElementById('bottom-left')
  const bottomMiddleSpace = document.getElementById('bottom-middle')
  const bottomRightSpace = document.getElementById('bottom-right')

  let gameBoardArray = [
    topLeftSpace,
    topMiddleSpace,
    topRightSpace,
    middleLeftSpace,
    centerSpace,
    middleRightSpace,
    bottomLeftSpace,
    bottomMiddleSpace,
    bottomRightSpace,
  ]

  let gameBoardObject = { currentGameboard: gameBoardArray }

  const newGameboard = () => {
    for (let i = 0; i < gameBoardObject.currentGameboard.length; i++) {
      if (gameBoardObject.currentGameboard[i] == null) {
        continue
      }
      while (gameBoardObject.currentGameboard[i].firstChild) {
        gameBoardObject.currentGameboard[i].removeChild(
          gameBoardObject.currentGameboard[i].lastChild,
        )
      }
    }
  }
  return { newGameboard, gameBoardObject }
})()

// PLAYER FACTORY
//Player will need playas() and score()
const Player = (name) => {
  let playerName = name
  let playAs = () => {
    if (playAsCheckbox.checked == true) {
      return O
    } else {
      return X
    }
  }

  // determine player status first or second x or o

  const playerStatus = () => {
    if (playAs() == X) {
      return 'firstPlayer'
    } else {
      return 'secondPlayer'
    }
  }

  let makeMove = () => {
    for (
      let i = 0;
      i < Gameboard.gameBoardObject.currentGameboard.length;
      i++
    ) {
      Gameboard.gameBoardObject.currentGameboard[i].addEventListener(
        'click',
        (e) => {
          targetSquare = e.currentTarget
          targetSquare.appendChild(playAs())
          // figure out below how to remove listener after one use
          Gameboard.gameBoardObject.currentGameboard[i].removeEventListener(
            click,
            this,
          )
        },
      )
    }
  }

  // Need board spaces to have event listener to return targeted node
  // Append play as function which is x or o as make move function

  // for (let i = 0; i < boardSpaces.length; i++) {
  //   boardSpaces[i].addEventListener('click', (e) => {
  //     targetSquare = e.currentTarget
  //     if (targetSquare.childNodes.length == 0) {
  //       targetSquare.appendChild(playAs())
  //     }
  //   })
  // }

  return { playerName, playAs, playerStatus, makeMove }
}

// TESTING AREA
// testing for adding divs with factory function

let playerOne = Player()

// TESTING AREA
