'use strict';
var React = require('react');
var Actions = require('../actions');
var Store = require('../stores');

module.exports = React.createClass({
	signin: function(e) {
		e.preventDefault();
		var pin = e.target.querySelector('input').value;
		Store.logIn(pin);
	},
	render: function() {
		console.log(this.props);
		return (
			<div className="signIn">
				<form onSubmit={this.signin}>
					<h2>Enter pin</h2>
					{this.props.error ? <div className="alert alert-danger" role="alert">{this.props.error}</div>: null}
					<div className="input-group">
						<span className="input-group-addon" id="basic-addon1">
							<i className="fa fa-lock fa-2x"></i>
						</span>
						<input type="number" name="pin" className="form-control" placeholder="Password" />
					</div>
					<button className="btn btn-success btn-lg btn-block">Sign in</button>
				</form>
			</div>
		);
	}
});
