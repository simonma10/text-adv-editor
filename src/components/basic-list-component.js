import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getList, setList } from '../actions/tree-actions';


class BasicList extends Component{
    constructor(props){
        super(props);
        this.state = {
            listName: '',
            list: []
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        this.props.setAppStatus("ready");
    }

    handleClick(e){
        e.preventDefault();
        console.log('clicked button');
        this.props.setAppStatus("clicked");
    }

    render(){
        return(
            <div>
                <p>TA Editor. App Status is {this.props.appStatus}
                    <button onClick={this.handleClick}>Click me!</button>
                </p>
                <hr/>

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
        setList: setList,
        getList: getList
    }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(App);