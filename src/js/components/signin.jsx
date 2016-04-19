'use strict';
var React = require('react');
var Actions = require('../actions');
var Store = require('../stores');

module.exports = React.createClass({
	signin: function(e) {
		e.preventDefault();
	},
	render: function() {
		return (
			<div className="sign_in">
				<form onSubmit={this.signin}>
					<span className="user">
						<i className="fa fa-user fa-2x"></i>
						<input type="text" value="Username"/>
					</span>
					<span className="lock">
						<i className="fa fa-lock fa-2x"></i>
						<input type="password" value="Password"/>
					</span>
					<div className="login-right">
						<input type="submit" className="my-button btn-block" value="Sign in"/>
					</div>
				</form>
			</div>
		);
	}
});
