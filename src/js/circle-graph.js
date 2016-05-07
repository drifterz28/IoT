'use strict';

module.exports = {
	elm: undefined,
	size: undefined,
	strokeWidth: undefined,
	strokeLinecap: undefined,
	circleColors: undefined,
	bgStrokeColor: undefined,
	maxValue: undefined,
	radius: undefined,
	strokeDash: undefined,
	graph: undefined,
	init(elm, options) {
		this.elm = elm;
		this.size = options.size;
		this.strokeWidth = options.strokeWidth;
		this.strokeLinecap = options.strokeLinecap;
		this.circleColors = options.circleColors;
		this.bgStrokeColor = options.bgStrokeColor;
		this.maxValue = options.maxValue;
		this.svgSetup();
	},
	svgSetup() {
		this.radius = this.size / 2 - this.strokeWidth;
		this.strokeDash = Math.ceil(this.calculateCircumference(this.radius));
		this.svgns = 'http://www.w3.org/2000/svg';
		this.graph = document.createElementNS(this.svgns, 'svg:svg');
		this.graph.setAttribute('width', this.size);
		this.graph.setAttribute('height', this.size);
		this.graph.setAttribute('viewBox', '0 0 ' + this.size + ' ' + this.size);
		this.graph.appendChild(this.buildCircle(this.bgStrokeColor, 0, 'bgCircle'));
		this.elm.appendChild(this.graph);
	},
	draw(value, index) {
		var strokeOffset = this.strokeDashOffset(value);
		this.graph.appendChild(this.buildCircle(this.circleColors[index], strokeOffset, 'circle'));
	},
	update(value, index) {
		var donut = this.elm.querySelectorAll('.circle')[index];
		var delay = 300;
		var strokeOffset = this.strokeDashOffset(value);
		donut.setAttribute('data-offset', strokeOffset);
	},
	removeCircle(node) {
		if (node.parentNode) {
			node.parentNode.removeChild(node);
		}
	},
	strokeDashOffset(value) {
		var remainder = value % this.maxValue; // remainder of value after the 10000 mark
		return this.strokeDash - Math.floor(remainder / this.maxValue * this.strokeDash);
	},
	animateGraph() {
		var donuts = this.elm.querySelectorAll('.circle');
		setTimeout(function() {
			for (var i = 0; i < donuts.length; i++) {
				var newOffset = donuts[i].getAttribute('data-offset');
				donuts[i].style.strokeDashoffset = newOffset;
			}
		}, 300);
	},
	calculateCircumference(radius) {
		return 2 * Math.PI * radius;
	},
	buildCircle(strokeColor, strokeOffset, className) {
		var circle = document.createElementNS(this.svgns, 'circle');
		circle.setAttribute('cx', this.size / 2);
		circle.setAttribute('cy', this.size / 2);
		circle.setAttribute('r', this.radius);
		circle.setAttribute('class', className);
		circle.setAttribute('stroke-width', this.strokeWidth);
		circle.setAttribute('fill', 'none');
		circle.setAttribute('stroke-dasharray', this.strokeDash);
		circle.setAttribute('stroke-dashoffset', this.strokeDash);
		circle.setAttribute('data-offset', strokeOffset);
		circle.setAttribute('stroke', strokeColor);
		circle.setAttribute('stroke-linecap', this.strokeLinecap);
		return circle;
	}
};
/*
function donutGraph(value) {
	// settings
	//var value = 15000;
	var size = 150;
	var strokeWidth = 15;
	var strokeLinecap = 'round';
	var circleColors = ['#9ecff2', '#0077c8'];
	var bgStrokeColor = 'rgba(153,153,153,.2)';
	var maxValue = 10000;

	// constants
	var radius = size / 2 - strokeWidth;
	var strokeDash = Math.ceil(calculateCircumference(radius));
	var circles = Math.ceil(value / maxValue);
	var svgns = 'http://www.w3.org/2000/svg';
	// create SVG wrapper
	var donutGraph = document.createElementNS(svgns, 'svg:svg');
	donutGraph.setAttribute('width', size);
	donutGraph.setAttribute('height', size);
	donutGraph.setAttribute('viewBox', '0 0 ' + size + ' ' + size);
	// create BG circle
	donutGraph.appendChild(buildCircle(bgStrokeColor, 0, 'bgCircle'));
	// build each loop of the donut
	for (var i = 0; i < circles; i++) {
		var strokeOffset = (i === circles - 1) ? strokeDashOffset(value, maxValue, strokeDash) : 0;
		donutGraph.appendChild(buildCircle(circleColors[i], strokeOffset, 'circle'));
	}

	function strokeDashOffset(value, maxValue, strokeDash) {
		var remainder = value % maxValue; // remainder of value after the 10000 mark
		return strokeDash - Math.floor(remainder / maxValue * strokeDash);
	}

	function animateGraph() {
		var donuts = donutGraph.querySelectorAll('.circle');
		for (var i = 0; i < donuts.length; i++) {
			var newOffset = donuts[i].getAttribute('data-offset');
			donuts[i].style.strokeDashoffset = newOffset;
		}
	}

	function buildCircle(strokeColor, strokeOffset, className) {
		var circle = document.createElementNS(svgns, 'circle');
		circle.setAttribute('cx', size / 2);
		circle.setAttribute('cy', size / 2);
		circle.setAttribute('r', radius);
		circle.setAttribute('class', className);
		circle.setAttribute('stroke-width', strokeWidth);
		circle.setAttribute('fill', 'none');
		circle.setAttribute('stroke-dasharray', strokeDash);
		circle.setAttribute('stroke-dashoffset', strokeDash);
		circle.setAttribute('data-offset', strokeOffset);
		circle.setAttribute('stroke', strokeColor);
		circle.setAttribute('stroke-linecap', strokeLinecap);
		return circle;
	}

	function calculateCircumference(radius) {
		return 2 * Math.PI * radius;
	}
	var donutGraphEl = document.querySelector('.donut');
	donutGraphEl.appendChild(donutGraph);
	setTimeout(animateGraph, 500);
}

// init
var donutGraphEl = document.querySelector('.donut');
var options = {
	size: 150,
	strokeWidth: 15,
	strokeLinecap: 'round',
	circleColors: ['rgb(118,178,218)', 'rgb(0, 119, 200)'],
	bgStrokeColor: '#CCCFD0',
	maxValue: 10000
};

donutGraph.init(donutGraphEl, options);
donutGraph.draw(6000);

document.querySelector('.steps').addEventListener('submit', function(e) {
	e.preventDefault();
	var steps = +e.target.querySelector('input').value;
	donutGraph.update(steps);
});
*/
