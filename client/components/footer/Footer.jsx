import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <ul className="uk-tab">
      <li className="uk-active">
        <a href="#">1D</a>
      </li>
      <li>
        <a href="#">1W</a>
      </li>
      <li>
        <a href="#">1M</a>
      </li>
      <li className="uk-disabled">
        <a>3M</a>
      </li>
    </ul>
  );
};

export default Footer;
