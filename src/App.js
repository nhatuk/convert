import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import ratesData from './rates.json';

function tryConvert(money, code, encode = true) {
    const input = parseFloat(money);
    if (Number.isNaN(input)) {
      return '';
    }
    const currency = ratesData.rates[0].value.find(item => item.code === code);
    if (!currency) {
      return '';
    }
    const sell = parseFloat(currency.sell.replace(',', ''))
    const output = encode ? input*sell : input/sell;
    const rounded = Math.round(output * 1000)/1000;
    return rounded.toString();
  }

class CurrencyInput extends React.Component{
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.props.onMoneyChange(event.target.value)

  }

  render() {
    return (
      <fieldset>
        <legend>Enter { this.props.currencyName }</legend>
        <input value={this.props.money} onChange={this.handleChange}></input>
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currencyCode : 'ETH',
      currencyName : '',
      money: '',
      encode: true,
    }

    this.handleChangeCurrency = this.handleChangeCurrency.bind(this)
    this.handleChangeVNDEncode = this.handleChangeVNDEncode.bind(this)
    this.handleChangeVNDDecode = this.handleChangeVNDDecode.bind(this)
    this.handleChangeOption = this.handleChangeOption.bind(this)
  }
  handleChangeOption(event){
    this.setState({
      currencyCode: event.target.value,
      // currencyName: event.target.name,
      encode: true,
      money: '',
    })
  }

  handleChangeCurrency(event) {
    this.setState({
      currencyCode: event.target.value,
      // currencyName: event.target.name,
      encode: true,
      money: '',
    })
  }

  handleChangeVNDEncode(money) {
    this.setState({ 
      // currencyName: money.target.name,
      money: money,
      encode: true,
    })
  }

  handleChangeVNDDecode(money) {
    this.setState({ 
      // currencyCode: money.target.value,
      money: money,
      encode: false,
    })
  }

  render() {
    // const date = new Date();
    const money = this.state.money;
    const VND = this.state.encode ? tryConvert(money, this.state.currencyCode, true) : money;
    const notVND = this.state.encode ? money : tryConvert(money, this.state.currencyName, true);
    // const name = this.state.currencyName;

    return (
      <body>
      <header>
            <div className="container-fluid">
                <div class="logo">
                    <a href="/">
                        <span class="logo-image">
                          <img src="assets/images/common/logo.svg" alt=""></img>
                        </span>
                        <span class="logo-text">Balancer</span>
                    </a>
                </div>
              
            </div>
      </header>
      <main>
      <div className="Calculator">
      <div class="action" style={{marginBottom : 50}}>
                <select class="button button-blue" onChange={this.handleChangeCurrency}>
              <option name="DOLLAR" value="ETH">ETH</option>
              <option  name ="DOLLAR" value="BTC">BTC</option>
              <option  name="DOLLAR" value="TRX">TRX</option>
              <option name="ZALO" value="DOLLAR" >ZALO</option>
              </select>
            </div>
        <div class="container-fluid">
          
            <div class="exchange" data-direction="bal-trx">
              
                <div class="exchange-block" data-type="bal">
              
                    <div class="block-title">Token to Sell</div>
                    <div class="block-details">
                        <div class="currency">
                            <div class="currency-logo">
                               <img src="assets/images/bal-logo.png" alt=""/>
                            </div>
                            <div class="currency-name">{this.state.currencyCode}</div>
                        </div>
                    </div>
                    <div class="block-input">
                        <CurrencyInput currencyName={this.state.currencyCode} money={notVND} 
                        onMoneyChange={this.handleChangeVNDEncode}/>
                    </div>
                </div>
                <div class="swap"><button id="swap"></button></div>
                <div class="exchange-block" data-type="trx">
                    <div class="block-title">Token to Buy</div>
                    <div class="block-details">
                        <div class="currency">
                            <div class="currency-logo">
                                <img src="assets/images/common/tron-logo.svg" alt=""/>
                            </div>
                            <div class="currency-name"> {(() => {
                                            switch (this.state.currencyCode) {
                                              case "DOLLAR":  return "ZALO";
                                              default:      return "DOLLAR";
                                            }
                            })()}</div>
                        </div>
                    </div>
                    <div class="block-input">
                        <CurrencyInput money={VND} currencyName={(() => {
                                            switch (this.state.currencyCode) {
                                              case "DOLLAR":  return "ZALO";
                                              default:      return "DOLLAR";
                                            }
                            })()}
                        onMoneyChange={this.handleChangeVNDDecode}/>
                    </div>
                </div>
            </div>
            <div class="status">
                <div class="status-message status1 active">Enter Order Details to Continue</div>
                <div class="status-message status2">Not float</div>
              </div>
            </div>
        </div>
      </main>
      </body>
    );
  }
}

export default Calculator;
