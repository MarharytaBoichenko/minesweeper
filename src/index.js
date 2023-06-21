import './css/main.scss';
import { saveToLocalStorage, getFromLocalStorage } from './js/helpers';
import createField from './js/markup';
import addColorToNumbers from './js/addColorToNumbers';
import { playMusic } from './js/playAudio';
import winTheGame from './js/winTheGame';
import flagSound from './audio/flag.wav';
import clickedSound from './audio/clicked.wav';
import bombSound from './audio/mine.wav';
import soundOn from './images/icons8-sound-24.svg';
import soundOff from './images/icons8-sound-off-26.svg';

const game = {
  seconds: 60,
  click: 0,
  flags: 0,
  width: 10,
  cellsArray: [],
  minesQuantity: 10,
  minutes: 9,
  clickedCells: 0,
  isTheEnd: false,
};

const theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const { LIGHT, DARK } = theme;

const setNumbersOfMines = () => {
  for (let i = 0; i < game.cellsArray.length; i += 1) {
    // check is cell the left /right side of  the  field and  if it has  mine on one of its  side
    let total = 0; // quantity of mines around
    const isRightSideCell = i % game.width === game.width - 1;
    const isLeftSideCell = i % game.width === 0;

    if (game.cellsArray[i].classList.contains('empty')) {
      // check  surrounding  cells
      // left
      if (i > 0 && !isLeftSideCell && game.cellsArray[i - 1].classList.contains('mine')) total++;
      // north west
      if (i > 9 && !isRightSideCell && game.cellsArray[i + 1 - game.width].classList.contains('mine')) total++;
      // top
      if (i > 10 && game.cellsArray[i - game.width].classList.contains('mine')) total++;
      // north east
      if (i > 11 && !isLeftSideCell && game.cellsArray[i - 1 - game.width].classList.contains('mine')) total++;
      // right
      if (i < 98 && !isRightSideCell && game.cellsArray[i + 1].classList.contains('mine')) total++;
      // south west
      if (i < 90 && !isLeftSideCell && game.cellsArray[i - 1 + game.width].classList.contains('mine')) total++;
      // south east
      if (i < 88 && !isRightSideCell && game.cellsArray[i + 1 + game.width].classList.contains('mine')) total++;
      //
      if (i < 89 && game.cellsArray[i + game.width].classList.contains('mine')) total++;

      game.cellsArray[i].setAttribute('data-count', total);
    }
  }
};

const endTheGame = () => {
  document.querySelector('.info').classList.remove('hidden'); // const info = document

  for (let i = 0; i < game.cellsArray.length; i++) {
    if (game.cellsArray[i].classList.contains('mine')) {
      game.cellsArray[i].classList.add('fire');
      game.cellsArray[i].innerHTML = '💣';
      game.cellsArray[i].classList.replace('mine', 'clicked');
    }
    game.cellsArray[i].disabled = true;
  }
  game.isTheEnd = true;
};

const onCellClick = (cell) => {
  const currentId = Number(cell.getAttribute('data-id'));
  if (game.isTheEnd) return;
  if (cell.classList.contains('clicked') || cell.classList.contains('flag')) return;
  if (cell.classList.contains('mine')) {
    playMusic(bombSound);
    endTheGame();
    document.querySelector('.field').classList.add('end');
    clearTimeout(game.timerId);
  } else {
    game.clickedCells += 1;
    playMusic(clickedSound);
    cell.classList.add('clicked');
    const quantityOfMines = cell.getAttribute('data-count');
    if (quantityOfMines !== '0') {
      cell.innerHTML = quantityOfMines;
      addColorToNumbers(quantityOfMines, cell);
    } else {
      checkNeighbour(currentId);
    }
  }
  if (game.clickedCells + game.minesQuantity === game.width * game.width) {
    winTheGame(game);
  }
};

function checkNeighbour(currentId) {
  const isLeftEdge = (currentId % game.width === 0);
  const isRightEdge = (currentId % game.width === game.width - 1);
  setTimeout(() => {
    if (currentId > 0 && !isLeftEdge) {
      const newId = game.cellsArray[currentId - 1].dataset.id;
      const newCell = document.querySelector(`div[data-id="${newId}"]`);
      onCellClick(newCell);
    }
    if (currentId > 9 && !isRightEdge) {
      const newId = game.cellsArray[currentId + 1 - game.width].dataset.id;
      const newCell = document.querySelector(`div[data-id="${newId}"]`);
      onCellClick(newCell);
    }
    if (currentId > 10) {
      const newId = game.cellsArray[currentId - game.width].dataset.id;
      const newCell = document.querySelector(`div[data-id="${newId}"]`);
      onCellClick(newCell);
    }
    if (currentId > 11 && !isLeftEdge) {
      const newId = game.cellsArray[currentId - 1 - game.width].dataset.id;
      const newCell = document.querySelector(`div[data-id="${newId}"]`);
      onCellClick(newCell);
    }
    if (currentId < 98 && !isRightEdge) {
      const newId = game.cellsArray[currentId + 1].dataset.id;
      const newCell = document.querySelector(`div[data-id="${newId}"]`);
      onCellClick(newCell);
    }
    if (currentId < 90 && !isLeftEdge) {
      const newId = game.cellsArray[currentId - 1 + game.width].dataset.id;
      const newCell = document.querySelector(`div[data-id="${newId}"]`);
      onCellClick(newCell);
    }
    if (currentId < 88 && !isRightEdge) {
      const newId = game.cellsArray[currentId + 1 + game.width].dataset.id;
      const newCell = document.querySelector(`div[data-id="${newId}"]`);
      onCellClick(newCell);
    }
    if (currentId < 89) {
      const newId = game.cellsArray[currentId + game.width].dataset.id;
      const newCell = document.querySelector(`div[data-id="${newId}"]`);
      onCellClick(newCell);
    }
  }, 10);
}

const setFlag = (cell) => {
  if (!cell.classList.contains('clicked') && (game.flags < game.minesQuantity)) {
    if (cell.classList.contains('flag')) {
      cell.classList.remove('flag');
      game.flags -= 1;
      cell.innerHTML = '';
      // set count  of mines
    } else {
      cell.classList.add('flag');
      game.flags += 1;
      cell.innerHTML = ' 🚩';
      playMusic(flagSound);
      // set count  of mines
    }
    document.querySelector('.flag-number').innerHTML = game.flags;
    document.querySelector('.bomb-number').innerHTML = game.minesQuantity - game.flags;
  }
};

const createCells = () => {
  for (let i = 0; i < game.width * game.width; i += 1) {
    const cell = document.createElement('div');
    cell.setAttribute('data-id', i);
    cell.classList.add('cell');
    document.querySelector('.field').appendChild(cell);
    cell.addEventListener('click', () => {
      game.click += 1;
      document.querySelector('.click-number').innerHTML = game.click;
      onCellClick(cell);
    });
    cell.oncontextmenu = (e) => {
      e.preventDefault();
      setFlag(cell);
    };
    game.cellsArray.push(cell);
  }
};

const playTheGame = () => {
  const page = createField();
  const body = document.querySelector('body');
  body.innerHTML = page;
  const minutesEl = document.querySelector('.minutes');
  const secondsEl = document.querySelector('.seconds');
  const field = document.querySelector('.field');
  const inputChangeTheme = document.querySelector('.theme-toggle');
  const soundChange = document.querySelector('.sound-icon');

  document.querySelector('.bomb-input').addEventListener('change', () => {
    game.minesQuantity = Number(document.querySelector('.bomb-input').value);
  });

  createCells();

  /// get /set  current theme
  if (!localStorage.theme) {
    body.classList.add(LIGHT);
    saveToLocalStorage('theme', LIGHT);
  }
  const currentTheme = getFromLocalStorage('theme');

  if (currentTheme === DARK) {
    inputChangeTheme.checked = true;
    body.classList.add(DARK);
    body.classList.remove(LIGHT);
  }

  const changeTheme = () => {
    if (inputChangeTheme.checked) {
      body.classList.add(DARK);
      body.classList.remove(LIGHT);
      saveToLocalStorage('theme', DARK);
    } else {
      body.classList.add(LIGHT);
      body.classList.remove(DARK);
      saveToLocalStorage('theme', LIGHT);
    }
  };
  inputChangeTheme.addEventListener('change', changeTheme);

  // set sound
  const soundCheckbox = document.querySelector('#sound-toggle');
  if (!localStorage.isSound) {
    soundCheckbox.setAttribute('checked', true);
    soundChange.src = `${soundOn}`;
    saveToLocalStorage('isSound', 'true');
  }

  const isSoundOn = getFromLocalStorage('isSound');
  if (isSoundOn === 'true') {
    soundCheckbox.checked = true;
    soundChange.src = `${soundOn}`;
  }

  const changeSoundMode = () => {
    if (soundCheckbox.checked) {
      soundChange.src = `${soundOn}`;
      saveToLocalStorage('isSound', 'true');
    } else {
      soundCheckbox.removeAttribute('checked');
      soundChange.src = `${soundOff}`;
      saveToLocalStorage('isSound', 'false');
    }
  };
  soundCheckbox.addEventListener('change', changeSoundMode);

  const onFirstClick = (e) => {
    const firstCell = e.target;
    const firstCellId = firstCell.dataset.id;
    /// here  we need  to place  mines and empty cells to the  field
    const minesArr = Array(game.minesQuantity).fill('mine');
    const emptyArr = Array(game.width * game.width - game.minesQuantity).fill('empty');

    const allCellsShuffled = [...minesArr, ...emptyArr].sort(() => Math.random() - 0.5);

    for (let i = 0; i < game.cellsArray.length; i += 1) {
      if (game.cellsArray[i].dataset.id !== firstCellId) {
        game.cellsArray[i].classList.add(allCellsShuffled[i]);
      } else { game.cellsArray[i].classList.add('empty'); }
    }
    setNumbersOfMines();
    // set timer for game
    const setTime = () => {
      game.seconds -= 1;
      if (game.seconds === 0) {
        game.minutes -= 1;
        game.seconds = 59;
      }
      minutesEl.innerHTML = game.minutes.toString().padStart(2, '0');
      secondsEl.innerHTML = game.seconds.toString().padStart(2, '0');

      if (game.minutes < 0) {
        minutesEl.innerHTML = '00';
        secondsEl.innerHTML = '00';
        endTheGame();
        clearTimeout(game.timerId);
        field.classList.add('end');
      } else {
        game.timerId = setTimeout(setTime, 1000);
      }
    };
    setTime();

    field.removeEventListener('click', onFirstClick);
  };
  field.addEventListener('click', onFirstClick);

  const restartGame = () => {
    document.querySelector('.info').classList.add('hidden');
    game.cellsArray = [];
    game.minutes = 9;
    game.seconds = 60;
    game.click = 0;
    game.minesQuantity = 10;
    game.flags = 0;
    game.clickedCells = 0;
    document.querySelector('.click-number').innerHTML = game.click;
    game.isTheEnd = false;
    playTheGame();
  };

  document.querySelector('.restart').addEventListener('click', restartGame);
};

playTheGame();
