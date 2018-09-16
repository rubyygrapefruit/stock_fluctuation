import React from 'react';
import './Footer.css';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: true,
      week: false,
      month: false
    };
  }

  changePeriod(e) {
    let period = e.target.getAttribute('data');
    let state = this.state;
    for (let key in state) {
      state[key] = false;
    }
    state[period] = true;
    this.props.changeTime(period);
    this.setState(state);
  }

  render() {
    const { day, week, month } = this.state;
    return (
      <ul className="uk-tab">
        <li className={day ? 'uk-active' : null}>
          <a onClick={this.changePeriod.bind(this)} data="day">
            1D
          </a>
        </li>
        <li className={week ? 'uk-active' : null}>
          <a onClick={this.changePeriod.bind(this)} data="week">
            1W
          </a>
        </li>
        <li className={month ? 'uk-active' : null}>
          <a onClick={this.changePeriod.bind(this)} data="month">
            1M
          </a>
        </li>
        <li className="uk-disabled">
          <a>3M</a>
        </li>
      </ul>
    );
  }
}

export default Footer;
