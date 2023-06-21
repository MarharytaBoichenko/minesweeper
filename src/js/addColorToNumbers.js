const addColorToNumbers = (number, cell) => {
  switch (number) {
    case '1':
      cell.classList.add('one');
      break;
    case '2':
      cell.classList.add('two');
      break;
    case '3':
      cell.classList.add('three');
      break;
    case '4':
      cell.classList.add('four');
      break;
    default:
      console.log('no color');
  }
};
export default addColorToNumbers;
