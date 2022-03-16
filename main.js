const controlPanel = document.getElementById('controlPanel')
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

// do this if p vs comp selected
controlPanel.appendChild(bottomControlPanel)
// remove it when not selected
