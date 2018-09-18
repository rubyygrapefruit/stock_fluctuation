import React, { Component } from 'react';
import './Graph.css';
import { XYPlot, LineSeries } from 'react-vis';
import * as moment from 'moment';
import '../../../node_modules/react-vis/dist/style.css';
import flatten from 'lodash/flatten';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: null,
      nextTicks: []
    };
  }

  // componentDidMount() {
  //   // console.log(this.state);
  // }
  render() {
    let currentTicks = [{ x: 0, y: 0 }];
    if (this.props.currentTicks.length) {
      let ticks = flatten(this.props.currentTicks)[0];
      // console.log(ticks);
      currentTicks = ticks.price.map((tickers, index) => {
        return {
          x: index,
          y: parseInt(tickers.currentPrice)
        };
      });
    }

    return (
      <div className="uk-container-large">
        <XYPlot
          height={196}
          width={675}
          stroke={this.props.marketIsUp ? '#21ce99' : '#f45531'}
        >
          <LineSeries
            data={currentTicks}
            onNearestX={(datapoint, event) => {
              // console.log(datapoint, 'datapoint');
            }}
          />
        </XYPlot>
      </div>
    );
  }
}

export default Graph;
