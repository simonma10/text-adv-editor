import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Col, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';
import _ from 'lodash';

import { toggleLocationModal } from '../actions/modal-actions';
import { saveLocationDetails } from '../actions/tree-actions';

class LocationEditForm extends Component{
    constructor() {
        super();
        this.state = {
            id: '',
            visited: '',
            name: '',
            description: '',
            exits: {
                "west":1,
                "north":3
            }
        };

        /*this.close = this.close.bind(this);
        this.save = this.save.bind(this);*/

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

    getValidationBoolean(value){
        if (value === '' || value ==='true' || value === 'false'){
            return 'success';
        } else {
            return 'error';
        }
    }


/*

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
*/

    renderExits(){
        return _.map(this.state.exits, (toLocation, direction) => {
            return (
                <Form inline key={direction}>
                    <FormGroup>
                        <ControlLabel>Direction</ControlLabel>
                        {' '}
                        <FormControl
                            type="text"
                            name="direction"
                            placeholder="direction"
                            value={direction}

                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>To</ControlLabel>
                        {' '}
                        <FormControl
                            type="text"
                            name="toLocation"
                            placeholder="toLocation"
                            value={toLocation}
                        />
                    </FormGroup>
                </Form>
            );
        })

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
                    validationState={this.getValidationBoolean(this.state.visited)}
                >
                    <Col componentClass={ControlLabel} sm={2}>
                        Visited
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            type="text"
                            name="visited"
                            value={this.state.visited}
                            placeholder="visited (must be 'true' or 'false')"
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
                            placeholder="Short name of location"
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
                            placeholder="description"
                            onChange={this.handleChange} />
                    </Col>
                </FormGroup>
                <FormGroup

                >
                    <Col componentClass={ControlLabel} sm={2}>
                        Exits
                    </Col>
                    <Col sm={10}>
                        {this.renderExits()}
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

export default connect(mapStateToProps, mapDispatchToProps)(LocationEditForm);

