// utilizei o defer no script
//window.addEventListener('load', start);

var inputCurrentFrequency = document.querySelector('#inputCurrentFrequency');
var rangeFrequencies = document.querySelector('#rangeFrequencies');
var divPodcast = document.querySelector('#divPodcast');

function start() {
  console.log('DOM carregado');
  rangeFrequencies.addEventListener('input', handleRangeValueChange);
}

function handleRangeValueChange(event) {
  var currentFrequency = event.target.value;
  //console.log(event.target.value);
  inputCurrentFrequency.value = currentFrequency + ' Mhz';

  findPodcastFrom(currentFrequency);
}

function findPodcastFrom(frequency) {
  var foundPodcast = null;
  //console.log(realPodcasts);
  for (i = 0; i < realPodcasts.length; i++) {
    var currentPodcast = realPodcasts[i];

    if (currentPodcast.id === frequency) {
      //console.log('Tem podcast aqui.');
      foundPodcast = currentPodcast;
      break;
    }
  }
  if (!!foundPodcast) {
    //console.log('achei.');
    renderPodcast(foundPodcast);
    //divPodcast.innerHTML = '<p> Podcast encontrado. </p>';
  } else {
    divPodcast.innerHTML = '<p> Nenhum podcast encontrado. </p>';
  }
}

function renderPodcast() {
  divPodcast.innerHTML = '';

  var img = document.createElement('img');
  img.src = './img/' + podcast.img;
  img.alt = 'Podcast' + podcast.title;
  img.title = 'Podcast' + podcast.title;

  var title = document.createElement('h2');
  title.textContent = podcast.title;

  var description = document.createElement('h2');
  description.textContent = podcast.description;

  divPodcast.appendChild(img);
  divPodcast.appendChild(title);
  divPodcast.appendChild(description);
}
// se eu não invocar o start o js não funciona
start();
