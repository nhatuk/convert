import React from 'react';
import logo from '../logo.svg';
import '../App.scss';
  
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
  }

class TempInput extends React.Component{
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.props.onTempChange(event.target.value)
  }

  render() {
    return (
      <fieldset>
        <legend>ahihihi</legend>
        <input value={this.props.temp} onChange={this.handleChange}></input>
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      temp: '',
      scale: 'c',
      data: null,
      isLoaded: false,
      error: null
    }

    this.handleChangeCelsius = this.handleChangeCelsius.bind(this)
    this.handleChangeF = this.handleChangeF.bind(this)
  }

  handleChangeCelsius(temp) {
    this.setState({temp: temp, scale: 'c'})
  }

  handleChangeF(temp) {
    this.setState({temp: temp, scale: 'f'})
  }

  render() {
    const temp = this.state.temp;
    const c = this.state.scale === 'c' ? temp : tryConvert(temp, toCelsius);
    const f = this.state.scale === 'f' ? temp : tryConvert(temp, toFahrenheit);
    const date = new Date();

    return (
      <div className="Calculator">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hello {this.props.name}
          </p>
          <h2>It is { date.toLocaleTimeString() } { date.toDateString() }</h2>
          <TempInput temp={c} onTempChange={this.handleChangeCelsius}/>
          <TempInput temp={f} onTempChange={this.handleChangeF}/>
        </header>
      </div>
    );
  }
}

export default Calculator;
