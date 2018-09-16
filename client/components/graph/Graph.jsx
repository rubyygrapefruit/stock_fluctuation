import React, { Component } from 'react';
import './Graph.css';
import { XYPlot, LineSeries } from 'react-vis';
import * as moment from 'moment';
import '../../../node_modules/react-vis/dist/style.css';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: null,
      data: [],
      currentTicks: []
    };
  }

  componentDidUpdate() {
    if (this.state.data.length === 0) {
      let currentTicks = this.props.todayTicks.price.map((tickers, index) => {
        return {
          x: index,
          y: parseInt(tickers.currentPrice)
        };
      });
      let data = this.props.allTicks;
      this.setState({ data, currentTicks });
    }
  }

  // componentDidMount() {
  //   // console.log(this.state);
  // }
  render() {
    console.log(this.state);
    return (
      <div className="uk-container-large">
        <XYPlot height={196} width={675} stroke="#21ce99">
          <LineSeries
            data={this.state.currentTicks}
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
