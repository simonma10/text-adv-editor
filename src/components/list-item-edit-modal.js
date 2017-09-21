import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';

import { activateModal } from "../actions/modal-actions"

class ListItemEditModal extends Component{
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            keyName: _.has(props, 'keyName') ? props.keyName : '',
            value: _.has(props, 'value') ? props.value : '',
            listName: _.has(props, 'value') ? props.value : '',
            mode: _.has(props, 'mode') ? props.mode : '',
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    render() {

        return (
            <div>
                <Button
                    bsStyle="primary"
                    onClick={this.open}
                >
                    Launch demo modal
                </Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.mode} {this.props.listName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label htmlFor="keyNameInput">Key</label>
                            <input type="text" className="form-control" id="keyNameInput" placeholder={this.props.keyName}/>
                            <label htmlFor="valueInput">Value</label>
                            <input type="text" className="form-control" id="valueInput" placeholder={this.props.value}/>

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn btn-primary">Save changes</Button>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        modalReducer: state.modalReducer
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        activateModal
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItemEditModal);


/*

 <p>Click to get the full Modal experience!</p>

 <Button
 bsStyle="primary"
 onClick={this.open}
 >
 Launch demo modal
 </Button>


 */