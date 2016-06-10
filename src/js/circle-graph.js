'use strict';

function CircleGraph(elm, options) {
	this.elm = elm;
	this.size = options.size;
	this.strokeWidth = options.strokeWidth;
	this.strokeLinecap = options.strokeLinecap;
	this.circleColors = options.circleColors;
	this.bgStrokeColor = options.bgStrokeColor;
	this.maxValue = options.maxValue;
	this.delay = options.delay;
	this.svgSetup();
}

CircleGraph.prototype = {
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
	delay: undefined,
	svgSetup() {
		this.radius = this.size / 2 - this.strokeWidth;
		this.strokeDash = Math.ceil(this.calculateCircumference(this.radius));
		this.svgns = 'http://www.w3.org/2000/svg';
		this.graph = document.createElementNS(this.svgns, 'svg:svg');
		this.graph.setAttribute('width', this.size);
		this.graph.setAttribute('height', this.size);
		this.graph.setAttribute('viewBox', '0 0 ' + this.size + ' ' + this.size);
		this.graph.appendChild(this.buildCircle(this.bgStrokeColor, 0, 0, 'bgCircle'));
		this.elm.appendChild(this.graph);
	},
	draw(value, index) {
		var strokeOffset = this.strokeDashOffset(value);
		this.graph.appendChild(this.buildCircle(this.circleColors[index], strokeOffset, index, 'circle'));
	},
	update(value, index) {
		var donut = this.elm.querySelectorAll('.circle')[index];
		var strokeOffset = this.strokeDashOffset(value);
		donut.setAttribute('data-offset', strokeOffset);
	},
	removeCircle(node) {
		if (node.parentNode) {
			node.parentNode.removeChild(node);
		}
	},
	strokeDashOffset(value) {
		var remainder = value % (this.maxValue + 0.01); // remainder of value after the max mark + .01
		return this.strokeDash - Math.floor(remainder / this.maxValue * this.strokeDash);
	},
	animateGraph() {
		var donuts = this.elm.querySelectorAll('.circle');
		setTimeout(function() {
			for (var i = 0; i < donuts.length; i++) {
				var newOffset = donuts[i].getAttribute('data-offset');
				donuts[i].style.strokeDashoffset = newOffset;
			}
		}, this.delay);
	},
	calculateCircumference(radius) {
		return 2 * Math.PI * radius;
	},
	buildCircle(strokeColor, strokeOffset, circleIndex, className) {
		var circle = document.createElementNS(this.svgns, 'circle');
		circle.setAttribute('cx', this.size / 2);
		circle.setAttribute('cy', this.size / 2);
		circle.setAttribute('r', this.radius);
		circle.setAttribute('class', className);
		circle.setAttribute('stroke-width', this.strokeWidth + (circleIndex / 3));
		circle.setAttribute('fill', 'none');
		circle.setAttribute('stroke-dasharray', this.strokeDash);
		circle.setAttribute('stroke-dashoffset', this.strokeDash);
		circle.setAttribute('data-offset', strokeOffset);
		circle.setAttribute('stroke', strokeColor);
		circle.setAttribute('stroke-linecap', this.strokeLinecap);
		return circle;
	}
};

module.exports = CircleGraph;
