/*
  start application
*/

let totalUsers = 0;
let totalMales = 0;
let totalFemales = 0;
let sumAges = 0;
let averageAges = 0;

let colContacts = null;
let colMeasures = null;
let texttyped = null;

let allUsers = [];

window.addEventListener('load', () => {
  console.log('DOM loaded!');
  colContacts = document.querySelector('#colContacts');
  colMeasures = document.querySelector('#colMeasures');
  texttyped = document.querySelector('#inputSearch');

  texttyped.addEventListener('keyup', function (event) {
    console.log(event.key);
  });

  fetchUsers();
});

async function fetchUsers() {
  const response = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await response.json();
  allUsers = json.results.map((users) => {
    const { gender, name, idade, img } = users;
    return {
      gender: gender,
      name: `${name.first} ${name.last}`,
      idade: users.dob.age,
      img: users.picture.thumbnail,
    };
  });

  console.log(json.results[0].dob.age);
  console.log(json.results[0]);
  console.log(allUsers[0]);
  callRender();
}

function callRender() {
  renderUserList();
}

function renderUserList() {
  //function to put in order all users
  allUsers.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  let usersHTML = `<div>`;
  allUsers.forEach((users) => {
    const { gender, name, idade, img } = users;
    const userHTML = `
      <div id="user">
        <div>
          <img src="${img}">
        </div>
        <div>
          <ul>
            <li>${name}</li>
            <li>${idade}</li>
          </ul>
        </div>
      </div>
    `;
    usersHTML += userHTML;
  });
  usersHTML += `</div>`;
  colContacts.innerHTML = usersHTML;
}

function handleFilterSearch(letter) {
  allUsers = allUsers.filter((user) => {
    return user.name.toLowerCase().includes(letter);
  });
}

function renderMeasures() {}
