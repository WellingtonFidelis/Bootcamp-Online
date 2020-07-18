window.addEventListener('load', start);

// naming all variable immutables
const rangeRedValues = document.querySelector('#rangeRedValues');
const rangeGreenValues = document.querySelector('#rangeGreenValues');
const rangeBlueValues = document.querySelector('#rangeBlueValues');
const inputRedValues = document.querySelector('#inputRedValues');
const inputGreenValues = document.querySelector('#inputGreenValues');
const inputBlueValues = document.querySelector('#inputBlueValues');
//const spanSquareColor = document.getElementById('spanSquareColor');
const spanSquareColor = document.querySelector('#spanSquareColor');

function start() {
  console.log('Loaded DOM!');
  setInitialValueInputs();
  rangeRedValues.addEventListener('input', handleRangeRedValues);
  rangeGreenValues.addEventListener('input', handleRangeGreenValues);
  rangeBlueValues.addEventListener('input', handleRangeBlueValues);
  setColorRGB();
}

function handleRangeRedValues(event) {
  //console.log(event.target.value);
  inputRedValues.value = event.target.value;
  setColorRGB();
}
function handleRangeGreenValues(event) {
  //console.log(event.target.value);
  inputGreenValues.value = event.target.value;
  setColorRGB();
}
function handleRangeBlueValues(event) {
  //console.log(event.target.value);
  inputBlueValues.value = event.target.value;
  setColorRGB();
}

function setColorRGB() {
  let r = inputRedValues.value;
  let g = inputGreenValues.value;
  let b = inputBlueValues.value;
  spanSquareColor.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  //console.log(spanSquareColor.style.cssText);
}

function setInitialValueInputs() {
  inputRedValues.value = rangeRedValues.value;
  inputGreenValues.value = rangeGreenValues.value;
  inputBlueValues.value = rangeBlueValues.value;
}
// se usar o defer no <script defer> preciso chamar a função start
// e apagar a linha de wwindow.addEventListener('load', start);
//start();
