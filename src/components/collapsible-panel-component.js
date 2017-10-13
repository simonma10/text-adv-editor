import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Panel, Table, Glyphicon } from 'react-bootstrap';
import _ from 'lodash';

import ListItemEditModal from './list-item-edit-modal';
//import { constructModal, toggleModal } from '../actions/modal-actions';
import { deleteListItem } from '../actions/tree-actions';
import GenericEditModal from './generic-edit-modal';
import { constructModal, toggleGenericModal } from '../actions/modal-actions';



class CollapsiblePanel extends Component{
    constructor(props) {
        super(props);
        this.state = {
            list: _.has(props, 'list') ? props.list : {},
            listName: _.has(props, 'listName') ? props.listName : 'list',
        }
        this.add = this.add.bind(this);
    }

    edit(index, value){
        //console.log('edit', index, value);
        let payload = {
            listName: this.props.listName,
            list: this.props.list,
            showGenericModal: false,
            itemIndex: index,
            itemValue: value
        };
        this.props.constructModal(payload);
        this.props.toggleGenericModal();
    }

    delete(index){
        //console.log('delete', index);
        let payload = {
            listName: this.props.listName,
            itemKey: index
        }
        this.props.deleteListItem(payload);
    }

    add(){
        console.log('add');
        let payload = {
            listName: this.props.listName,
            list: this.props.list,
            showGenericModal: false,
            itemIndex: '',
            itemValue: ''
        };
        this.props.constructModal(payload);
        this.props.toggleGenericModal();
    }

    renderList(){
        return _.map(this.props.list, (value, index) => {
            return (
                <tr key={index}>
                    <td width="30%">{index}</td>
                    <td width="60%">{value}</td>
                    <td width="10%" className="right-align">
                        <a href="#" onClick={() => this.edit(index, value)}> <Glyphicon glyph="pencil"/> </a>
                        <a href="#" onClick={() => this.delete(index)}> <Glyphicon glyph="trash"/> </a>
                    </td>
                </tr>
            )
        });
    }

    render() {
        const footer = (
            <span>
                <a href="#" onClick={this.add}>New</a>
            </span>
        );

        return (
            <div>
                <ListItemEditModal/>
                <Panel collapsible header={this.props.listName} footer={footer}>
                    <Table fill>
                        <tbody>
                            {this.renderList()}
                        </tbody>
                    </Table>
                </Panel>
            </div>
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
        toggleGenericModal,
        deleteListItem,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CollapsiblePanel);
