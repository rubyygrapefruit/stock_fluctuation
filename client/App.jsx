/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

//Components
import Header from './components/header/Header.jsx';

const App = () => (
  <div className="uk-container">
    <Header />
    <div>graph header</div>
    <div>graph</div>
    <div>time tabs</div>
  </div>
);

export default App;
