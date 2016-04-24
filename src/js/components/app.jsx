'use strict';
var React = require('react');
var Actions = require('../actions');
var Store = require('../stores');

var Signin = require('./signin.jsx');

module.exports = React.createClass({
    getInitialState:function() {

    },
    componentDidMount: function() {
        this.unsubscribe = Store.listen(this.onChange);
    },
    componentWillUnmount: function() {
        this.unsubscribe();
    },
    onChange: function() {
        
    },
    render: function() {
        return (
            <div className="container">
                <Signin />
            </div>
        );
    }
});
