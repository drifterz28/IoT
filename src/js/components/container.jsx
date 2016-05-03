'use strict';
var React = require('react');
var Actions = require('../actions');
var Store = require('../stores');

var Doors = require('./doors.jsx');

module.exports = React.createClass({
	render: function() {
		return (
			<div className="appContainer">
				<Doors/>
			</div>
		);
	}
});
