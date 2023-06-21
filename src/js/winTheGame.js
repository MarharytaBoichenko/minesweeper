import { playMusic } from './playAudio';
import winnerSound from '../audio/winner.wav';

const winTheGame = (game) => {
  clearTimeout(game.timerId);
  const secondsToMessage = 600 - (game.minutes * 60 + game.seconds);
  document.querySelector('.info').textContent = `"Hooray! You found all mines in ${secondsToMessage} seconds and ${game.click} moves!"`;
  document.querySelector('.info').classList.remove('hidden');
  playMusic(winnerSound);
  game.isTheEnd = true;
};
export default winTheGame;
