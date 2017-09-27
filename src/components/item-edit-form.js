import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Col, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';
import _ from 'lodash';

import { toggleLocationModal } from '../actions/modal-actions';
import { saveItemDetails } from '../actions/tree-actions';

class ItemEditForm extends Component{
    constructor() {
        super();
        this.state = {
            id: '',
            location: '',
            name: '',
            shortdescription: '',
            description: ''
        };

        this.close = this.close.bind(this);
        this.save = this.save.bind(this);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        console.log(e.target.name, e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }

    getValidationIsNumeric(value){
        if (value === '' || parseInt(value)){
            return 'success';
        } else {
            return 'error';
        }
    }

    close() {
        //this.props.toggleLocationModal();
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
        this.props.saveItemDetails(payload);

        this.state.id = '';
        this.state.visited = 'false';
        this.state.name = '';
        this.state.description = '';
        this.state.exits={};

        this.close();
    }



    render() {
        return (
            <Form horizontal>
                <FormGroup
                    validationState={this.getValidationIsNumeric(this.state.id)}
                >
                    <Col componentClass={ControlLabel} sm={2}>
                        ID
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            type="text"
                            name="id"
                            value={this.state.id}
                            placeholder="id (must be an integer)"
                            onChange={this.handleChange} />
                    </Col>
                </FormGroup>
                <FormGroup
                    validationState={this.getValidationIsNumeric(this.state.location)}
                >
                    <Col componentClass={ControlLabel} sm={2}>
                        Location
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            type="text"
                            name="location"
                            value={this.state.location}
                            placeholder="location (must be an integer)"
                            onChange={this.handleChange} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        Name
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            type="text"
                            name="name"
                            value={this.state.name}
                            placeholder="name (e.g. key, parrot)"
                            onChange={this.handleChange} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        Short Desc
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            type="text"
                            name="shortdescription"
                            value={this.state.shortdescription}
                            placeholder="short description for inventory (e.g 'an ornate key')"
                            onChange={this.handleChange} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        Description
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            type="text"
                            name="description"
                            value={this.state.description}
                            placeholder="description for 'examine' (e.g. 'this key looks useful')"
                            onChange={this.handleChange} />
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}


function mapStateToProps(state) {
    return {
        //modal: state.modal
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemEditForm);

