import React, { Component } from 'react';
import './Graph.css';
import { XYPlot, LineSeries } from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css';

class Graph extends Component {
  constructor() {
    super();
    this.state = {
      index: null,
      data: [
        { x: new Date(2018, 1), y: 8 },
        { x: new Date(2018, 2), y: 5 },
        { x: new Date(2018, 3), y: 4 },
        { x: new Date(2018, 4), y: 9 },
        { x: new Date(2018, 5), y: 1 },
        { x: new Date(2018, 6), y: 7 },
        { x: new Date(2018, 7), y: 6 },
        { x: new Date(2018, 8), y: 3 },
        { x: new Date(2018, 9), y: 2 }
      ]
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: [...this.state.data, { x: new Date(2018, 10), y: 0 }]
      });
    }, 2000);
  }
  render() {
    return (
      <div className="uk-container-large">
        Graph
        <XYPlot height={196} width={675} stroke="#21ce99">
          <LineSeries
            data={this.state.data}
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
