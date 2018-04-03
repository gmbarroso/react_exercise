import React from 'react'; // É o mesmo que var React = require('react');
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/app';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
    <App />,
    document.getElementById('root'));
registerServiceWorker();
