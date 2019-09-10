import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const widget = {
  initialize: function (container: string, sortBy: string) {
    ReactDOM.render(
      <App sort={sortBy}/>, document.getElementById(container)
      );
  }
}

widget.initialize('root', 'gold')

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
