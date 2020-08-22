import React from 'react';

import './styles.css';

export default function Form() {
  const [initialMontant, setInitialMontant] = React.useState(100);
  const [interestRates, setInterestRates] = React.useState(0);
  const [monthPeriod, setMonthPeriod] = React.useState(1);

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
  };

  React.useEffect(() => {
    let resultOfInterestCompost = 0;
    let value = initialMontant;
    let rate = interestRates / 100;
    let period = monthPeriod;

    resultOfInterestCompost = value * Math.pow(1 + rate, period);
    // M = C (1+i)t
    console.log(resultOfInterestCompost.toFixed(2) + '  result');

    /*
    
      parei aqui, falta 
      [] mostrar os cards de acordo com a quantidade de meses
      [] mostrar, nos cards, o resultado, a rentabilidade e a % da rentabilidade
    
    */
  }, [initialMontant, interestRates, monthPeriod]);

  return (
    <>
      <div className="jumbotron">
        <header>
          <h2 className="display-3 text-center">Cálulo de Juros Compostos</h2>
        </header>
        <form action="">
          <div className="row lineInputs">
            <div className="form-group col-md-4">
              <label htmlFor="inputInitalMontant">Montante inicial</label>
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
              <label htmlFor="inputInterestRates">Taxa de Juros Mensal</label>
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
              <label htmlFor="inputMonthPeriods">Periódos (Meses)</label>
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
        <div className="container">
          <div>
            <p>total</p>
            <p>rentabilidade</p>
            <p>% rentabilidade</p>
          </div>
        </div>
      </div>
    </>
  );
}
