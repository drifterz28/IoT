'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var app = React.createFactory(require('./components/app.jsx'));

function init() {
    ReactDOM.render(app(), document.querySelector('.app'));
}

init();
