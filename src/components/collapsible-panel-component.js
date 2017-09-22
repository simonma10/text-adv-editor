import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Panel, Table, Button, Glyphicon, ButtonGroup } from 'react-bootstrap';
import _ from 'lodash';

import ListItemEditModal from './list-item-edit-modal';
import { constructModal, toggleModal } from "../actions/modal-actions"

class CollapsiblePanel extends Component{
    constructor(props) {
        super(props);
        this.state = {
            list: _.has(props, 'list') ? props.list : {},
            listName: _.has(props, 'listName') ? props.listName : 'list',
            activeIndex: '',
            activeValue: '',
            mode: 'Edit'
        }


    }
    edit(index, value){
        console.log('edit', index, value);
        let payload = {
            listName: this.props.listName,
            list: this.props.list,
            showModal: false,
            itemIndex: index,
            itemValue: value
        }

        this.props.constructModal(payload);
        this.props.toggleModal();

    }

    delete(index){
        console.log('delete', index);
    }

    renderList(){
        return _.map(this.props.list, (value, index) => {
            return (
                <tr key={index}>
                    <td width="30%">{index}</td>
                    <td width="60%">{value}</td>
                    <td width="10%" className="right-align">
                        <a href="#" onClick={() => this.edit(index, value)}><Glyphicon glyph="pencil"/></a>
                        <a href="#" onClick={() => this.delete(index)}><Glyphicon glyph="trash"/></a>
                    </td>
                </tr>
            )
        });
    }

    render() {

        return (
            <Panel collapsible defaultExpanded header={this.props.listName}>
                <Table fill>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </Table>
                <ListItemEditModal />
            </Panel>
        );
    }
}


function mapStateToProps(state) {
    return {
        modalReducer: state.modalReducer,
        status: state.tree.status,
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        constructModal,
        toggleModal
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CollapsiblePanel);