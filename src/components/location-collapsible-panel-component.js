import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Panel, Table, Glyphicon } from 'react-bootstrap';
import _ from 'lodash';

//import LocationEditModal from './location-edit-modal';
import GenericEditModal from './generic-edit-modal';
import { constructModal, toggleLocationModal, toggleGenericModal } from '../actions/modal-actions';
import { deleteLocation } from '../actions/tree-actions';

class LocationCollapsiblePanel extends Component{
    constructor(props) {
        super(props);
        this.state = {
            list: _.has(props, 'list') ? props.list : {},
            //listName: 'Locations',
        }
        this.add = this.add.bind(this);
    }

    edit(location){
        //console.log('edit', index, value);
        let payload = {
            listName: this.props.listName,
            list: this.props.list,
            showLocationModal: false,
            showGenericModal: false,
            id: location.id,
            name: location.name,
            description: location.description,
            visited: location.visited,
            exits: location.exits
        };
        this.props.constructModal(payload);
        this.props.toggleGenericModal();
    }

    delete(id){
        //console.log('delete', index);
        let payload = {
            listName: this.props.listName,
            id: id
        }
        this.props.deleteLocation(payload);
    }

    add(){
        console.log('add');
        let payload = {
            listName: this.props.listName,
            list: this.props.list,
            id: '',
            name: '',
            description: '',
            visited: 'false',
            exits: {}
        };
        this.props.constructModal(payload);
        this.props.toggleGenericModal();
    }

    renderList(){
        return _.map(this.props.list, (location) => {
            //console.log(location, location.id);
            return (
                <tr key={location.id}>
                    <td width="10%">{location.id}</td>
                    <td width="20%">{location.name}</td>
                    <td width="60%">{location.description}</td>
                    <td width="10%" className="right-align">
                        <a href="#"
                           onClick={() => this.edit(location)}
                        > <Glyphicon glyph="pencil"/> </a>
                        <a href="#" onClick={() => this.delete(location.id)}> <Glyphicon glyph="trash"/> </a>
                    </td>
                </tr>
            )
        });
    }

    render() {
        const footer = (
            <span>
                <a href="#" onClick={this.add}>New</a>
            </span>
        );

        return (
            <div>
                <GenericEditModal/>
                <Panel collapsible header={this.props.listName} footer={footer}>
                    <Table fill>
                        <tbody>
                        {this.renderList()}
                        </tbody>
                    </Table>
                </Panel>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        modalReducer: state.modalReducer,
        status: state.tree.status,
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        constructModal,
        toggleLocationModal,
        toggleGenericModal,
        deleteLocation,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationCollapsiblePanel);

/*

 idKey, id,
 nameKey, name,
 descriptionKey, description,
 visitedKey, visited,
 exitsKey, exits
 */