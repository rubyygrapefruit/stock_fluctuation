import React from 'react';
import CountUp from 'react-countup';

import './GraphHeader.css';

//Components
import Tabs from './Tab.jsx';

const GraphHeaderContainer = props => {
  console.log(props);
  return (
    <div className="uk-column-1-2">
      {props.company_name ? (
        <div>
          <div>
            <h1 className="uk-heading-primary">
              {props.company_name}
              <br />
              <span className="money-title">
                $
                <CountUp
                  decimals="2"
                  start={props.lastPrice}
                  end={props.currentPrice}
                  duration={20}
                />
              </span>
            </h1>
          </div>
          <div>
            <ul>
              <Tabs
                icon="user"
                display={props.owners.toLocaleString('en')}
                tooltip={`${props.owners.toLocaleString('en')} people own ${
                  props.company_name
                } on Robinhood.`}
              />
              <Tabs
                icon="tag"
                display={`${props.percent}%`}
                tooltip={`${props.percent}% anaylsts agree that 
                  ${props.company_name} is a buy.`}
              />
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default GraphHeaderContainer;
