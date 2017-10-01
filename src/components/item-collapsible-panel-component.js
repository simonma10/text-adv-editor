import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Panel, Table, Glyphicon } from 'react-bootstrap';
import _ from 'lodash';

import GenericEditModal from './generic-edit-modal';
import { constructModal, toggleGenericModal } from '../actions/modal-actions';
import { deleteItem } from '../actions/tree-actions';

class ItemCollapsiblePanel extends Component{
    constructor(props) {
        super(props);
        this.state = {
            list: _.has(props, 'list') ? props.list : {},
            //listName: 'Locations',
        }
        this.add = this.add.bind(this);
    }

    edit(item){
        //console.log('edit', index, value);
        let payload = {
            listName: this.props.listName,
            list: this.props.list,
            showGenericModal: false,
            id: item.id,
            location: item.location,
            name: item.name,
            description: item.description,
            shortdescription: item.shortdescription
        };
        this.props.constructModal(payload);
        this.props.toggleGenericModal();
    }

    delete(id){
        //console.log('delete', index);
        let payload = {
            listName: this.props.listName,
            id: id
        }
        this.props.deleteItem(payload);
    }

    add(){
        console.log('add');
        let payload = {
            listName: this.props.listName,
            list: this.props.list,
            id: '',
            name: '',
            description: '',
            location:'',
            shortdescription:''
        };
        this.props.constructModal(payload);
        this.props.toggleGenericModal();
    }

    renderList(){
        return _.map(this.props.list, (item) => {
            //console.log(location, location.id);
            return (
                <tr key={item.id}>
                    <td width="10%">{item.id}</td>
                    <td width="20%">{item.name}</td>
                    <td width="60%">{item.description}</td>
                    <td width="10%" className="right-align">
                        <a href="#"
                           onClick={() => this.edit(item)}
                        > <Glyphicon glyph="pencil"/> </a>
                        <a href="#" onClick={() => this.delete(item.id)}> <Glyphicon glyph="trash"/> </a>
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
                <GenericEditModal/>
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
        deleteItem,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemCollapsiblePanel);
