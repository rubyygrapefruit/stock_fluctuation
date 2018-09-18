// /* global document */
import React, { Component } from 'react';
import axios from 'axios';
import * as moment from 'moment';

// css
import './App.css';

// Components
import Header from './components/header/Header.jsx';
import GraphHeaderContainer from './components/graphHeader/GraphHeaderContainer.jsx';
import Graph from './components/graph/Graph.jsx';
import Footer from './components/footer/Footer.jsx';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      companies: [],
      company: {},
      allTicks: [],
      currentTicks: [],
      currentPrice: null,
      lastPrice: null,
      marketIsUp: true,
      marketIsOpen: true
    };

    this.allTicks = this.allTicks.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.changeTimeLimit = this.changeTimeLimit.bind(this);
  }

  componentDidMount() {
    const format = 'hh:mm';

    // let time = moment() gives you current time. no format required.
    const time = moment();
    const beforeTime = moment('09:00', format);
    const afterTime = moment('15:00', format);

    if (time.isBetween(beforeTime, afterTime)) {
      this.setState({ marketIsOpen: true });
    } else {
      this.setState({ marketIsOpen: false });
    }
    axios
      .get('/api')
      .then(res => res.data)
      .then(data => {
        const company = data[3];
        this.allTicks(company.tickers);
        this.setState({ companies: data, company });
      });
  }

  allTicks(tickers) {
    const allTicks = tickers.filter(ticker => {
      if (moment(ticker.date).isBefore(moment().add(1, 'days'))) {
        return ticker;
      }
    });

    let currentPrice = null;

    const currentTimes = allTicks[allTicks.length - 1].price.map(prices => {
      if (prices.currentTime <= moment().format('h:mma')) {
        return prices;
      }
    });
    currentPrice = currentTimes[currentTimes.length - 1].currentPrice;
    let lastPrice = currentTimes[currentTimes.length - 1].currentPrice;
    let currentTicks = [allTicks[allTicks.length - 1]];
    this.setState({ allTicks, currentTicks, currentPrice, lastPrice });
  }

  changeTimeLimit(period) {
    // console.log(period);
    switch (period) {
      case 'day':
        this.setState({
          currentTicks: this.state.allTicks.slice(-1)
        });
        break;
      case 'week':
        this.setState({
          currentTicks: this.state.allTicks.slice(-5)
        });
        break;
      case 'month':
        this.setState({
          currentTicks: this.state.allTicks
        });
        break;
      default:
        break;
    }
    // console.log(period);
  }

  updatePrice(lastPrice, currentPrice) {
    console.log(lastPrice, currentPrice);
  }

  render() {
    const { anaylst_percent, robinhood_owners, company } = this.state.company;
    const {
      currentPrice,
      currentTicks,
      allTicks,
      lastPrice,
      marketIsOpen,
      marketIsUp
    } = this.state;
    // console.log(currentTicks);
    return (
      <div
        className={`uk-container-small ${
          marketIsOpen ? 'theme-open-up' : 'theme-closed-down'
        }`}
      >
        <Header marketIsUp={marketIsUp} marketIsOpen={marketIsOpen} />
        <GraphHeaderContainer
          percent={anaylst_percent}
          owners={robinhood_owners}
          company_name={company}
          currentPrice={currentPrice}
          lastPrice={lastPrice}
          marketIsOpen={marketIsOpen}
        />
        <Graph
          allTicks={allTicks}
          currentTicks={currentTicks}
          onUpdatePrice={this.updatePrice}
          marketIsUp={marketIsUp}
        />
        <Footer
          marketIsOpen={marketIsOpen}
          marketIsUp={marketIsUp}
          changeTime={this.changeTimeLimit}
        />
      </div>
    );
  }
}
