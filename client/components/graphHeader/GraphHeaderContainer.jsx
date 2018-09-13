import React from 'react';
import CountUp from 'react-countup';

import './GraphHeader.css';

//Components
import Tabs from './Tab.jsx';

const GraphHeaderContainer = props => {
  return (
    <div className="uk-column-1-2">
      <div>
        <h1 className="uk-heading-primary">
          Apple
          {props.company_name}
          <br />
          <span className="money-title">
            $<CountUp decimals="2" start={200.0} end={220.12} duration={20} />
          </span>
        </h1>
      </div>
      <div>
        <ul>
          <Tabs
            icon="user"
            display="19,345"
            tooltip="19,345 of people on Robinhood own Apple stock"
          />
          <Tabs
            icon="tag"
            display="67%"
            tooltip="67% of anaylst agree Apple is a buy."
          />
        </ul>
      </div>
    </div>
  );
};

export default GraphHeaderContainer;
