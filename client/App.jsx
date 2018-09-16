/* global document */
import React, { Component } from 'react';
import axios from 'axios';
import * as moment from 'moment';

//css
import './App.css';

//Components
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
      todayTicks: [],
      currentPrice: null,
      lastPrice: null
    };

    this.allTicks = this.allTicks.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api')
      .then(res => res.data)
      .then(data => {
        let company = data[0];
        this.allTicks(company.tickers);
        this.setState({ companies: data, company });
      });
  }

  allTicks(tickers) {
    let allTicks = tickers.filter(ticker => {
      if (moment(ticker.date).isBefore(moment().add(1, 'days'))) {
        return ticker;
      }
    });

    let currentPrice = null;

    let currentTimes = allTicks[allTicks.length - 1].price.map(prices => {
      if (prices.currentTime <= moment().format('h:mma')) {
        return prices;
      }
    });
    currentPrice = currentTimes[currentTimes.length - 1].currentPrice;
    let lastPrice = currentTimes[currentTimes.length - 1].currentPrice;
    let todayTicks = allTicks[allTicks.length - 1];
    this.setState({ allTicks, todayTicks, currentPrice, lastPrice });
  }

  render() {
    const { anaylst_percent, robinhood_owners, company } = this.state.company;
    const { currentPrice, todayTicks, allTicks, lastPrice } = this.state;
    return (
      <div className="uk-container-small">
        <Header />
        <GraphHeaderContainer
          percent={anaylst_percent}
          owners={robinhood_owners}
          company_name={company}
          currentPrice={currentPrice}
          lastPrice={lastPrice}
        />
        <Graph />
        <Footer />
      </div>
    );
  }
}
