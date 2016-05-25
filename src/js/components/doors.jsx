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
			displayDate: moment().format('YYYY-MM-DD')
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
		var date = e.target.value;
		this.setState({
			displayDate: date
		});
		Store.doorsData(date, this.state.count);
	},
	render: function() {
		var today =  moment().format('YYYY-MM-DD');
		return (
			<div className="appWrapper">
				<div className="panel panel-default">
					<div className="panel-body">
						Alarm Arm, Disarm
					</div>
				</div>
				<div className="panel panel-default">
					<div className="panel-body">
						<form className="form-inline">
							<div className="form-group">
								<label for="exampleInputName2">Date </label>
								<input onChange={this.updateDoors} type="date" name="displayDate" defaultValue={today} max={today} className="form-control" id="exampleInputName2"/>
							</div>
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
