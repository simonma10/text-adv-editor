import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal, InputGroup, FormGroup, FormControl } from 'react-bootstrap';
import _ from 'lodash';

import { constructModal, toggleLocationModal } from '../actions/modal-actions';
import { saveLocationDetails } from '../actions/tree-actions';

class LocationEditModal extends Component{
    constructor() {
        super();
        this.state = {
            id: '',
            visited: 'false',
            name: '',
            description: '',
            exits: {}
        };

        this.close = this.close.bind(this);
        this.save = this.save.bind(this);

        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e){
        console.log(e.target.name, e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }


    handleExitsChange(direction, toLocation){
        console.log('handleExitsChange', direction, toLocation);
        //this.setState({exits[direction]: toLocation});
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

    renderExits() {
        return _.map(this.props.modal.exits, (toLocation, direction, index) => {
            //console.log(direction, toLocation, index);
            return (
                <InputGroup key={direction}>
                    <InputGroup.Addon>Direction</InputGroup.Addon>
                    <FormControl
                        type="text"
                        name="direction"
                        placeholder={direction}
                        defaultValue={direction}
                        onChange={() => this.handleExitsChange(direction, toLocation)}/>
                    <InputGroup.Addon>To Location</InputGroup.Addon>
                    <FormControl
                        type="text"
                        name="toLocation"
                        placeholder={toLocation}
                        defaultValue={toLocation}
                        onChange={() => this.handleExitsChange(direction, toLocation)}/>
                </InputGroup>
            );
        })

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
                                 name="id"
                                 placeholder={this.props.modal.id}
                                 value={this.state.id}
                                 onChange={this.handleChange}
                            />
                            <label htmlFor="visitedInput">Visited</label>
                            <input
                                 type="text"
                                 className="form-control"
                                 id="visitedInput"
                                 name="visited"
                                 placeholder={this.props.modal.visited}
                                 value={this.state.visited}
                                 onChange={this.handleChange}
                             />
                            <label htmlFor="nameInput">Name</label>
                            <input
                                 type="text"
                                 className="form-control"
                                 id="nameInput"
                                 name="name"
                                 placeholder={this.props.modal.name}
                                 value={this.state.name}
                                 onChange={this.handleChange}
                            />
                            </span>
                            <label htmlFor="descriptionInput">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="descriptionInput"
                                name="description"
                                placeholder={this.props.modal.description}
                                value={this.state.description}
                                onChange={this.handleChange}
                            />
                            <label>Exits</label>
                            <FormGroup>
                                {this.renderExits()}
                            </FormGroup>


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

