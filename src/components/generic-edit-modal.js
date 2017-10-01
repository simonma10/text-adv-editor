import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal, InputGroup, FormGroup, FormControl } from 'react-bootstrap';

import { constructModal, toggleGenericModal } from '../actions/modal-actions';

import LocationEditForm from './location-edit-form';
import ItemEditForm from './item-edit-form';
import ConditionEditForm from './condition-edit-form';


class GenericEditModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            listName:'',
            index:'',
            value:'',
            id: '',
            location:0,
            visited: 'false',
            name: '',
            description: '',
            shortdescription:'',
            exits: {},
            tests: {},
            actions: {}
        };

        this.close = this.close.bind(this);
        this.save = this.save.bind(this);

        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e){
        //console.log(e.target.name, e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }

    close() {
        this.props.toggleGenericModal();
    }

    save(){
        let payload = {
            oldId: this.props.modal.id,
            newId: this.state.id,
            oldVisited: this.props.modal.visited,
            newVisited: this.state.visited,
            oldName: this.props.modal.name,
            newName: this.state.name,
            oldDescription: this.props.modal.description,
            newDescription: this.state.description,
            oldExits: this.props.modal.exits,
            newExits: this.state.exits,
        };
        console.log('save', payload);
        this.props.saveLocationDetails(payload);

        this.state.id = '';
        this.state.visited = 'false';
        this.state.name = '';
        this.state.description = '';
        this.state.exits={};

        this.close();
    }


    getForm(){
        console.log('listName is ', this.props.modal.listName);
        switch(this.props.modal.listName){
            case 'Locations':
                return(
                    <LocationEditForm/>
                );
                break;

            case 'Items':
                return(
                    <ItemEditForm/>
                );
                break;

            case 'Conditions':
                return(
                    <ConditionEditForm/>
                );
                break;


            default:
                return(
                    <div>
                        Error: listName not found
                    </div>
                )
        }

    }

    render() {

        return (
            <div>
                <Modal show={this.props.modal.showGenericModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit {this.props.modal.listName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.getForm()}
                    </Modal.Body>

                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        modal: state.modal
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        constructModal,
        toggleGenericModal
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GenericEditModal);
