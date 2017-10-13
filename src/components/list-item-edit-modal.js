import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal, Col, ControlLabel, Form, FormGroup, FormControl } from 'react-bootstrap';

import { constructModal, toggleModal } from '../actions/modal-actions';
import { saveListItemDetails } from '../actions/tree-actions';

class ListItemEditModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            keyNameInput: this.props.modal.itemIndex,
            valueNameInput: this.props.modal.itemValue
        }

        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e){
        //console.log(e)
        this.setState({ [e.target.name]: e.target.value});
    }


    close() {
        this.props.toggleModal();
    }


    save(){
        let payload = {
            listName: this.props.modal.listName,
            oldIndex: this.props.modal.itemIndex,
            newIndex: this.state.keyNameInput,
            oldValue: this.props.modal.itemValue,
            newValue: this.state.valueNameInput
        };
        console.log('save', payload);
        this.props.saveListItemDetails(payload);

        this.state.valueNameInput = '';
        this.state.keyNameInput = '';
        this.close();
    }

    render() {

        return (
            <div>

                <Modal show={this.props.modal.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.modal.mode} {this.props.modal.listName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form horizontal>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Key
                                </Col>
                                <Col sm={10}>
                                    <FormControl
                                        type="text"
                                        name="keyNameInput"
                                        value={this.state.keyNameInput}

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
                                        name="valueNameInput"
                                        value={this.state.valueNameInput}

                                        onChange={this.handleChange} />
                                </Col>
                            </FormGroup>

                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.save} className="btn btn-primary">Save changes</Button>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
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
        toggleModal,
        saveListItemDetails
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItemEditModal);


/*
 <div className="form-group">
 <label htmlFor="keyNameInput">Key</label>
 <input
 type="text"
 className="form-control"
 id="keyNameInput"
 value={this.state.keyNameInput}
 placeholder='key'
 onChange={this.handleKeyChange}
 />
 <label htmlFor="valueInput">Value</label>
 <input
 type="text"
 className="form-control"
 id="valueInput"
 value={this.state.valueNameInput}
 placeholder="value"
 onChange={this.handleValueChange}
 />
 </div>


 */