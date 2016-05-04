'use strict';
var React = require('react');
var moment = require('moment');
var Store = require('../stores');

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
		return {
			rows: [],
			displayDate: null
		};
	},
	componentDidMount: function() {
		Store.doorsData();
		setInterval(Store.doorsData, 15000);
	},
	delete: function(e) {
		Store.deleteDoor(e);
	},
	render: function() {
		return (
			<div className="appWrapper">
				<table className="table table-striped table-bordered table-condensed">
					<thead>
						<tr>
							<th>Area</th>
							<th>State</th>
							<th>Time</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
					{this.props.doors.map(function(row, i) {
						return (<TableContent key={i} row={row} delete={this.delete}/>);
					}.bind(this))}
					</tbody>
				</table>
			</div>
		);
	}
});
