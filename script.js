'use strict';
// Selecting elements
const score00Element = document.querySelector('#score--0');
console.log(score00Element);

const score01Element = document.querySelector('#score--1');
console.log(score01Element);

const currentScore0Element = document.querySelector('#current--0');
console.log(currentScore0Element);

const currentScore1Element = document.querySelector('#current--1');
console.log(currentScore1Element);

const playerElement00 = document.querySelector('.player--0');
const playerElement01 = document.querySelector('.player--1');

const diceElement = document.querySelector('.dice');
console.log(diceElement);

const btnNewGameEL = document.querySelector('.btn--new');
console.log(btnNewGameEL);

const btnRollEL = document.querySelector('.btn--roll');
console.log(btnRollEL);

const btnHoldEL = document.querySelector('.btn--hold');
console.log(btnHoldEL);

// state
let player1Score = 0;
let player2Score = 0;

const scores = [0, 0];
let currentScore = 0;
let currentActivePlayer = 0;
let playing = true;

//Change Value of Score

score00Element.textContent = player1Score;
score01Element.textContent = player2Score;
diceElement.classList.add('hidden');

//Initialization of the game

const initialization = function () {
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  currentActivePlayer = 0;
  playing = true;

  //Change Value of Score

  score00Element.textContent = 0;
  score01Element.textContent = 0;
  currentScore0Element.textContent = 0;
  currentScore1Element.textContent = 0;

  diceElement.classList.add('hidden');
  playerElement00.classList.remove('player--winner');
  playerElement01.classList.remove('player--winner');
  playerElement00.classList.add('player--active');
  playerElement01.classList.remove('player--active');
};

//Switch Function

const switchPlayer = function () {
  currentScore = 0;

  document.querySelector(`#current--${currentActivePlayer}`).textContent = 0;

  currentActivePlayer = currentActivePlayer === 0 ? 1 : 0;

  playerElement00.classList.toggle('player--active');
  playerElement01.classList.toggle('player--active');
};

//Rolling dice functionality

btnRollEL.addEventListener('click', function () {
  if (playing) {
    //1. generate random dice roll
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    console.log(diceNumber);

    //2. display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${diceNumber}.png`;

    //3. check for rolled 1
    if (diceNumber !== 1) {
      currentScore = currentScore + diceNumber;
      //console.log(currentScore);

      document.querySelector(`#current--${currentActivePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHoldEL.addEventListener('click', function () {
  if (playing) {
    //Add current score to total score
    scores[currentActivePlayer] += currentScore;
    console.log(scores[currentActivePlayer]);

    document.querySelector(`#score--${currentActivePlayer}`).textContent =
      scores[currentActivePlayer];

    if (scores[currentActivePlayer] >= 100) {
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${[currentActivePlayer]}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${[currentActivePlayer]}`)
        .classList.remove('player--active');
    } else {
      //Switch Player
      switchPlayer();
    }
  }
});

btnNewGameEL.addEventListener('click', initialization);
