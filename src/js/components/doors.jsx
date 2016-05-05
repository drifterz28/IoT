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
			count: 10,
			displayDate: null
		};
	},
	componentDidMount: function() {
		Store.doorsData(this.state.displayDate, this.state.count);
		setInterval(function() {
			Store.doorsData(this.state.displayDate, this.state.count);
		}.bind(this), 15000);
	},
	delete: function(e) {
		Store.deleteDoor(e);
	},
	updateDoors: function(e) {
		e.preventDefault();
		var date = e.target[0].value;
		this.setState({
			displayDate: date
		});
		Store.doorsData(date, this.state.count);
	},
	render: function() {
		return (
			<div className="appWrapper">
				<div className="panel panel-default">
					<div className="panel-body">
						<form className="form-inline" onSubmit={this.updateDoors}>
							<div className="form-group">
								<label for="exampleInputName2">Date </label>
								<input type="date" name="displayDate" className="form-control" id="exampleInputName2"/>
							</div>
							<button type="submit" className="btn btn-default">Update</button>
						</form>
					</div>
				</div>
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
