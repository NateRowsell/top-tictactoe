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
let addX
let addO

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

//GAMEBOARD MODULE
const Gameboard = (() => {
  const playerOneScore = document.getElementById('playerOneScore')
  const playerTwoScore = document.getElementById('playerTwoScore')
  const tieGameScore = document.getElementById('tieGameScore')
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
      let zone = gameBoardObject.currentGameboard[i].firstElementChild
      zone.textContent = ''
      zone.classList.remove('radio_button_unchecked')
      zone.classList.remove('clear')
    }
  }

  const checkTie = () => {
    let tieStatus = true

    for (let i = 0; i < gameBoardObject.currentGameboard.length; i++) {
      if (
        gameBoardObject.currentGameboard[i].firstElementChild.textContent == ''
      ) {
        tieStatus = false
      }
    }
    return tieStatus
  }

  const checkWin = () => {
    listOfWinningArrays = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 4, 6],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8],
    ]
    let thisGameboard = Gameboard.gameBoardObject.currentGameboard
    let winStatus = false
    for (let x = 0; x < listOfWinningArrays.length; x++) {
      let element = listOfWinningArrays[x]
      let i = element[0]
      let j = element[1]
      let k = element[2]

      let spaceOne = thisGameboard[i].firstElementChild.textContent
      let spaceTwo = thisGameboard[j].firstElementChild.textContent
      let spaceThree = thisGameboard[k].firstElementChild.textContent

      // if any null can not win
      if (spaceOne == '' || spaceTwo == '' || spaceThree == '') {
        winStatus = false
        continue
      } else if (spaceOne == spaceTwo && spaceOne == spaceThree) {
        winStatus = true
        break
      }
    }
    return winStatus
  }

  let xScore = 0
  let oScore = 0
  let tieScore = 0

  const addPoint = (winStatus) => {
    if (winStatus == 'xwin') {
      xScore++
      playerOneScore.textContent = xScore.toString() + ' Wins'
    } else if (winStatus == 'owin') {
      oScore++
      playerTwoScore.textContent = oScore.toString() + ' Wins'
    } else if (winStatus == 'tie') {
      tieScore++
      tieGameScore.textContent = tieScore.toString() + ' Wins'
    }
  }

  return { newGameboard, gameBoardObject, checkWin, checkTie, addPoint }
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
      // let variableName = boardSpaces[i]
      try {
        Gameboard.gameBoardObject.currentGameboard[i].removeEventListener(
          'click',
          boardSpaces[i],
        )
      } catch (error) {
        console.log(error)
      }
    }
  }

  let oPlayerMove = () => {
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
            targetSquare.innerText = 'radio_button_unchecked'
            targetSquare.classList.add('radio_button_unchecked')
            if (
              Gameboard.checkWin() !== true &&
              Gameboard.checkTie() !== true
            ) {
              moveDone()
              xPlayerMove()
            } else if (Gameboard.checkWin() == true) {
              Gameboard.addPoint('owin')
              alert(' O has won ...run winners code and add a point')
              moveDone()
              Gameboard.newGameboard()
              playGame()
            } else {
              Gameboard.addPoint('owin')
              alert('Tie Game')
              moveDone()
              Gameboard.newGameboard()
              playGame()
            }
          }
        }),
      )
    }
  }

  let xPlayerMove = () => {
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
            targetSquare.innerText = 'clear'
            targetSquare.classList.add('clear')
            if (
              Gameboard.checkWin() !== true &&
              Gameboard.checkTie() !== true
            ) {
              moveDone()
              oPlayerMove()
            } else if (Gameboard.checkWin() == true) {
              Gameboard.addPoint('xwin')
              alert('X has won ...run winners code and add a point')
              moveDone()
              Gameboard.newGameboard()
              playGame()
            } else {
              Gameboard.addPoint('tie')
              alert('Tie Game')
              moveDone()
              Gameboard.newGameboard()
              playGame()
            }
          }
        }),
      )
    }
  }

  resetButton.addEventListener('click', () => {
    moveDone()
    Gameboard.newGameboard()
    playGame()
    playerOneScore.textContent = '0 Wins'
    playerTwoScore.textContent = '0 Wins'
    tieGameScore.textContent = '0 Wins'
    // need to remove clear and radio button classes from all board spaces
  })

  return { playerSignal, xPlayerMove, moveDone }
}

const playerOne = Player('x')

function playGame() {
  playerOne.xPlayerMove()
}

playGame()

/// NEED TO FIX THE RESET BUTTON FROM BEING ABLE TO BE CLICKED CONTINUOUSLY
