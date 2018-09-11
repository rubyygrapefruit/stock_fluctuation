/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

//Components
import Header from './components/header/Header.jsx';

const App = () => (
  <div className="uk-container">
    <Header />
    <h1 className="uk-heading-primary">hello world!</h1>
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
