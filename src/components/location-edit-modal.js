import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';

import { constructModal, toggleLocationModal } from '../actions/modal-actions';
import { saveLocationDetails } from '../actions/tree-actions';

class LocationEditModal extends Component{
    constructor() {
        super();
        this.state = {
            id:'',
            visited:'false',
            name:'',
            description:'',
            exits:{}
        };

        this.close = this.close.bind(this);
        this.save = this.save.bind(this);

        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleVisitedChange = this.handleVisitedChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleExitsChange = this.handleExitsChange.bind(this);

    }

    handleIdChange(e){
        this.setState({id: e.target.value});
    }
    handleVisitedChange(e){
        this.setState({visited: e.target.value});
    }
    handleNameChange(e){
        this.setState({name: e.target.value});
    }
    handleDescriptionChange(e){
        this.setState({description: e.target.value});
    }
    handleExitsChange(e){
        this.setState({exits: e.target.value});
    }

    close() {
        this.props.toggleLocationModal();
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
        this.props.saveLocationDetails(payload);

        this.state.id = '';
        this.state.visited = 'false';
        this.state.name = '';
        this.state.description = '';
        this.state.exits={};

        this.close();
    }

    render() {

        return (
            <div>
                <Modal show={this.props.modal.showLocationModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Location</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <span>
                            <label htmlFor="idInput">id</label>
                            <input
                                 type="text"
                                 className="form-control"
                                 id="idInput"
                                 placeholder={this.props.modal.id}
                                 value={this.state.id}
                                 onChange={this.handleIdChange}
                            />
                            <label htmlFor="visitedInput">Visited</label>
                            <input
                                 type="text"
                                 className="form-control"
                                 id="visitedInput"
                                 placeholder={this.props.modal.visited}
                                 value={this.state.visited}
                                 onChange={this.handleVisitedChange}
                             />
                            <label htmlFor="nameInput">Name</label>
                            <input
                                 type="text"
                                 className="form-control"
                                 id="nameInput"
                                 placeholder={this.props.modal.name}
                                 value={this.state.name}
                                 onChange={this.handleNameChange}
                            />
                            </span>
                            <label htmlFor="descriptionInput">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="descriptionInput"
                                placeholder={this.props.modal.description}
                                value={this.state.description}
                                onChange={this.handleDescriptionChange}
                            />
                            <label htmlFor="exitsInput">Exits</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exitsInput"
                                placeholder={this.props.modal.exits}
                                value={this.state.exits}
                                onChange={this.handleExitsChange}
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
        toggleLocationModal,
        saveLocationDetails
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationEditModal);


/*



 */