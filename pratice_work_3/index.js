import { promises as fs } from 'fs';

const States = [];
const Cities = [];

const init = async () => {
  try {
    // getting all states
    const responseStates = await fs.readFile('Estados.json');
    let dataStates = JSON.parse(responseStates);
    // console.log(dataStates[0]);

    // getting all citties
    const responseCities = await fs.readFile('Cidades.json');
    let dataCities = JSON.parse(responseCities);
    // console.log(dataCities[0]);

    // pushing in the states all the states
    dataStates.forEach((state) => {
      States.push({ id: state.ID, uf: state.Sigla, name: state.Nome });
    });
    //console.log(States);

    // pushing in the citites all the cities
    dataCities.forEach((city) => {
      Cities.push({ id: city.ID, name: city.Nome, idState: city.Estado });
    });
    // console.log(Cities);

    console.log(toReturn5LastSmallPopulousState());
  } catch (error) {
    console.log(error);
  }
};

init();

function unionCitiesOfStates() {
  //finding all cities of each state
  let citiesOfState = [];
  Cities.forEach((city) => {
    States.find((state) => {
      if (state.id === city.idState) {
        citiesOfState.push({
          idState: state.id,
          uf: state.uf,
          idCity: city.id,
          nameCity: city.name,
          idStateCity: city.idState,
        });
      }
    });
  });
  // console.log(citiesOfState);
  return citiesOfState;
}

function toCountTotalOfCitiesByState() {
  // montar um array para gravar as uf e a quantidade de cidades de cada
  let quantityCitiesUf = [];
  States.forEach((state) => {
    // console.log(state.uf);
    // console.log(toCountNumberOfCities(state.uf));
    quantityCitiesUf.push({
      ufState: state.uf,
      totalCities: toCountNumberOfCities(state.uf),
    });
  });
  quantityCitiesUf.sort((a, b) => {
    return b.totalCities - a.totalCities;
  });

  return quantityCitiesUf;
}

async function createFilesJson(fileName, object) {
  await fs.writeFile(file, JSON.stringify(object, null, 2));
}
// exercise 1
function exportStatesWithCities() {
  States.forEach((state) => {
    //console.log(state.id);
    let uf = state.uf;
    let file = `${uf}.json`;
    let object = [];
    unionCitiesOfStates().forEach((city) => {
      if (state.id === city.idState) {
        // console.log(`${city.nameCity}, ${city.uf}`);
        // console.log(States.length);

        object.push({
          idState: city.idState,
          // uf: city.uf,
          idCity: city.idCity,
          nameCity: city.nameCity,
          // idStateCity: city.idStateCity,
        });
        // console.log(object[0].idState);
        // console.log(uf);
        // console.log(file);
      }
    });
    createFilesJson(file, object);
  });
}
// exercise 2
function toCountNumberOfCities(uf) {
  let param = uf;
  let quantity = 0;
  unionCitiesOfStates().forEach((state) => {
    if (state.uf === param) {
      // console.log(state.uf);
      // console.log(param);
      quantity++;
    }
  });

  return quantity;
}
// execise 3
function toReturn5FirstBiggerPopulousState() {
  return toCountTotalOfCitiesByState().slice(0, 5);
}
// exercise 4
function toReturn5LastSmallPopulousState() {
  return toCountTotalOfCitiesByState()
    .reverse()
    .slice(0, 5)
    .sort((a, b) => {
      return b.totalCities - a.totalCities;
    });
}
// exercise 5
function toReturnBigCitiesEachState() {
  // console.log(unionCitiesOfStates()[0].nameCity.length);

  let listOfSizeOfCities = [];
  let cityOfBiggerSize = [];
  let id = 0;

  // console.log(States.length);

  States.forEach((state) => {
    // console.log(state.uf);
    let uf = state.uf;
    let validation = false;
    unionCitiesOfStates().forEach((city) => {
      if (uf == city.uf) {
        // console.log(city.nameCity.length);
        listOfSizeOfCities.push({
          nameCity: city.nameCity,
          sizeNameCity: city.nameCity.length,
          uf: city.uf,
        });
        listOfSizeOfCities.sort((a, b) => {
          return b.sizeNameCity - a.sizeNameCity;
        });
      }
    });
    listOfSizeOfCities.forEach((registro) => {
      if (!validation) {
        if (uf == registro.uf) {
          validation = true;
          id++;
          cityOfBiggerSize.push({
            id: id,
            nameCity: registro.nameCity,
            sizeNameCity: registro.sizeNameCity,
            uf: registro.uf,
          });
          // return console.log(cityOfBiggerSize);
        }
      }
    });
    /* 
    listOfSizeOfCities.every((list) => {
      if (uf == list.uf) {
        console.log(listOfSizeOfCities);
      }
    }); */
    /* if (uf == ) {}
    cityOfBiggerSize.push(); */
    /* listOfSizeOfCities.forEach((list) => {
      if (uf == list.uf) {
        return console.log(list[0].nameCity);
      }
    }); */
  });

  return cityOfBiggerSize;
}
// exercise 6
function toReturnSmallCitiesEachState() {
  // console.log(unionCitiesOfStates()[0].nameCity.length);

  let listOfSizeOfCities = [];
  let cityOfBiggerSize = [];
  let id = 0;

  // console.log(States.length);

  States.forEach((state) => {
    // console.log(state.uf);
    let uf = state.uf;
    let validation = false;
    unionCitiesOfStates().forEach((city) => {
      if (uf == city.uf) {
        // console.log(city.nameCity.length);
        listOfSizeOfCities.push({
          nameCity: city.nameCity,
          sizeNameCity: city.nameCity.length,
          uf: city.uf,
        });
        listOfSizeOfCities.sort((a, b) => {
          return b.sizeNameCity - a.sizeNameCity;
        });
        listOfSizeOfCities.reverse();
      }
    });
    listOfSizeOfCities.forEach((registro) => {
      if (!validation) {
        if (uf == registro.uf) {
          validation = true;
          id++;
          cityOfBiggerSize.push({
            id: id,
            nameCity: registro.nameCity,
            sizeNameCity: registro.sizeNameCity,
            uf: registro.uf,
          });
          // return console.log(cityOfBiggerSize);
        }
      }
    });
    /* 
    listOfSizeOfCities.every((list) => {
      if (uf == list.uf) {
        console.log(listOfSizeOfCities);
      }
    }); */
    /* if (uf == ) {}
    cityOfBiggerSize.push(); */
    /* listOfSizeOfCities.forEach((list) => {
      if (uf == list.uf) {
        return console.log(list[0].nameCity);
      }
    }); */
  });

  return cityOfBiggerSize;
}
// exercise 7
function toReturnBigCityOfAllStates() {
  return unionCitiesOfStates()
    .sort((a, b) => {
      return b.nameCity.length - a.nameCity.length;
    })
    .slice(0, 1);
}
// exercise 8
function toReturnSmallCityOfAllStates() {
  const list = [];

  unionCitiesOfStates()
    .sort((a, b) => {
      return b.nameCity.length - a.nameCity.length;
    })
    .reverse()
    .slice(0, 20)
    .sort((a, b) => {
      return b.nameCity.length - a.nameCity.length;
    })
    .filter((registro) => {
      if (registro.nameCity.length == 3) {
        list.push({
          nameCity: registro.nameCity,
        });
      }
    });

  return list;
}
