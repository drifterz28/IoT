'use strict';
var React = require('react');
var Actions = require('../actions');
var Store = require('../stores');

var Card = require('./card.jsx');
var Signin = require('./signin.jsx');
var MainContent = require('./main-content.jsx');
var Navigation = require('./navigation.jsx');

module.exports = React.createClass({
    getInitialState:function() {
        return {
            path: 'home'
        };
    },
    componentDidMount: function() {
        this.unsubscribe = Store.listen(this.onChange);
    },
    componentWillUnmount: function() {
        this.unsubscribe();
    },
    onChange: function() {
        this.setState({
            path: Store.getPath()
        });
    },
    render: function() {
        return (
            <div className="container">
                <Navigation {...this.state}/>
                <Signin />
            </div>
        );
    }
});
