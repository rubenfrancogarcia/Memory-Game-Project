//global variables
"use strict"
let moves = 0;
let openCards = [];
let clockOff = true;
let time = 0;
const total_pairs = 8;
const deck = document.querySelector(".deck");
let clockId;
let matched = 0;


//to shuffle cards
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//call shuffle function upon arrayDeck and replace DOM elements
function shuffleCards(){
  const deck = document.querySelector(".deck");
  const cards = document.querySelectorAll(".deck li");
  const arrayDeck = Array.from(cards);
  let shuffledDeck = shuffle(arrayDeck);
  for (let card of shuffledDeck) {
    deck.appendChild(card);
  }
}

//adds 1 upon every 2 cards clicked
function addMoves(){
  moves++;
  const movesText = document.querySelector('.moves');
  movesText.innerHTML = moves;
}

//if moves reach value then a star is hidden
function moveScore(){
  if(moves === 10 || moves === 16){
    removeStar();
  }
}

//hides 1 star for a maxmimum of 2 stars based on moveScore() function logic
function removeStar() {
  const stars = 3;
  const allStars = document.querySelectorAll('ul.stars li ');
  for (let star of allStars){
    if(star.style.visibility !== 'hidden' ) {
      star.style.visibility= 'hidden';
      break;
    }
  }
}

//checks if cards are match.
function checkCards() {
  if(openCards[0].firstElementChild.className === openCards[1].firstElementChild.className){
    openCards[0].classList.add('match');
    openCards[1].classList.add('match');
    openCards = [];
    matched++;
    endGame();
  }
  else{
     if(openCards[0].firstElementChild.className != openCards[1].firstElementChild.className){
       shakeAdd();
       shakeRemove();
      }

    setTimeout(() => {
      openCards[0].classList.remove('show', 'open');
      openCards[1].classList.remove('show','open');
      openCards = [];
    }, 1500);
  }
}
//shake functions adds and remove shake class that applys animation
//is called within checkCards function
function shakeAdd(){
  openCards[0].classList.add('shake');
  openCards[1].classList.add('shake');
}

function shakeRemove(){
  setTimeout(() =>{
    openCards[0].classList.remove('shake');
    openCards[1].classList.remove('shake');
  }, 1500);
}

//adds functionality to clicking cards; when 2 cards are added to openCards array, then the moveScore(), checkCards(), and addMoves() functions are called; the checkCards() function determines whether the cards are matches if so it adds the class .matched, else it does a shake animation and flip back over.
deck.addEventListener('click', event => {
  const clickTarget = event.target;
  if (clickTarget.classList.contains('card') && openCards.length < 2 && !clickTarget.classList.contains('match') &&                     !clickTarget.classList.contains('show') && !clickTarget.classList.contains('open')) {
    clickTarget.classList.add('show', 'open');
    openCards.push(clickTarget);
      if(openCards.length === 2 ) {
        moveScore();
        checkCards();
        addMoves();
      }
  }
});

//starts timer upon first click on card
deck.addEventListener('click', event => {
    if(clockOff) {
      startCountdown();
      clockOff = false;
    }
});

//is called upon first clock on card and calls upon DisplayTIme() to change timer value every 1 sec.
function startCountdown(){
    clockId = setInterval(() => {
      time++;
      DisplayTime();
    }, 1000);
}

//clears timer and stops it
function stopClock() {
  clearInterval(clockId);
}
//gives time in 0:00 format according to time via stackoverflow
function DisplayTime() {
  const clock = document.querySelector('#clock');
  clock.innerHTML = SecondsTohhmmss(time);
}

const SecondsTohhmmss = function() {
  let hours   = Math.floor(time / 3600);
  let minutes = Math.floor((time - (hours * 3600)) / 60);
  let seconds = time - (hours * 3600) - (minutes * 60);

  // round seconds
  seconds = Math.round(seconds * 100) / 100

  let result = (hours < 10 ? "0" + hours : hours);
      result += "-" + (minutes < 10 ? "0" + minutes : minutes);
      result += "-" + (seconds  < 10 ? "0" + seconds : seconds);
  return result;
}

//congrats page with stats
function endGame(){
if(matched === total_pairs){
    stopClock();
    endScreen();
    detailStats();
  }
}

//toggle end screen
function endScreen () {
  const end = document.querySelector('.completed_game_background');
  end.classList.toggle('hide');
}

//gives recap data
function detailStats () {
  const timeStat = document.querySelector('.timeValue');
  const timeValue = document.querySelector('#clock').innerHTML;
  timeStat.innerHTML = 'Time = '+timeValue;

  const movesStat = document.querySelector('.movesValue');
  movesStat.innerHTML = "Moves = "+moves;

  const starsStat = document.querySelector('.starsValue')
  const stars = starValue();
  starsStat.innerHTML = 'Stars = '+stars;

}
//obtains starValue
function starValue() {
  const stars = document.querySelectorAll('.stars li');
  let starCount = 0;
  for (let star of stars) {
      if (star.style.visibility !== 'hidden') {
        starCount ++;
      }
  }
  return starCount;
}

//adds prompts to button clicks
document.querySelector('.exit').addEventListener('click', () => {
  endScreen();
});

document.querySelector('.restart').addEventListener('click', () => {
  console.log("it works");
  restart();
});

document.querySelector('.button').addEventListener('click', () => {
  restartEndGame();
});

//calls all functions stated and sets matched cards and time to 0 and clockOff true
function restartEndGame(){
  endScreen();
  shuffleCards();
  resetMoves();
  resetStars();
  resetMoves();
  stopClock();
  resetCards();
  clockOff =true;
  time = 0;
  DisplayTime();
  matched = 0;
}


function restart() {
  resetMoves();
  shuffleCards();
  resetCards();
  resetStars();
  stopClock();
  clockOff = true;
  time = 0;
  DisplayTime();
  matched = 0;
}

function resetStars(){
  const starList = document.querySelectorAll('.stars li');
  for (let star of starList) {
    if(star.style.visibility = 'hidden') {
      star.style.visibility = 'visible';
    }
  }
}

function resetMoves(){
  moves = 0;
  const movesReset = document.querySelector('.moves');
  movesReset.innerHTML = moves;
}

function resetCards() {
  const cards = document.querySelectorAll('.deck li');
  for (let card of cards) {
    card.className = 'card';
  }
}
