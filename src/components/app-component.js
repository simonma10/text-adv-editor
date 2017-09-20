import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { setStatus } from '../actions/app-state-actions';
import {requestData, receiveData} from "../actions/tree-actions";
import { genericFetch } from "../utils/file-loader"
import {RECEIVE_DATA} from "../actions/tree-action-types";

import CollapsibleList from './collapsible-list-component';
import ListItemEditModal from './list-item-edit-modal';

/**
 * App container object.
 */

class App extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    componentWillMount(){
        console.log('componentWilLMount');
        this.props.genericFetch({
            method: 'GET',
            dataUrl: '/data/globals.json',
            dataAcquiredType: RECEIVE_DATA,
            successCallBack: this.getSuccess,
            failCallBack: this.getFail
        });
    }

    componentDidMount(){
        console.log('componentDidMount')
    }

    getSuccess() {
        console.log('success');


    }
    getFail() {
        console.log('File read failure');
        alert('file load failure');
    }

    componentDidMount(){
        this.props.setStatus("ready");
    }

    render(){
        return(
            <div>
                <p>Hello world. App Status: {this.props.appStatus}.  File Status: {this.props.treeStatus}</p>
                <ListItemEditModal
                    keyName="key"
                    value="value"
                    listName="random list"
                    mode="Edit"
                />
                <CollapsibleList
                    listName="Config"
                    list={this.props.config}
                />
                <CollapsibleList
                    listName="Messages"
                    list={this.props.messages}
                />
                <CollapsibleList
                    listName="Nouns"
                    list={this.props.nouns}
                />
                <CollapsibleList
                    listName="Verbs"
                    list={this.props.verbs}
                />
            </div>
        );
    }
}

function mapStateToProps(state){
    // whenever application state changes:
    //  - component will auto re-render
    //  - the object in the state function will be assigned as props to the component
    return {
        appStatus: state.appState.status,
        config: state.tree.config,
        treeStatus: state.tree.status,
        messages: state.tree.messages,
        nouns: state.tree.nouns,
        verbs: state.tree.verbs

    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        setStatus,
        requestData,
        receiveData,
        genericFetch
    }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(App);

