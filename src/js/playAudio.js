import { getFromLocalStorage } from './helpers';

let music = new Audio();

export function playMusic(src) {
  music = new Audio(src);
  music.volume = 0.5;
  const mode = getFromLocalStorage('isSound');
  if (mode === 'false') {
    music.pause();
  } else {
    music.play();
  }
}
