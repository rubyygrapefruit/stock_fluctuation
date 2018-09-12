import React from 'react';
import './Tab.css';
import Icon from '../Misc/Icon.jsx';

const Tabs = props => {
  return (
    <li className="uk-align-right">
      <a>
        <span className="uk-badge bottom-badges">
          <Icon icon={props.icon} /> {props.display}
        </span>
      </a>
    </li>
  );
};

export default Tabs;
