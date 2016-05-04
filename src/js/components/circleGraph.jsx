'use strict';
var React = require('react');
var moment = require('moment');

module.exports = React.createClass({
	buildGraph: function(temp, maxTemp) {
		if(temp < 1) {
			temp = 1; // keeps a dot on the page
		}
		var stepDeg = temp / maxTemp * 360;
		var radian = stepDeg / 90;
		var animeRadian = 0;
		var animeRadianInterval = radian / 30;
		var canvas = document.querySelector('.stepGraph');
		var ctx = canvas.getContext('2d');

		var settings = {
			circleSize: canvas.width / 2,
			lineWidth: 15,
			circleBackground: '#EBEBEB',
			circleForeground: '#4699D2',
			circleRadius: 0
		};

		settings.circleRadius = settings.circleSize - settings.lineWidth;

		function drawBackgroundGraph() {
			ctx.clearRect(0, 0, canvas.width, canvas.height); // clean the canvas
			ctx.beginPath();
			ctx.strokeStyle = settings.circleBackground;
			ctx.lineWidth = settings.lineWidth;
			ctx.arc(settings.circleSize, settings.circleSize, settings.circleRadius, 0, 2 * Math.PI);
			ctx.stroke();
		}

		function drawGraph() {
			var animate = true;
			animeRadian = animeRadian + animeRadianInterval;

			if (animeRadian > radian) {
				animate = false;
				animeRadian = radian;
			}

			// Radian + 1 to set the start point at top, default is on the right
			var endAngle = (Math.PI * (animeRadian + 1)) / 2;

			// build temp graph circle
			ctx.beginPath();
			ctx.strokeStyle = settings.circleForeground;
			ctx.lineWidth = settings.lineWidth;
			ctx.lineCap = 'round';
			// Math.PI * 1 to set the start point at top, default is on the right
			ctx.arc(settings.circleSize, settings.circleSize, settings.circleRadius, (Math.PI * 1) / 2, endAngle);
			ctx.stroke();
			// build Humidity graph
			// ctx.beginPath();
			// ctx.strokeStyle = settings.circleForeground;
			// ctx.lineWidth = settings.lineWidth;
			// ctx.lineCap = 'round';
			// // Math.PI * 1 to set the start point at top, default is on the right
			// ctx.arc(settings.circleSize, settings.circleSize, settings.circleRadius, (Math.PI * 1) / 2, endAngle);
			// ctx.stroke();

			if (animate) {
				window.requestAnimationFrame(drawGraph);
			}
		}

		drawBackgroundGraph();
		window.requestAnimationFrame(drawGraph);
	},
	componentDidMount: function() {
		setTimeout(() => {
			this.buildGraph(this.props.Temperature, 100);
		}, 1500);
	},
	render: function() {
		var timeStamp = moment(this.props.TimeStamp).format('MMM D, YYYY, h:mm:ss a');
		return (
			<div className="circleGraph">
				<h4>Location: {this.props.Location}</h4>
				<canvas className="stepGraph" width="150" height="150"></canvas>
				<div className="infoText">
					Temp: {this.props.Temperature}<br/>
					Humid: {this.props.Humidity}%<br/>
				</div>
				<div className="timeStamp">
					Time: {timeStamp}
				</div>
			</div>
		);
	}
});
