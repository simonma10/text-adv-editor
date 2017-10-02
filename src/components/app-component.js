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

import GenericEditModal from './generic-edit-modal';
import { constructModal, toggleGenericModal } from '../actions/modal-actions';
import { deleteItem } from '../actions/tree-actions';


import { PageHeader, Button } from 'react-bootstrap';

/**
 * App container object.
 */

class App extends Component{
    constructor(props){
        super(props);

        this.handleSaveClick = this.handleSaveClick.bind(this);
    }

    componentWillMount(){
        this.props.genericFetch({
            method: 'GET',
            dataUrl: '/data',
            dataAcquiredType: RECEIVE_DATA,
            successCallBack: this.getSuccess,
            failCallBack: this.getFail
        });


    }

    getSuccess(payload) {
        console.log('genericFetch success', payload);
    }

    getFail(error) {
        console.log('genericFetch failure', error);
        alert('file I/O failure');
    }

    handleSaveClick(){

        let data = '{ "config":' + JSON.stringify(this.props.config, null, 2) +
            ', "messages": ' + JSON.stringify(this.props.messages, null, 2) +
            ', "verbs": ' + JSON.stringify(this.props.verbs, null, 2) +
            ', "nouns": ' + JSON.stringify(this.props.nouns, null, 2) +
            ', "locations": ' + JSON.stringify(this.props.locations, null, 2) +
            ', "items": ' + JSON.stringify(this.props.items, null, 2) +
            ', "conditions": ' + JSON.stringify(this.props.conditions, null, 2) +
        '}';
        let payload = {
            listName: 'Dump',
            showGenericModal: false,
            description: data
        };
        this.props.constructModal(payload);
        this.props.toggleGenericModal();

      /*  this.props.genericFetch({
            method: 'POST',
            dataUrl: '/data',
            data: payload,
            successCallBack: this.getSuccess,
            failCallBack: this.getFail
        });*/
    }

    componentDidMount(){
        this.props.setStatus("ready");
    }

    render(){
        const pageHeader = (
            <PageHeader>JSON Editor <small>app:{this.props.appStatus} / file:{this.props.treeStatus} <Button onClick={this.handleSaveClick}>Save</Button></small></PageHeader>
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
        constructModal,
        toggleGenericModal
    }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
