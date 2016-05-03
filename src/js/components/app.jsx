'use strict';
var React = require('react');
var Actions = require('../actions');
var Store = require('../stores');
var objectAssign = require('../object-assign');

var Signin = require('./signin.jsx');
var Container = require('./container.jsx');

var defaultProps = {
	isSignedIn: false,
	error: null
};

module.exports = React.createClass({
	getInitialState:function() {
		var defaults = objectAssign({}, defaultProps, Store.defaults());
		return defaults;
	},
	componentDidMount: function() {
		this.unsubscribe = Store.listen(this.onChange);
	},
	componentWillUnmount: function() {
		this.unsubscribe();
	},
	onChange: function(status) {
		console.log(status);
		var newState = objectAssign({}, this.state, status);
		this.setState(newState);
	},
	render: function() {
		return (
			<div className="container">
				{!this.state.isSignedIn ?
					<Signin {...this.state}/> :
					<Container {...this.state}/>
				}
			</div>
		);
	}
});
