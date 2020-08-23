import React from 'react';

import './styles.css';

export default function Form() {
  const [initialMontant, setInitialMontant] = React.useState(100);
  const [interestRates, setInterestRates] = React.useState(0);
  const [monthPeriod, setMonthPeriod] = React.useState(0);

  const [result, setResult] = React.useState([]);

  React.useEffect(() => {
    /*
    
      parei aqui, falta 
      [] mostrar os cards de acordo com a quantidade de meses
      [] mostrar, nos cards, o resultado, a rentabilidade e a % da rentabilidade
    
    */
  }, [initialMontant, interestRates, monthPeriod]);

  const handleGetInitialMontant = ({ target }) => {
    let newInitialMontant = Number(target.value);
    setInitialMontant(newInitialMontant);
  };

  const handleGetInterestRates = ({ target }) => {
    let newInterstRates = Number(target.value);
    setInterestRates(newInterstRates);
  };

  const handleGetMonthPeriod = ({ target }) => {
    let newMonthPeriod = Number(target.value);
    setMonthPeriod(newMonthPeriod);

    setResult(calculateInterestCompound());
    console.log(result);
  };

  const calculateInterestCompound = () => {
    let resultOfInterestCompost = 0;
    let value = initialMontant;
    let rate = interestRates / 100;
    let period = monthPeriod;

    resultOfInterestCompost = value * Math.pow(1 + rate, period);
    // M = C (1+i)t
    console.log(resultOfInterestCompost.toFixed(2) + '  result');

    let newResult = [...result];

    for (let i = 1; i < period; i++) {
      newResult.push({
        idMonth: i,
        result: resultOfInterestCompost,
        rentability: resultOfInterestCompost - value,
        percentRentability:
          ((resultOfInterestCompost - value) / resultOfInterestCompost) * 100,
      });
    }

    return newResult;
  };

  return (
    <>
      <div className="jumbotron">
        <header>
          <h2 className="display-3 text-center">Cálulo de Juros Compostos</h2>
        </header>
        <form action="">
          <div className="row lineInputs">
            <div className="form-group col-md-4">
              <label htmlFor="inputInitalMontant" className="font-weight-bold">
                Montante inicial
              </label>
              <input
                type="number"
                name="inputInitalMontant"
                id="inputInitalMontant"
                className="form-control form-control-lg"
                min="100"
                value={initialMontant}
                onChange={handleGetInitialMontant}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputInterestRates" className="font-weight-bold">
                Taxa de Juros Mensal
              </label>
              <input
                type="number"
                name="inputInterestRates"
                id="inputInterestRates"
                className="form-control form-control-lg"
                min="-12"
                max="12"
                value={interestRates}
                onChange={handleGetInterestRates}
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="inputMonthPeriods" className="font-weight-bold">
                Periódos (Meses)
              </label>
              <input
                type="number"
                name="inputMonthPeriods"
                id="inputMonthPeriods"
                className="form-control form-control-lg"
                min="1"
                value={monthPeriod}
                onChange={handleGetMonthPeriod}
              />
            </div>
          </div>
        </form>
        <div className="container" style={{ marginTop: '30px' }}>
          {result.map(
            ({ result, rentability, percentRentability, idMonth }) => {
              return (
                monthPeriod > 0 && (
                  <div key={idMonth} className="d-inline-flex">
                    <div className="p-2 bd-highlight cards-results">
                      <p>Total: ${result.toFixed(2)}</p>
                      <p>Rent: ${rentability.toFixed(2)}</p>
                      <p>%: ${percentRentability.toFixed(2)}</p>
                    </div>
                  </div>
                )
              );
            }
          )}
        </div>
      </div>
    </>
  );
}
