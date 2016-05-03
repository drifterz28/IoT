// basic store, not compleate
'use strict';
var Reflux = require('reflux');
var Actions = require('./actions');
var moment = require('moment');

var _locations = [];
var masterPin = '17760704';
module.exports = Reflux.createStore({
	init: function() {
	// 	this.listenTo(Actions.loginCheck, this.CheckSession);
	// 	this.listenTo(Actions.logIn, this.logIn);
	},
	logIn: function(pin) {
		if(pin === masterPin) {
			var localState = {
				isSignedIn: true,
				error: null
			};
			localStorage.IoT = JSON.stringify(localState);
			this.trigger(localState);
		} else {
			this.trigger({error: 'Pin did not match'});
		}
	},
	defaults: function() {
		if(localStorage.IoT) {
			return JSON.parse(localStorage.IoT);
		}
		return null;
	},
	signOut: function() {
		delete localStorage.IoT;
		this.trigger();
	},
});
