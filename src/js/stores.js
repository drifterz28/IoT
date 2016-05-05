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
	doorsData: function(date, count) {
		var url = './api/alarm.php?action=get&count=' + count;
		if(date) {
			url += '&date=' + date;
		}
		fetch(url).then(function(response) {
			return response.json();
		}).then(function(j) {
			this.trigger({doors: j});
		}.bind(this));
	},
	deleteDoor: function(e) {
		var dataId = e.target.getAttribute('data-id');
		fetch('./api/alarm.php?action=delete&id=' + dataId).then(function(response) {
			return response.json();
		}).then(function(j) {
			this.trigger();
		}.bind(this));
	},
	tempSensorsData: function() {
		fetch('./api/temp-track.php/list/locations').then(function(response) {
			return response.json();
		}).then(function(j) {
			this.trigger({
				temp: {
					sensors: j
				}
			}
		);
		}.bind(this));
	}
});
