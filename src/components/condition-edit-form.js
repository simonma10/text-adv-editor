import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Col, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';
import _ from 'lodash';

import { toggleGenericModal } from '../actions/modal-actions';
import { saveConditionDetails } from '../actions/tree-actions';

class ConditionEditForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.modal.id,
            tests: JSON.stringify(this.props.modal.tests,null,2),
            actions: JSON.stringify(this.props.modal.actions, null, 2)
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
        let testsParse = JSON.parse(this.state.tests);
        let actionsParse = JSON.parse(this.state.actions);
        let payload = {
            listName: this.props.modal.listName,
            list: this.props.modal.list,

            oldId: this.props.modal.id,
            newId: this.state.id,

            oldTests: this.props.modal.tests,
            newTests: testsParse,

            oldActions: this.props.modal.actions,
            newActions: actionsParse,
        };
        console.log('save', payload);
        this.props.saveConditionDetails(payload);

        this.state.id = '';

        this.state.tests={};
        this.state.actions={};

        this.close();
    }



    render() {
        //TODO: render tests and actions nicely, in an actual form component
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

                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        Tests
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            componentClass="textarea"
                            placeholder="tests"
                            name="tests"
                            rows="8"

                            value={this.state.tests}
                            onChange={this.handleChange}
                        />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        Actions
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            componentClass="textarea"
                            placeholder="actions"
                            name="actions"
                            rows="8"

                            value={this.state.actions}
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
        saveConditionDetails,
        toggleGenericModal
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConditionEditForm);

