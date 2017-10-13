import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Col, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';
import _ from 'lodash';

import { toggleGenericModal } from '../actions/modal-actions';
import { saveListItemDetails } from '../actions/tree-actions';

class ListItemEditForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            keyInput: this.props.modal.itemIndex,
            valueInput: this.props.modal.itemValue
        };

        this.close = this.close.bind(this);
        this.save = this.save.bind(this);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    close() {
        this.props.toggleGenericModal();
    }

    save(){
        let payload = {
            listName: this.props.modal.listName,
            list: this.props.modal.list,

            oldIndex: this.props.modal.itemIndex,
            newIndex: this.state.keyInput,

            oldValue: this.props.modal.itemValue,
            newValue: this.state.valueInput,

        };

        this.props.saveListItemDetails(payload);

        this.state.itemIndex = '';
        this.state.itemValue = '';

        this.close();
    }



    render() {
        return (
            <Form horizontal>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        Key
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            type="text"
                            name="keyInput"
                            value={this.state.keyInput}
                            onChange={this.handleChange} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        Value
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            type="text"
                            name="valueInput"
                            value={this.state.valueInput}
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
        saveListItemDetails,
        toggleGenericModal
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItemEditForm);

