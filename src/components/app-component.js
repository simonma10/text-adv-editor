import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setStatus } from '../actions/app-state-actions';


/**
 * App container object.
 */

class App extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.props.setAppStatus("ready");
    }

    render(){
        return(
            <div>
                Hello world. App Status is {this.props.appStatus}
            </div>
        );
    }
}

function mapStateToProps(state){
    // whenever application state changes:
    //  - component will auto re-render
    //  - the object in the state function will be assigned as props to the component
    return {
        appStatus: state.appState.status
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        setAppStatus: setStatus,
    }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(App);