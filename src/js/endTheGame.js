const endTheGame = (arr) => {
  const info = document.createElement('div');
  info.textContent = 'Game over. Try again';
  info.classList.add('info');
  const restartBtn = document.createElement('div');
  restartBtn.classList.add('restart');
  restartBtn.textContent = 'Restart';
  document.querySelector('body').appendChild(info);
  document.querySelector('body').appendChild(restartBtn);

  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].classList.contains('mine')) {
      arr[i].classList.add('fire');
      arr[i].innerHTML = '💣';
      arr[i].classList.replace('mine', 'clicked');
    }
  }
};

export default endTheGame;
