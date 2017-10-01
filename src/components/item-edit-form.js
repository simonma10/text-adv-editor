import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Col, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';
import _ from 'lodash';

import { toggleGenericModal } from '../actions/modal-actions';
import { saveItemDetails } from '../actions/tree-actions';

class ItemEditForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.modal.id,
            location: this.props.modal.location,
            name: this.props.modal.name,
            shortdescription: this.props.modal.shortdescription,
            description: this.props.modal.description
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

    close() {
        this.props.toggleGenericModal();
    }

    save(){
        let payload = {
            listName: this.props.modal.listName,
            list: this.props.modal.list,

            oldId: this.props.modal.id,
            newId: this.state.id,

            oldLocation: this.props.modal.location,
            newLocation: this.state.location,

            oldName: this.props.modal.name,
            newName: this.state.name,

            oldDescription: this.props.modal.description,
            newDescription: this.state.description,

            oldShortdescription: this.props.modal.shortdescription,
            newShortdescription: this.state.shortdescription,
        };
        //console.log('save', payload);
        this.props.saveItemDetails(payload);

        this.state.id = '';
        this.state.name = '';
        this.state.location = '';
        this.state.description = '';
        this.state.shortdescription='';

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
                        Shortdesc
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
        saveItemDetails,
        toggleGenericModal
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemEditForm);

