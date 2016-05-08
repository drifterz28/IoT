'use strict';
var React = require('react');
var moment = require('moment');

module.exports = React.createClass({
	updateDate: function(e) {
		e.preventDefault();
		var date = e.target[0].value;
		this.props.updateDate(date);
	},
	componentDidMount: function() {
		var graphElm = document.querySelectorAll('.graph');
		setTimeout(function() {
			this.setGraph(graphElm);
		}.bind(this), 500);
	},
	componentWillUpdate: function(nextProps, nextState) {
		var graphElm = document.querySelectorAll('.graph');
		setTimeout(function() {
			this.setGraph(graphElm);
		}.bind(this), 500);
	},
	componentWillUnmount: function() {
		console.log('unmount');
	},
	precentOfMax: function(value, maxValue) {
		return (value / maxValue) * 100;
	},
	setGraph: function (graphElm) {
		var i = 0;
		var elLength = this.props.temps.length - 1;
		console.log(elLength);
		var timedelay = setInterval(function() {
			var temp = +graphElm[i].getAttribute('data-temp');
			var precent = this.precentOfMax(temp, 120);
			graphElm[i].style.transform = 'translateY(' + (100 - precent) + '%)';
			if(i < elLength) {
				i++;
			} else {
				clear();
			}
		}.bind(this), 50);

		function clear() {
			window.clearInterval(timedelay);
		}
	},
	render: function() {
		console.log(this.props);
		return (
			<div className="appWrapper">
				<div className="panel panel-default">
					<div className="panel-body">
						<form className="form-inline" onSubmit={this.updateDate}>
							{this.props.device ? <h3 className="inlineHeadline">{this.props.device.Location}</h3> : null}
							<div className="form-group">
								<label for="exampleInputName2">Date </label>
								<input type="date" name="displayDate" className="form-control" id="exampleInputName2"/>
							</div>
							<button type="submit" className="btn btn-default">Update</button>
						</form>
					</div>
				</div>
				<div className="dateTimeTemps">
					<div className="dayGraph">
						{this.props.temps ?
							<div className="graphs">
								{this.props.temps.map(function(temp, i) {
									var timestamp = moment(temp.TimeStamp).format('MMM D, YYYY, h:mm:ss a');
									return (
										<div key={i} className="graph" data-temp={temp.Temperature}>
											<div className="tempsInfo">
												{temp.Temperature}&deg;
											</div>
										</div>
									);
								}.bind(this))}
							</div> : null
						}
					</div>
				</div>
			</div>
		);
	}
});
