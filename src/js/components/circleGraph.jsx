'use strict';
var React = require('react');
var moment = require('moment');

var Store = require('../stores');
var CircleGraph = require('../circle-graph');

module.exports = React.createClass({
	circleGraph: null,
	getInitialState: function() {
		return {
			toUpdateName: false,
			tempIndex: 0,
			humIndex: 1
		};
	},
	componentDidMount: function() {
		console.log(this.props.deviceId);
		var donutGraphEl = document.querySelector('.donut_' + this.props.deviceId);
		var temp = this.props.Temperature;
		var hum = this.props.Humidity;
		var options = {
			size: 150,
			strokeWidth: 15,
			strokeLinecap: 'round',
			circleColors: ['#3498db', '#2ecc71'],
			bgStrokeColor: '#CCCFD0',
			maxValue: 120,
			delay: 100
		};
		var tempIndex = (+temp > +hum) ? 0 : 1;
		var humIndex = (+temp < +hum) ? 0 : 1;
		this.circleGraph = new CircleGraph(donutGraphEl, options);
		if(+temp > +hum) {
			this.circleGraph.draw(temp, 0);
			this.circleGraph.draw(hum, 1);
		} else {
			this.circleGraph.draw(hum, 0);
			this.circleGraph.draw(temp, 1);
		}

		this.circleGraph.animateGraph();
		this.setState({
			tempIndex: tempIndex,
			humIndex: humIndex
		});
	},
	componentWillReceiveProps: function(nextProps) {
		var temp = nextProps.Temperature;
		var hum = nextProps.Humidity;
		var tempIndex = (+temp > +hum) ? 0 : 1;
		var humIndex = (+temp < +hum) ? 0 : 1;
		if(+temp > +hum) {
			this.circleGraph.update(temp, 0);
			this.circleGraph.update(hum, 1);
		} else {
			this.circleGraph.update(hum, 0);
			this.circleGraph.update(temp, 1);
		}
		this.circleGraph.animateGraph();
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
		Store.saveLocationName(newName, this.props.deviceId);
		this.setState({
			toUpdateName: false
		});
	},
	viewMoreDetails: function() {
		this.props.viewMoreDetails(this.props.deviceId);
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
					<button onClick={this.viewMoreDetails} className="btn btn-info btn-xs">View more</button>
				</div>
				<div className="timeStamp">
					Time: {timeStamp}
				</div>
			</div>
		);
	}
});
