import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { getConfig, setConfig } from '../actions/tree-actions';


class ConfigListComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            [
                'key':'value',
                'blah': 'blah-de-blah'
            ]
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){

    }

    handleClick(e){
        e.preventDefault();
        console.log('clicked button');
    }

    renderItem(item){
        return (
            <p>{item.key}: {item.value}</p>
            );
    }

    render(){
        return(
            <div>
                {_.forEach(this.state.config, () => {this.renderItem})}

                <button onClick={this.handleClick}>Click me!</button>

            </div>
        );
    }
}

function mapStateToProps(state){
    // whenever application state changes:
    //  - component will auto re-render
    //  - the object in the state function will be assigned as props to the component
    return {
        config: state.config
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        setConfig: setConfig,
        getConfig: getConfig
    }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigListComponent);