import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import _ from 'lodash';
import { activateModal } from "../actions/modal-actions"

class ListItemEditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyName: _.has(props, 'keyName') ? props.keyName : '',
            value: _.has(props, 'value') ? props.value : '',
            listName: _.has(props, 'value') ? props.value : '',
            mode: _.has(props, 'mode') ? props.mode : '',
            modalReducer: {},

        }
    }
    canvasOnClick = () => {
        const { modalReducer } = this.props;
        if (modalReducer.canvasOnClick) {
            this.props.activateModal(false);
        }
    }


    render() {
        let href = '#' + this.props.listName;
        return (
            <div>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#listItemEditModal">
                    Launch demo modal
                </button>

                <div className="modal fade" id="listItemEditModal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.props.mode} {this.props.listName}</h5>
                                <button type="button" className="close" data-dismiss="modal">
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="keyNameInput">Key</label>
                                    <input type="text" className="form-control" id="keyNameInput" placeholder={this.props.keyName}/>
                                    <label htmlFor="valueInput">Value</label>
                                    <input type="email" className="form-control" id="valueInput" placeholder={this.props.value}/>

                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
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
function mapStateToProps(state){
    // whenever application state changes:
    //  - component will auto re-render
    //  - the object in the state function will be assigned as props to the component
    return {
        status: state.tree.status,

    }
}*/
/*

function mapDispatchToProps(dispatch){
    return bindActionCreators({

    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CollapsibleList);




*/


