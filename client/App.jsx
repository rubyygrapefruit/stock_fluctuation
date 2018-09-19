// /* global document */
import React, { Component } from 'react';
import axios from 'axios';
import * as moment from 'moment';
import flatten from 'lodash/flatten';

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
      timeTicks: [],
      nextTicks: [],
      currentPrice: null,
      startingPrice: null,
      lastPrice: null,
      marketIsUp: true,
      marketIsOpen: true,
      showDay: true
    };

    this.allTicks = this.allTicks.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.changeTimeLimit = this.changeTimeLimit.bind(this);
    this.transformDayTicks = this.transformDayTicks.bind(this);
    this.updateTicks = this.updateTicks.bind(this);
    this.checkMarketValue = this.checkMarketValue.bind(this);
    this.transformTimeTicks = this.transformTimeTicks.bind(this);
  }

  componentDidMount() {
    // Check time for app theme
    const time = moment();
    const beforeTime = moment('09:00', 'hh:mm');
    const afterTime = moment('15:00', 'hh:mm');

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
      if (moment(ticker.date).isBefore(moment())) {
        return ticker;
      }
    });
    // todays ticks
    const todayTicks = this.transformDayTicks([allTicks.pop()]);
    // ticks up to the time right now
    const currentTicks = todayTicks.filter(tick => {
      if (moment(tick.dateTime).isBefore(moment())) {
        return tick;
      }
    });
    // the rest of the ticks for the day
    const nextTicks = todayTicks.filter(tick => {
      if (moment(tick.dateTime).isAfter(moment())) {
        return tick;
      }
    });
    // starting price starts at today's open market value
    const startingPrice = currentTicks[0].price;
    console.log(startingPrice);
    // same for last and current when app opens up
    const lastPrice = currentTicks[currentTicks.length - 1].price;
    const currentPrice = currentTicks[currentTicks.length - 1].price;
    console.log(currentPrice);
    // set intialState when component mounts
    this.setState({
      allTicks,
      currentTicks,
      nextTicks,
      startingPrice,
      lastPrice,
      currentPrice
    });
    this.checkMarketValue();
    this.updateTicks();
  }

  updateTicks() {
    if (this.state.nextTicks.length === 0) return;
    const update = setInterval(() => {
      const nextTicks = this.state.nextTicks;
      const nextTick = nextTicks.shift();
      const currentPrice = nextTick.price;
      const lastPrice = this.state.currentTicks[
        this.state.currentTicks.length - 1
      ].price;
      const currentTicks = [...this.state.currentTicks, nextTick];
      this.setState({ currentTicks, nextTicks, lastPrice, currentPrice });
      //check market price
      this.checkMarketValue();

      //stop interval when ticks run out
      if (this.state.nextTicks.length === 0) {
        clearInterval(update);
      }
    }, 10000);
  }

  transformDayTicks(tickers) {
    // console.log('tickers', tickers);
    const array = flatten(
      tickers.map(ticker => {
        const dateStr = ticker.date.slice(0, 10);
        let date = moment(dateStr, 'YYYY-MM-DD');
        return ticker.price.map((ticks, index) => {
          const dateTime = moment(dateStr + ' ' + ticks.currentTime);
          let time = moment(dateTime).format('HH:mm');
          time = time.split(':').join('');
          return {
            x: time,
            y: parseInt(ticks.currentPrice),
            dateTime,
            price: ticks.currentPrice
          };
        });
      })
    );
    return array;
  }

  transformTimeTicks(tickers) {
    let count = 0;
    const array = flatten(
      tickers.map(ticker => {
        const dateStr = ticker.date.slice(0, 10);
        let date = moment(dateStr, 'YYYY-MM-DD');
        return ticker.price.map((ticks, index) => {
          const dateTime = moment(dateStr + ' ' + ticks.currentTime);
          count = count + 0.5;
          return {
            x: count,
            y: parseInt(ticks.currentPrice),
            dateTime,
            price: ticks.currentPrice
          };
        });
      })
    );
    return array;
  }

  checkMarketValue() {
    const { startingPrice, currentPrice } = this.state;
    if (parseInt(startingPrice) >= parseInt(currentPrice)) {
      this.setState({ marketIsUp: false });
    } else {
      this.setState({ marketIsUp: true });
    }
  }
  changeTimeLimit(period) {
    console.log(period);
    switch (period) {
      case 'day':
        this.updateTicks();
        return this.setState({ showDay: true });
      case 'week':
        clearInterval(this.updateTicks);
        return this.setState({
          showDay: false,
          timeTicks: this.transformTimeTicks(this.state.allTicks.slice(-5))
        });
      case 'month':
        clearInterval(this.updateTicks);
        this.setState({
          showDay: false,
          timeTicks: this.transformTimeTicks(this.state.allTicks)
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
      showDay,
      timeTicks,
      lastPrice,
      marketIsOpen,
      marketIsUp
    } = this.state;
    let tickers = showDay ? currentTicks : timeTicks;
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
          currentTicks={tickers}
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
