import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setStatus } from '../actions/app-state-actions';
import {requestData, receiveData} from "../actions/tree-actions";
import { genericFetch } from "../utils/file-loader";
import {RECEIVE_DATA} from "../actions/tree-action-types";

import CollapsiblePanel from './collapsible-panel-component';
import LocationCollapsiblePanel from './location-collapsible-panel-component';
import ItemCollapsiblePanel from './item-collapsible-panel-component';
import ConditionCollapsiblePanel from './condition-collapsible-panel-component';

//import ItemEditForm from './item-edit-form';
//import LocationEditForm from './location-edit-form';

import { PageHeader } from 'react-bootstrap';

/**
 * App container object.
 */

class App extends Component{
    constructor(props){
        super(props);
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
        console.log('componentDidMount');
        //this.props.activateModal(true);

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
        const pageHeader = (
            <PageHeader>JSON Editor <small>app:{this.props.appStatus} / file:{this.props.treeStatus}</small></PageHeader>
        );

        return(
            <div>

                <p></p>
                {pageHeader}

                <CollapsiblePanel
                    list={this.props.config}
                    listName="Config"
                />
                <CollapsiblePanel
                    list={this.props.messages}
                    listName="Messages"
                />
                <CollapsiblePanel
                    list={this.props.verbs}
                    listName="Verbs"
                />
                <CollapsiblePanel
                    list={this.props.nouns}
                    listName="Nouns"
                />
                <LocationCollapsiblePanel
                    list={this.props.locations}
                    listName="Locations"
                />
                <ItemCollapsiblePanel
                    list={this.props.items}
                    listName="Items"
                />

                <ConditionCollapsiblePanel
                    list={this.props.conditions}
                    listName="Conditions"
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
        verbs: state.tree.verbs,
        locations: state.tree.locations,
        items: state.tree.items,
        conditions: state.tree.conditions

    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        setStatus,
        requestData,
        receiveData,
        genericFetch,
    }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
