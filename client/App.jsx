/* global document */
import React, { Component } from 'react';
import axios from 'axios';

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
      todayTicks: [],
      currentPrice: null
    };

    this.todayTicks = this.todayTicks.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api')
      .then(res => res.data)
      .then(data => {
        let company = data[0];
        // this.todayTicks(company.tickers);
        this.setState({ companies: data, company });
      });
  }

  todayTicks(tickers) {
    let date = new Date();
    let today = date.getDate();
    let time = date.getHours() + ':' + date.getMinutes();
    let todayTicks = tickers.filter(ticker => {
      let tickerDate = new Date(ticker.date);
      if (tickerDate.getDate() === today) {
        return ticker;
      }
    });
    console.log(todayTicks);
    // let currentPrice = todayTicks.price.filter(prices => {
    //   if (prices.currentPrice.includes(time)) {
    //     return prices;
    //   }
    // });
    // this.setState({ todayTicks, currentPrice });
  }

  render() {
    console.log(this.state);
    const { anaylst_percent, robinhood_owners, company } = this.state.company;
    return (
      <div className="uk-container-small">
        <Header />
        <GraphHeaderContainer
          percent={anaylst_percent}
          owners={robinhood_owners}
          company_name={company}
        />
        <Graph />
        <Footer />
      </div>
    );
  }
}
