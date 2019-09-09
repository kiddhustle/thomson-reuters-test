import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

window.widget = {
  initialize: function (container, sortBy) {
    ReactDOM.render(<App sort={sortBy}/>, document.getElementById(container));
  }
}

window.widget.initialize('root', 'gold')

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
