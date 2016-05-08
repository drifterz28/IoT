'use strict';
var React = require('react');
var Actions = require('../actions');
var Store = require('../stores');

var Doors = require('./doors.jsx');
var Temp = require('./temp-sensors.jsx');

module.exports = React.createClass({
	render: function() {
		return (
			<div className="appContainer">
				<Temp {...this.props}/>
				<Doors {...this.props}/>
			</div>
		);
	}
});

//<Doors {...this.props}/>
