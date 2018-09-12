/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

//Components
import Header from './components/header/Header.jsx';
import GraphHeaderContainer from './components/graphHeader/GraphHeaderContainer.jsx';

const App = () => (
  <div className="uk-container uk-container-small">
    <Header />
    <GraphHeaderContainer />
    <div>graph</div>
    <div>time tabs</div>
  </div>
);

export default App;
