'use strict';
var React = require('react');
var moment = require('moment');
var Store = require('../stores');

var Circle = require('./circleGraph.jsx');
var ShowDeviceTemps = require('./temp-chart.jsx');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			deviceId: null,
			displayDate: moment().format('YYYY-MM-DD')
		};
	},
	viewMoreDetails: function(deviceId) {
		Store.getDeviceDetails(deviceId, this.state.displayDate);
		this.setState({
			deviceId: deviceId
		});
	},
	componentDidMount: function() {
		Store.tempSensorsData();
		setInterval(Store.tempSensorsData, 1000 * 60 * 10);
	},
	updateDate: function(date) {
		Store.getDeviceDetails(this.state.deviceId, date);
		this.setState({
			displayDate: date
		});
	},
	render: function() {
		return (
			<div>
				<div className="appWrapper flex">
					{this.props.tempSensors.map(function(sensor, i) {
						return (<Circle key={i} viewMoreDetails={this.viewMoreDetails} {...sensor}/>);
					}.bind(this))}
				</div>
				{this.props.tempSensorDetails ? <ShowDeviceTemps updateDate={this.updateDate} {...this.props.tempSensorDetails}/> : null}
			</div>
		);
	}
});
