const resetButton = document.getElementById('resetButton')
const gameModeSlider = document.getElementById('gameModeSlider')
const gameModeCheckbox = document.getElementById('gameModeCheckbox')
const playAsSlider = document.getElementById('playAsSlider')
const playAsCheckbox = document.getElementById('playAsCheckbox')
const controlPanel = document.getElementById('controlPanel')
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
      gameBoardObject.currentGameboard[i].firstElementChild.textContent = ''
    }
  }

  const checkWin = () => {
    listOfWinningArrays = [
      [0, 1, 2],
      [0, 3, 6],
    ]
    let thisGameboard = Gameboard.gameBoardObject.currentGameboard
    let winStatus = false
    listOfWinningArrays.forEach((element) => {
      let i = element[0]
      let j = element[1]
      let k = element[2]
      let spaceOne = thisGameboard[i].firstElementChild.textContent
      let spaceTwo = thisGameboard[j].firstElementChild.textContent
      let spaceThree = thisGameboard[k].firstElementChild.textContent
      console.log(spaceOne, spaceTwo, spaceThree)
      if (spaceOne == '' || spaceTwo == '' || spaceThree == '') {
        winStatus = false
      } else if (spaceOne == spaceTwo && spaceOne == spaceThree) {
        winStatus = true
      }
    })
    return winStatus
  }

  return { newGameboard, gameBoardObject, checkWin }
})()

// PLAYER FACTORY
const Player = (signal) => {
  let playerSignal = () => {
    if (signal.toLowerCase() == 'x') {
      return 'clear'
    } else {
      return 'radio_button_unchecked'
    }
  }

  let boardSpaces = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

  let moveDone = () => {
    for (
      let i = 0;
      i < Gameboard.gameBoardObject.currentGameboard.length;
      i++
    ) {
      let variableName = boardSpaces[i]
      Gameboard.gameBoardObject.currentGameboard[i].removeEventListener(
        'click',
        variableName,
      )
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
        (boardSpaces[i] = function (e) {
          targetSquare = e.currentTarget.childNodes[1]
          if (targetSquare.innerText == '') {
            targetSquare.innerText = playerSignal()
            moveDone()
          }
        }),
      )
    }
  }

  return { playerSignal, makeMove }
}

function playGame() {
  let checkPlayerSignal = () => {
    if (playAsCheckbox.checked == true) {
      return 'radio_button_unchecked'
    } else {
      return 'clear'
    }
  }

  if (checkPlayerSignal() == 'clear') {
    playerOne = Player('x')
  } else {
    playerOne = Player('o')
  }

  if (checkPlayerSignal() == 'clear') {
    playerTwo = Player('o')
  } else {
    playerTwo = Player('x')
  }

  let playRound = () => {
    if (Gameboard.checkWin() == false) {
      playerOne.makeMove()
    }
    if (Gameboard.checkWin() == false) {
      playerTwo.makeMove()
    }
  }

  playRound()
}

//// TO DOOOOOO

//// try using as global variable to track turn / round to step through the rounds
