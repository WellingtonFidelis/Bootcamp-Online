let users = [];
let usersSearched = [];

let totalUsersSearched = 0;
let female = 0;
let male = 0;
let sumAge = 0;
let averageAge = 0;

let inputSearch = document.querySelector('#inputSearch');
let buttonSearch = document.querySelector('#buttonSearch');

let colContacts = document.querySelector('#colContacts');
let colMeasures = document.querySelector('#colMeasures');

let textTyped = '';

window.addEventListener('load', render);

async function render() {
  //await fetchusers();
  console.time('quanto tempo? ');
  await promissePeople();
  console.timeEnd('quanto tempo? ');

  //hideSpinner();
  buscarusers();
}

function promissePeople() {
  return new Promise(async (resolve, reject) => {
    await fetchusers();
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

//se alimentando da api
async function fetchusers() {
  users = [];
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
    //'http://localhost:3001/results'
  );
  const json = await res.json();

  users = json.results.map((users) => {
    return {
      name:
        users.name.first.toLowerCase() + ' ' + users.name.last.toLowerCase(),
      age: users.dob.age,
      img: users.picture.large,
      gender: users.gender,
    };
  });
  console.log(users);

  //return users;
}

//buscando e alimentando vetor
function buscarusers() {
  buttonSearch.addEventListener('click', digitadoInputButton);
  inputSearch.addEventListener('keyup', digitadoInput);

  function digitadoInputButton() {
    textTyped = inputSearch.value.toLowerCase();
    textTyped = textTyped;
    if ((textTyped != '') & (textTyped.length > 0)) buscando(textTyped);
  }

  function digitadoInput(tecla) {
    if (tecla.key == 'Enter') {
      textTyped = inputSearch.value;
      if ((textTyped != '') & (textTyped.length > 0)) buscando(textTyped);
    }
  }
}

//buscando e alimentando vetor
function buscando(nameTyped) {
  //console.log(nameTyped);
  usersSearched = [];

  users.forEach(() => {
    usersSearched = users.filter((typed) => typed.nome.includes(nameTyped));

    // console.log(usersAchadas);
  });

  //console.log(usersAchadas);
  //console.log(usersSearched);

  totalUsersSearched = usersSearched.length;
  //console.log('total ' + totalUsersSearched);

  calcGenero();
  calcTotalIdade();
  calcMediaIdades();

  doForEachTela();
}

//calculos
function calcTotalIdade() {
  sumAge = usersSearched.reduce((accumulator, current) => {
    return accumulator + current.age;
  }, 0);
}

function calcMediaIdades() {
  averageAge = sumAge / usersSearched.length;
  console.log(usersSearched.length);
}

async function calcGenero() {
  female = 0;
  male = 0;
  usersSearched.forEach((gender) => {
    if (gender.genero === 'female') {
      female += 1;
    } else if (gender.genero === 'male') {
      male += 1;
    }
  });

  console.log('gender femino ' + female);
  console.log('gender Masculino ' + male);
}

//montar tela
function doForEachTela() {
  let pessoaParaTela = '';
  let pessoaTelaHTML = '';

  colContacts.innerHTML = '';

  pessoaParaTela = `    
  <div id="resultado">      
    <p>Total de usuarios encontrados: ${totalUsersSearched} </p>    
  </div>  `;

  usersSearched.forEach((person) => {
    pessoaTelaHTML = `
    <div class="card sticky-action">
    <div class="card-action">
       
        <div class="row center">
          <img class="row center" src="${person.foto}" alt="${person.nome}">
        </div
        <div class="flex-column">
        <ul class="collection">
           <li class="collection-item">Nome: ${person.nome}</li>
           <li class="collection-item">Idade: ${person.idade}</li>       
           <li class="collection-item">gender: ${person.genero}</li>
        </ul>
        </div>
        
    </div>    
    </div>
    `;
    pessoaParaTela += pessoaTelaHTML;
  });
  colContacts.innerHTML = pessoaParaTela;

  colMeasures.innerHTML = `
  <p>Estatísticas</p>
  <div class="card sticky-action">
  <div class="card-action">
    <p>gender feminino: ${female}</p>
    <p>gender Masculino: ${male}</p>
    <p>Soma das idade: ${sumAge}</p>
    <p>Média das idades ${Math.round(averageAge).toFixed(2)}</p>
  </div>
  </div>
  `;

  //render();
  //console.log('Resultado ' + colContacts);
  //console.log('Pessoa ' + pessoaParaTela);
}

function hideSpinner() {
  document.querySelector('#spinner').classList.add('hide');
  inputSearch.disabled = false;
  btnInput.disabled = false;
}
