import React, { Component } from 'react';
import './Header.css';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <nav className="uk-navbar-container uk-navbar-transparent" uk-navbar>
          <div className="uk-navbar-left">
            <ul className="uk-navbar-nav">
              <li>
                <a href="">
                  <span className="uk-badge top-badges">Computer Hardware</span>
                </a>
              </li>
              <li>
                <a href="">
                  <span className="uk-badge top-badges">100 Most Popular</span>
                </a>
              </li>
              <li>
                <a href="">
                  <span className="uk-badge top-badges">Computer Software</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
