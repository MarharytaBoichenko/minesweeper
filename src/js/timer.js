import endTheGame from './endTheGame';
// const setTime = () => {
//   let minutes = 1;
//   let seconds = 0;
//   const minutesEl = document.querySelector('.minutes');
//   const secondsEl = document.querySelector('.seconds');

//   const timerId = setInterval(() => {
//     seconds += 1;
//     if (seconds > 59) {
//       minutes -= 1;
//       seconds = 0;
//     }
//     minutesEl.innerHTML = minutes;
//     secondsEl.innerHTML = seconds;
//   }, 1000);
//   setTimeout(() => {
//     clearInterval(timerId); console.log('time is over setTimeout');
//     minutesEl.innerHTML = 0;
//     secondsEl.innerHTML = 0;
//   }, 60000);
// };

export const timer = {
  minutes: 0,
  seconds: 0,
};
// let minutes = 0;
// let seconds = 0;
// const minutesEl = document.querySelector('.minutes');
// const secondsEl = document.querySelector('.seconds');

export const updateTime = (minEl, secEl) => {
  // console.log(minEl);
  // console.log(secEl);
  console.log('minutes', timer.minutes);
  console.log('seconds', timer.seconds);
  timer.seconds += 1;
  if (timer.seconds > 59) {
    timer.minutes -= 1;
    timer.seconds = 0;
  }

  minEl.innerHTML = timer.minutes;
  secEl.innerHTML = timer.seconds;
};

//  const timerId = setInterval(() => {
//   updateTime(minutesEl, secondsEl);
// }, 1000);

export const deleteTime = (id, minEl, secEl) => {
  clearInterval(id); console.log('time is over setTimeout');
  minEl.innerHTML = 0;
  secEl.innerHTML = 0;
};
// setTimeout(() => {
//   deleteTime(timerId);
// }, 60000);

// export default setTime;
