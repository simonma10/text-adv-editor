import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import SortableTree from 'react-sortable-tree';
import {requestData, receiveData} from "../actions/tree-actions";
import { genericFetch } from "../utils/file-loader"
import {RECEIVE_DATA} from "../actions/tree-action-types";

class Tree extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentWillMount(){
        console.log('componentWilLMount');
        this.props.genericFetch({
            method: 'GET',
            dataUrl: '/data/globals.json',
            dataAcquiredType: RECEIVE_DATA,
            successCallBack: this.getSuccess,
            failCallBack: this.getFail
        });
    }

    componentDidMount(){
        console.log('componentDidMount')
    }

    getSuccess() {
        console.log('success');


    }
    getFail() {
        console.log('File read failure');
        alert('file load failure');
    }

    //TODO: separate out into a reusable component, with edit feature
    renderConfig(){
        let renderBuffer = [];
        let index = 0;
        _.forEach(this.props.config, function(value, key){
            renderBuffer.push(
               <tr key={index}>
                   <td>
                       {key}
                   </td>
                   <td>
                       {value}
                   </td>
                   <td>
                       <img src="/images/ic_create_black_24px.svg"/>
                   </td>
               </tr>
            );
           index += 1;
        });

        return renderBuffer;
    }

    renderMessages(){
        let renderBuffer = [];
        let index = 0;
        _.forEach(this.props.messages, function(value, key){
            renderBuffer.push(
                <li key={index} className="list-group-item collapse" id="collapseSection">{key} : {value}</li>
            );
            index += 1;
        });

        return renderBuffer;
    }

    render() {
        return (
            <div>
                {this.props.status}
                <table className="table table-sm table-hover">
                    <thead className="thead-default">
                    <tr>
                        <th colSpan="3">
                            <a className="btn btn-outline-secondary btn-sm" data-toggle="collapse" href="#collapseConfig">
                                <img src="images/ic_remove_circle_outline_black_24px.svg"/>
                            </a>
                            <span>Config</span>
                        </th>
                    </tr>

                    </thead>
                    <tbody id="collapseConfig">

                    {this.renderConfig()}
                    </tbody>
                </table>

                <div className="card">
                    <p>
                        <a className="btn btn-primary" data-toggle="collapse" href="#collapseSection">+</a>
                        Messages
                    </p>
                </div>
                <ul className="list-group collapse" id="collapseSection">
                    {this.renderMessages()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state){
    // whenever application state changes:
    //  - component will auto re-render
    //  - the object in the state function will be assigned as props to the component
    return {
        config: state.tree.config,
        status: state.tree.status,
        messages: state.tree.messages
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        requestData,
        receiveData,
        genericFetch
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Tree);

/*
 <SortableTree
                    treeData={this.state.treeData}
                    onChange={treeData => this.setState({ treeData })}
                />
 */