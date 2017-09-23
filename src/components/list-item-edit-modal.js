import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';

import { constructModal, toggleModal } from '../actions/modal-actions';
import { saveListItemDetails } from '../actions/tree-actions';

class ListItemEditModal extends Component{
    constructor() {
        super();
        this.state = {
            keyNameInput:'',
            valueNameInput: ''
        }

        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.handleKeyChange = this.handleKeyChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    handleKeyChange(e){
        //console.log(e)
        this.setState({keyNameInput: e.target.value});
    }

    handleValueChange(e){
        //console.log(e);
        this.setState({valueNameInput: e.target.value});
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
                        <div className="form-group">
                            <label htmlFor="keyNameInput">Key</label>
                            <input
                                type="text"
                                className="form-control"
                                id="keyNameInput"
                                placeholder={this.props.modal.itemIndex}
                                value={this.state.keyNameInput}
                                onChange={this.handleKeyChange}
                            />
                            <label htmlFor="valueInput">Value</label>
                            <input
                                type="text"
                                className="form-control"
                                id="valueInput"
                                placeholder={this.props.modal.itemValue}
                                value={this.state.valueNameInput}
                                onChange={this.handleValueChange}
                            />
                        </div>
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
