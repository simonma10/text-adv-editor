import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Col, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';
import _ from 'lodash';

import { toggleGenericModal } from '../actions/modal-actions';

class DataDumpForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.modal.id,
            tests: JSON.stringify(this.props.modal.tests,null,2),
            actions: JSON.stringify(this.props.modal.actions, null, 2)
        };

        this.close = this.close.bind(this);
        //this.save = this.save.bind(this);

        //this.handleChange = this.handleChange.bind(this);
    }

/*
    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }
*/

    close() {
        this.props.toggleGenericModal();
    }

    /*save(){
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
    }*/



    render() {
        //TODO: render tests and actions nicely, in an actual form component
        return (
            <Form horizontal>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        Data
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            componentClass="textarea"
                            name="data"
                            rows="15"

                            value={this.props.modal.description}
                        />
                    </Col>
                </FormGroup>

                <hr/>
                <FormGroup>
                    <Col smOffset={2} sm={10}>

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
        toggleGenericModal
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DataDumpForm);

