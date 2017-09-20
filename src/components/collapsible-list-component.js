import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import ListItemEditModal from './list-item-edit-modal';

class CollapsibleList extends Component {
    constructor(props) {
        super(props);
        this.handleRowClick = this.handleRowClick.bind(this);
        this.renderList = this.renderList.bind(this);
        this.state = {
            list: _.has(props, 'list') ? props.list : {},
            listName: _.has(props, 'listName') ? props.listName : 'list',
            collapse: false,

        }

    }

    handleRowClick = (key, value) => {
        console.log('clicked on row', key, value);
    }



    renderList(){
        return _.map(this.props.list, (value, index) => {
            return (
                <tr key={index} >
                    <td width="30%">
                        {index}
                    </td>
                    <td width="60%">
                        {value}
                    </td>
                    <td width="10%">
                        <button onClick={() => {
                            this.handleRowClick(index, value);
                        }}><img src="/images/ic_create_black_24px.svg"  /></button>

                    </td>
                </tr>

            )
        });


    }

    itemList(){
        const list = this.props.list;
        //const listItems = _.map(list)
        const listItems = _.map((item, index) =>
            <tr key={index}>
                <td >{item.key}</td>
                <td>{item.value}</td>
                <td><img src="images/ic_create_black_24px.svg"/></td>
            </tr>
        )

        return listItems;
    }

    render() {
        let href = '#' + this.props.listName;
        /*const listItems = this.props.list.map((item) =>
            <tr key={item}>
                <td >{item.key}</td>
                <td>{item.value}</td>
                <td><img src="images/ic_create_black_24px.svg"/></td>
            </tr>
        );*/
        return (
            <div>

                <table className="table table-sm" >
                    <thead className="thead-default">
                    <tr>
                        <th colSpan="3">
                            <a className="btn btn-outline-secondary btn-sm" data-toggle="collapse" href={href}>
                                <img src="images/ic_remove_circle_outline_black_24px.svg"/>
                            </a>
                            <span>{this.props.listName}</span>

                        </th>
                    </tr>

                    </thead>
                    <tbody id={this.props.listName}>
                    {this.renderList()}


                    </tbody>
                </table>


            </div>
        );
    }
}

function mapStateToProps(state){
    // whenever application state changes:
    //  - component will auto re-render
    //  - the object in the state function will be assigned as props to the component
    return {
        status: state.tree.status,

    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({

    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CollapsibleList);

/*
<a
                            role="presentation"
                            onClick={() => this.handleRowClick(key, value)}
                        ><img src="/images/ic_create_black_24px.svg"  /></a>
                        {this.renderList()}
  {_.map(listItem => {
                        <tr key={index} onClick={() => callback}>
                            <td>{listItem.key} </td>
                            <td>{listItem.value} </td>
                            <td> <img src="/images/ic_create_black_24px.svg"  /></td>
                        </tr>

                    })}

<ListItemEditModal
                    listName={this.props.listName}
                />

                onClick={() => this.handleRowClick
 */