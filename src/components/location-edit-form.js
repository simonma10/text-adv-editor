import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Col, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';
import _ from 'lodash';

import { toggleGenericModal } from '../actions/modal-actions';
import { saveLocationDetails } from '../actions/tree-actions';

class LocationEditForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.modal.id,
            visited: this.props.modal.visited,
            name: this.props.modal.name,
            description: this.props.modal.description,
            exits: JSON.stringify(this.props.modal.exits)
        };

        this.close = this.close.bind(this);
        this.save = this.save.bind(this);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
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

    getValidationJson(value){
        if(JSON.parse(value)){
            return 'success';
        } else {
            return 'error';
        }
    }

    close() {
        this.props.toggleGenericModal();
    }

    save(){
        //TODO: ensure validation logic = OK before saving
        let exitsParse = JSON.parse(this.state.exits);
        let payload = {
            listName: this.props.modal.listName,
            list: this.props.modal.list,

            oldId: this.props.modal.id,
            newId: this.state.id,

            oldVisited: this.props.modal.visited,
            newVisited: this.state.visited,

            oldName: this.props.modal.name,
            newName: this.state.name,

            oldDescription: this.props.modal.description,
            newDescription: this.state.description,

            oldExits: this.props.modal.exits,
            newExits: exitsParse,
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


    renderExitRow(direction, toLocation, index = direction){
        return (
            <div key={index}>
                <Col sm={2}>
                    <ControlLabel>Direct'n</ControlLabel>
                </Col>
                <Col sm={4}>
                    <FormGroup>
                        <FormControl
                            type="text"
                            name="direction"
                            placeholder="direction"
                            value={direction}
                            onChange={this.handleChange}

                        />
                    </FormGroup>
                </Col>
                <Col sm={2}>
                    <ControlLabel>To Loc</ControlLabel>
                </Col>

                <Col sm={4}>
                    <FormGroup>
                        <FormControl
                            type="text"
                            name="toLocation"
                            placeholder="toLocation"
                            value={this.state.exits[direction]}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                </Col>
            </div>
        )
    }


    renderExits(){
        return _.map(this.state.exits, (toLocation, direction) => {
            return (
                this.renderExitRow(direction, toLocation)
            );
        })

    }



    render() {
        //TODO: render exits nicely, in an actual form component
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
                            componentClass="textarea"
                            name="description"
                            value={this.state.description}
                            placeholder="description"
                            onChange={this.handleChange} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        Exits
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            componentClass="textarea"
                            placeholder="exits"
                            name="exits"

                            value={this.state.exits}
                            onChange={this.handleChange}
                        />
                    </Col>
                </FormGroup>
                <hr/>
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button onClick={this.save} className="btn btn-primary">Save Changes</Button>
                        {'  '}
                        <Button onClick={this.close}>Cancel</Button>
                    </Col>
                </FormGroup>

            </Form>
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
        saveLocationDetails,
        toggleGenericModal
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationEditForm);

/*
 {this.renderExits()}
 {this.renderExitRow('new', 0)}

 validationState={this.getValidationJson(this.state.exits)}


 */