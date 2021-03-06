import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SortableTree from 'react-sortable-tree';
import {requestJson} from "../actions/tree-actions";

class Tree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //treeData: [{ title: 'Chicken', children: [ { title: 'Egg' } ] }],
            treeData: [{ title: 'Config', children: [{}]}]

        };
    }

    componentDidMount(){
        requestJson('data/globals.json');
    }

    render() {
        return (
            <div style={{ height: 768 }}>
                <SortableTree
                    treeData={this.state.treeData}
                    onChange={treeData => this.setState({ treeData })}
                />
            </div>
        );
    }
}

function mapStateToProps(state){
    // whenever application state changes:
    //  - component will auto re-render
    //  - the object in the state function will be assigned as props to the component
    return {
        tree: state.tree
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        requestJson: requestJson,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Tree);


/*treeData:[ {
 "config":{
 "myScore":0,
 "myLoc":1,
 "msgWelcome":"Welcome to adv.js",
 "engineVersion":0.4,
 "engineName":"adventure.js",
 "showLoc":"true",
 "locLimbo":666,
 "locInv":0,
 "prompt":"> ",
 "header":"[Header Text from globals.json]"
 },

 "messages":{
 "mScore":"Your score is ",
 "mInv":"You are carrying: ",
 "mInvEmpty":"nothing.",
 "mVisibleItems": "You can see: ",
 "mVisibleItemsEmpty": "nothing special.",
 "mExits": "Exits lead ",
 "mNowhere":"nowhere",
 "mNoExit":"You can't go that way.",
 "mGo": "You go ",
 "mNoCanDo": "You can't do that.",
 "mGet": "You take the ",
 "mDrop": "You drop the ",
 "mGotAlready": "You already have it.",
 "mExamineNotHere": "A wise old man once said: 'You cannot examine what you cannot see'.",
 "mQuit": "Leaving so soon?",
 "mLook": "You look around.",
 "mHelp":"Yes, you certainly need it.",
 "mConfused": "I don't understand what you mean."

 },


 "verbs": {
 "n":"go",
 "s":"go",
 "w":"go",
 "e":"go",
 "ne":"go",
 "nw":"go",
 "sw":"go",
 "se":"go",
 "north":"go",
 "south":"go",
 "west":"go",
 "east":"go",
 "northwest":"go",
 "northeast":"go",
 "southwest":"go",
 "southeast":"go",
 "up":"go",
 "u":"go",
 "down":"go",
 "d":"go",
 "in":"go",
 "out":"go",
 "go":"go",

 "take":"get",
 "get":"get",
 "drop":"drop",
 "l":"look",
 "look":"look",
 "examine":"examine",
 "inspect":"inspect",
 "i":"inv",
 "inv":"inv",
 "inventory":"inv",
 "carrying":"inv",

 "score":"score",
 "quit":"quit",
 "exit":"quit",
 "bye":"quit",
 "help":"help",
 "hint":"help",
 "save":"save",
 "load":"load",

 "use":"use",
 "shine":"use"
 },

 "nouns":{
 "n":"north",
 "north":"north",
 "s":"south",
 "south":"south",
 "w":"west",
 "west":"west",
 "e":"east",
 "east":"east",
 "u":"up",
 "up":"up",
 "d":"down",
 "down":"down",
 "in":"in",
 "out":"out",
 "nw":"northwest",
 "northwest":"northwest",
 "ne":"northeast",
 "northeast":"northeast",
 "sw":"southwest",
 "southwest":"southwest",
 "se":"southeast",
 "southeast":"southeast",

 "treasure":"treasure",
 "vast":"treasure",
 "quantities":"treasure",
 "herring":"herring",
 "red":"herring",
 "fish":"herring",
 "torch":"torch"
 },

 "locations":[
 {
 "id":666,
 "visited": "false",
 "name":"limbo",
 "description":"limbo, a place for things that no longer exist, or don't exist yet.  Never send the player to limbo!",
 "exits":{}
 },
 {
 "id":0,
 "visited": "false",
 "name":"inventory",
 "description":"inventory, a place for items the player is carrying.  Never send the player to inventory!",
 "exits":{}
 },
 {
 "id":1,
 "visited": "false",
 "name":"the first location",
 "description":"the first test location, an interesting location",
 "exits":{
 "east":2,
 "west":3
 }
 },
 {
 "id":2,
 "visited": "false",
 "name":"the dark and shady location",
 "description":"A dark and shady place, which is interesting perhaps only in its testing of non-euclidean geometry.",
 "exits":{
 "west":1,
 "north":3
 }
 },
 {
 "id":3,
 "visited": "false",
 "name":"the third location",
 "description":"the third test location, notable only for the fact that its description has been paddded with as much text as possible, if only to test the word-wrapping capabilities of the console component :)",
 "exits":{
 "east":1
 }
 }

 ],
 "items":[
 {
 "id":1,
 "location":1,
 "name": "herring",
 "shortdescription":"a red herring",
 "description":"A small red fish.  It smells. It really smells."
 },
 {
 "id":2,
 "location":666,
 "name":"treasure",
 "shortdescription":"vast quantities of treasure",
 "description":"Vast quantities of treasure - what more do you need to know?"
 },
 {
 "id":3,
 "location":3,
 "name":"torch",
 "shortdescription":"a really handy torch",
 "description":"What a bright idea!  With this torch, you can really shine."
 }
 ],
 "conditions":[
 {
 "id":1,
 "tests":{
 "verb":"help",
 "atLoc":1
 },
 "actions":{
 "msg":"You can't possibly need help already?!"
 }
 },
 {
 "id":2,
 "tests":{
 "verb":"help",
 "atLoc":2,
 "findItems":{
 "treasure":666
 }
 },
 "actions":{
 "msg":"It's really dark... with a bit more light you might be able to look around."
 }
 },
 {
 "id":3,
 "tests":{
 "noun":"torch",
 "atLoc":2,
 "findItems":{
 "torch":0,
 "treasure":666
 }
 },
 "actions":{
 "msg":"You scan the room with the torch, and its light reveals vast amounts of shining treasure!",
 "moveItems": {
 "treasure":2
 }
 }
 },
 {
 "id":4,
 "tests":{
 "verb":"use",
 "noun":"torch",
 "findItems":{
 "torch":0,
 "treasure":0
 }
 },
 "actions":{
 "msg":"You make an awesome shadow puppet show.  If only there were other people around to see it."
 }
 },
 {
 "id":5,
 "tests":{
 "verb":"use",
 "noun":"torch",
 "findItems":{
 "torch":0,
 "treasure":666
 }
 },
 "actions":{
 "msg":"You experience a moment of illumination."
 }
 },
 {
 "id":6,
 "tests":{
 "verb":"use",
 "noun":"torch",
 "atLoc":2,
 "findItems":{
 "torch":0,
 "treasure":2
 }
 },
 "actions":{
 "msg":"Maybe you should look around to see what the torch has already revealed..."
 }
 }

 ]

 }]
 */