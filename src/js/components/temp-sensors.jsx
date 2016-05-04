'use strict';
var React = require('react');
var moment = require('moment');
var Store = require('../stores');

var Circle = require('./circleGraph.jsx');

var TableContent = React.createClass({
	render: function() {
		var row = this.props.row;
		var timeStamp = moment(row.timeStamp).format('MMM D, YYYY, h:mm:ss a');
		return (
			<tr data-id={row.id}>
				<td>{row.area}</td>
				<td>{row.state}</td>
				<td>{timeStamp}</td>
				<td><button className="btn btn-danger btn-xs" onClick={this.props.delete} data-id={row.id}>X</button></td>
			</tr>
		);
	}
});

module.exports = React.createClass({
	getInitialState: function() {
		return {};
	},
	componentDidMount: function() {
		Store.tempSensorsData();
	},
	delete: function(e) {

	},
	render: function() {
		return (
			<div className="appWrapper">
				{this.props.temp.sensors.map(function(sensor, i) {
					return (<Circle key={i} {...sensor}/>);
				}.bind(this))}
			</div>
		);
	}
});
