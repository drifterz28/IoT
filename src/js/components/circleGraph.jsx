'use strict';
var React = require('react');
var moment = require('moment');

var circleGraph = require('../circle-graph');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			toUpdateName: false,
			tempIndex: 0,
			humIndex: 1
		};
	},
	componentDidMount: function() {
		var donutGraphEl = document.querySelector('.donut_' + this.props.deviceId);
		var temp = this.props.Temperature;
		var hum = this.props.Humidity;
		var options = {
			size: 150,
			strokeWidth: 15,
			strokeLinecap: 'round',
			circleColors: ['#3498db', '#2ecc71'],
			bgStrokeColor: '#CCCFD0',
			maxValue: 120
		};
		var tempIndex = (temp > hum) ? 0 : 1;
		var humIndex = (temp < hum) ? 0 : 1;
		circleGraph.init(donutGraphEl, options);
		circleGraph.draw(temp, tempIndex);
		circleGraph.draw(hum, humIndex);
		circleGraph.animateGraph();
		this.setState({
			tempIndex: tempIndex,
			humIndex: humIndex
		});
	},
	componentWillReceiveProps: function(nextProps) {
		var temp = nextProps.Temperature;
		var hum = nextProps.Humidity;
		var tempIndex = (temp > hum) ? 0 : 1;
		var humIndex = (temp < hum) ? 0 : 1;
		circleGraph.update(temp, tempIndex);
		circleGraph.update(hum, humIndex);
		circleGraph.animateGraph();
		this.setState({
			tempIndex: tempIndex,
			humIndex: humIndex
		});
	},
	updateName: function() {
		this.setState({
			toUpdateName: true
		});
	},
	saveLocation: function(e) {
		e.preventDefault();
		var newName = e.target[0].value;
		this.setState({
			toUpdateName: false
		});
	},
	render: function() {
		var timeStamp = moment(this.props.Timestamp).format('MMM D, YYYY, h:mm:ss a');
		var locatinName = this.props.Location;
		return (
			<div className="circleGraph">
				{!this.state.toUpdateName ?
					<h4 onDoubleClick={this.updateName}>{locatinName}</h4> :
					<form className="form-inline" onSubmit={this.saveLocation}>
						<input className="form-control" name="locationName" defaultValue={locatinName}/>
						<button className="btn btn-primary">Save</button>
					</form>
				}
				<div className={'donut_' + this.props.deviceId}></div>
				<div className="infoText">
					{this.state.tempIndex < this.state.humIndex ?
						<div className="values">
							<span>T: {this.props.Temperature}&deg;<br/></span>
							<span>H: {this.props.Humidity}%</span>
						</div> :
						<div className="values">
							<span>H: {this.props.Humidity}%<br/></span>
							<span>T: {this.props.Temperature}&ordm;</span>
						</div>
					}
				</div>
				<div className="timeStamp">
					Time: {timeStamp}
				</div>
			</div>
		);
	}
});
