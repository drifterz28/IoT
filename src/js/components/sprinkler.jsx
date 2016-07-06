'use strict';
var React = require('react');

var DayPicker = React.createClass({
	render: function() {
		var daysAbbr = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
		return (
			<div className="daySelector btn-group">
				{daysAbbr.map(function(day, i) {
					return (
						<label className="btn btn-default" key={i}>
							<input type="checkbox"/>
							<div>{day}</div>
						</label>
					);
				}.bind(this))}
			</div>
		);
	}
});

module.exports = React.createClass({
	render: function() {
		return (
			<div className="appWrapper">
				<div className="panel panel-default">
					<div className="panel-body flex zoneSettings">
						<div className="zoneLabel">Front Yard:</div>
						<div className="zoneTimeSettings">
							<div className="input-group">
								<span className="input-group-addon">Run Time</span>
								<input type="text" className="form-control"/>
							</div>
							<div className="input-group">
								<span className="input-group-addon">Duration</span>
								<input type="text" className="form-control"/>
								<span className="input-group-addon">Min</span>
							</div>
						</div>
						<DayPicker />
					</div>
				</div>
				<div className="panel panel-default">
					<div className="panel-body">
						Back Yard:
						<DayPicker />
					</div>
				</div>
			</div>
		);
	}
});
