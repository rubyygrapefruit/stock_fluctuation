/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

//Components
import Header from './components/header/Header.jsx';
import GraphHeaderContainer from './components/graphHeader/GraphHeaderContainer.jsx';
import Graph from './components/graph/Graph.jsx';
import Footer from './components/footer/Footer.jsx';

const App = () => (
  <div className="uk-container uk-container-small">
    <Header />
    <GraphHeaderContainer />
    <Graph />
    <Footer />
  </div>
);

export default App;
