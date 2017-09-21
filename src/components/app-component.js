import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { setStatus } from '../actions/app-state-actions';
import {requestData, receiveData} from "../actions/tree-actions";
import { genericFetch } from "../utils/file-loader";
import { activateModal } from '../actions/modal-actions';
import {RECEIVE_DATA} from "../actions/tree-action-types";

import CollapsibleList from './collapsible-list-component';
import ListItemEditModal from './list-item-edit-modal';

import { Nav, NavItem, NavDropdown, MenuItem, PageHeader } from 'react-bootstrap';

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
        console.log('componentDidMount');
        this.props.activateModal(true);

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
            <PageHeader>Text Adventure Editor <small>app:{this.props.appStatus} / file:{this.props.treeStatus}</small></PageHeader>
        );

        let listItemEditModal = (
            <ListItemEditModal
                keyName="key"
                value="value"
                listName="test list"
                mode="Edit"
            />
        );

        return(
            <div>
                <p></p>
                {pageHeader}
                {listItemEditModal}
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
        genericFetch,
        activateModal
    }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(App);

/*


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

 const NavDropdownExample = React.createClass({
 handleSelect(eventKey) {
 event.preventDefault();
 alert(`selected ${eventKey}`);
 },

 render() {
 return (
 <Nav bsStyle="tabs" activeKey="1" onSelect={this.handleSelect}>
 <NavItem eventKey="1" href="/home">NavItem 1 content</NavItem>
 <NavItem eventKey="2" title="Item">NavItem 2 content</NavItem>
 <NavItem eventKey="3" disabled>NavItem 3 content</NavItem>
 <NavDropdown eventKey="4" title="Dropdown" id="nav-dropdown">
 <MenuItem eventKey="4.1">Action</MenuItem>
 <MenuItem eventKey="4.2">Another action</MenuItem>
 <MenuItem eventKey="4.3">Something else here</MenuItem>
 <MenuItem divider />
 <MenuItem eventKey="4.4">Separated link</MenuItem>
 </NavDropdown>
 </Nav>
 );
 }
 });



 */