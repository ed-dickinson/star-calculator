// let gameBoard =
// Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.



const counterSpaces = document.querySelectorAll('.counter');
const selectSquares = document.querySelectorAll('.squares');
const selectSquareArray = Array.from(selectSquares);
const coinStack = document.querySelector('.coin-stack');
const sickleStack = document.querySelector('.sickle-stack');
const logicSpaceArray = [];

const testbox = document.querySelector('.testbox');

const coins = document.querySelectorAll('.counter.coin');
const sickles = document.querySelectorAll('.counter.sickle');
let turnCounter = 1;

const Player = (name, side) => {
  const getName = () => name;
  const getSide = () => side;
  const winPhrase = () => {
    return 'A victory for ' + side + '! ' + (side == 'Capitalism' ? "The commies didn't stand a chance." : 'Down with those capitalist pigs.');
  };
  const samename = name;
  return {winPhrase, samename}
};

const computer = Player('West', 'Capitalism');
const human = Player('East', 'Communism');

// console.log();
testbox.innerHTML = human.samename + human.winPhrase();

const Counter = (type, numberFromTop) => {
  const pilePosition = {x: numberFromTop, y: 69};
  return {pilePosition};
};

const Space = (number) => {
  //1 6 11
  const boardPosition = {
    x: number == 0 || number == 3 || number == 6 ? 1 :
        number == 1 || number == 4 || number == 7 ? 6 : 11,
    y: number < 3 ? 1 : number < 6 ? 6 : 11
    // x: selectSquares[number].style.left, y: selectSquares[number].style.top
    };
  return {boardPosition};
}



const testcounter = Counter('Coin', 1);
const testspace = Space(1);

console.log(testspace);

function animateCounter(counter, start, end, intro) {
  let id = null;
  let timer = 0;
  let length = 20;

  let progress = 0;
  let moveX = end[0] - start[0];
  let moveY = end[1] - start[1];

  clearInterval(id);
  id = setInterval(frame, 20);

  function frame() {
    if (timer == length+1) {
      clearInterval(id);
    } else {
      progress = timer / length;
      counter.style.top = start[1] + (moveY * progress) + 'em';
      counter.style.left = start[0] + (moveX * progress) + 'em';
      timer++;
    }
  }
}

function loadCounters(counters) {
  let homeY = 18;
  if (counters == coins) {
    homeY = -6;
  };
  let iterate = 0;
  counters.forEach(counter => {
    animateCounter(counter, [homeY,(-10 - iterate*12)], [homeY,10-iterate], true);
    iterate++;
  });
}

loadCounters(coins);
loadCounters(sickles);


// console.log(coins);

// console.log(counterSpaces);

function reset() {
  counterSpaces.forEach(space => {
    space.classList.add('blank');
    space.classList.remove('sickle');
    space.classList.remove('coin');
  });
}

function test() {
  let el = document.querySelector('.coin');
  console.log(el.style.top);
  console.log(sickleStack);
  // el.removeChild = sickleStack.offsetTop;
}

document.getElementById('test-button').addEventListener('click', test);

function userMove(e) {
  let chosenSquare = selectSquareArray.indexOf(e.target);
  animateCounter(coins)
  console.log(chosenSquare);
}

let ssIterator = 0;
selectSquares.forEach(square => {
  square.addEventListener('click', userMove);
  logicSpaceArray.push(Space(ssIterator));
  ssIterator++;
})
console.log(logicSpaceArray);

// console.log(counterSpaces);

// reset();
