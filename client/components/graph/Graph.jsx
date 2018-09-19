import React, { Component } from 'react';
import './Graph.css';
import { XYPlot, LineSeries, d3Shape } from 'react-vis';
import * as moment from 'moment';
import '../../../node_modules/react-vis/dist/style.css';
import flatten from 'lodash/flatten';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: null
    };
  }

  render() {
    // const configuredCurve = d3Shape.curve();
    return (
      <div className="uk-container-large">
        <XYPlot
          height={300}
          width={800}
          stroke={this.props.marketIsUp ? '#21ce99' : '#f45531'}
          xRange={[0, 2500]}
          yRange={[10, 180]}
        >
          <LineSeries
            data={this.props.currentTicks}
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
