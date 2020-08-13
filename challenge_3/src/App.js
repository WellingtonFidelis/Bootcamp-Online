import React, { Component } from 'react';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      allCountries: [],
    };
  }

  // good place to make requests http
  async componentDidMount() {
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await response.json();

    // console.log(json);

    const allCountries = json.map(({ name, numericCode, flag, population }) => {
      return {
        id: numericCode,
        name,
        flag,
        population,
      };
    });

    this.setState({
      // allCountries: allCountries,
      allCountries,
    });

    // console.log(allCountries);
  }

  render() {
    const { allCountries } = this.state;

    return (
      <div className="container">
        <h1>React countries</h1>
      </div>
    );
  }
}
