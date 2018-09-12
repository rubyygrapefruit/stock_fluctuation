import React from 'react';
import CountUp from 'react-countup';

//Components
import Tabs from './Tab.jsx';

const GraphHeaderContainer = props => {
  return (
    <div className="uk-column-1-2">
      <div>
        <h1 className="uk-heading-primary">
          h{props.company_name}
          <br />$<CountUp decimals="2" start={20.0} end={1.2} duration={20} />
        </h1>
      </div>
      <div>
        <ul>
          <Tabs icon="user" />
          <Tabs icon="tag" />
        </ul>
      </div>
    </div>
  );
};

export default GraphHeaderContainer;
