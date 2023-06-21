import soundOff from '../images/icons8-sound-off-26.svg';

const createField = () => {
  const markup = `
  <div class="controls">
  <div class="theme-control">
        <input class="theme-toggle" type="checkbox" name="theme" id="theme-toggle"/>
        <label aria-hidden="true" class="theme-track" for="theme-toggle"> </label>
        <div aria-hidden="true" class="theme-marker"></div>
  </div>
  <input type="number" name="bomb-number" class="bomb-input" min="10" placeholder="qny 💣";>
   <div class="sound-control">
        <input class="sound-toggle" type="checkbox"  name="sound"  id="sound-toggle"/>
        <label aria-hidden="true" class="sound-label" for="sound-toggle">
    <img class="sound-icon" src="${soundOff}">
  </div>
  </div>
  <div class="game">
    <div class="wrapper">
      <div class="bombs"><span class="bomb-icon"></span><span class="bomb-number">10</span></div>
      <div class="timer"><span class="minutes">10</span><span class="divider">:</span><span class="seconds">00</span></div>
      <div class="click"><span class="click-text">Clicks </span><span class="click-number">0</span></div>
      <div class="flags"><span class="flag-icon"></span><span class="flag-number">00</span></div>
    </div>
    <div class="field"></div>
  </div>
  <div class=" end-info"><div class="hidden  info">Game over. Try again</div>
  <div class="restart">Restart</div></div>
  `;
  return markup;
};

export default createField;
