'use strict';
var React = require('react');
var Actions = require('../actions');
var Store = require('../stores');

var navItems = [
    {
        id: 1,
        name: 'Temp Sensors',
        path: 'temperature'
    },
    {
        id: 2,
        name: 'Sprinklers',
        path: 'sprinklers'
    },
    {
        id: 3,
        name: 'Alarm',
        path: 'alarm'
    }
];

module.exports = React.createClass({
    navigate: function(e) {
        e.preventDefault();
    },
    render: function() {
        return (
            <div className="navWrapper top-nav">
                <ul>
                {navItems.map(function(nav, i) {
                    return (
                        <li key={nav.id}>
                            <a href="#" onClick={this.navigate} data-id={nav.id}>{nav.name}</a>
                        </li>
                    );
                }.bind(this))}
                </ul>
            </div>
        );
    }
});
