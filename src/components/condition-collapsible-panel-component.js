import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Panel, Table, Glyphicon } from 'react-bootstrap';
import _ from 'lodash';

import GenericEditModal from './generic-edit-modal';
import { constructModal, toggleGenericModal } from '../actions/modal-actions';
import { deleteCondition } from '../actions/tree-actions';

class ConditionCollapsiblePanel extends Component{
    constructor(props) {
        super(props);
        this.state = {
            list: _.has(props, 'list') ? props.list : {},
            //listName: 'Locations',
        }
        this.add = this.add.bind(this);
    }

    edit(condition){
        //console.log('edit', index, value);
        let payload = {
            listName: this.props.listName,
            list: this.props.list,
            showGenericModal: false,
            id: condition.id,
            tests: condition.tests,
            actions: condition.actions

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
        this.props.deleteCondition(payload);
    }

    add(){
        console.log('add');
        let payload = {
            listName: this.props.listName,
            list: this.props.list,
            id: '',
            tests: {},
            actions: {}
        };
        this.props.constructModal(payload);
        this.props.toggleGenericModal();
    }

    renderList(){
        return _.map(this.props.list, (condition) => {
            //console.log(location, location.id);
            return (
                <tr key={condition.id}>
                    <td width="10%">{condition.id}</td>
                    <td width="40%">{JSON.stringify(condition.tests)}</td>
                    <td width="40%">{JSON.stringify(condition.actions)}</td>
                    <td width="10%" className="right-align">
                        <a href="#"
                           onClick={() => this.edit(condition)}
                        > <Glyphicon glyph="pencil"/> </a>
                        <a href="#" onClick={() => this.delete(condition.id)}> <Glyphicon glyph="trash"/> </a>
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
        deleteCondition,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConditionCollapsiblePanel);
