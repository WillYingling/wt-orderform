import React, { Component } from 'react';
import PersonOptions from './PersonOptions/PersonOptions.js';
import paw from '../../../images/paw.png';

import './BoardOptions.css';

class BoardOptions extends Component {

    constructor(props) {
        super(props);

        if ( this.props.boardState !== undefined ) {
            console.log("Using pre-defined state");
            console.log( this.props.boardState );
            this.state = this.props.boardState;
        } else {
            console.log("Using default state");
            this.state = {
                size: props.size,
                peopleOpts: Array(props.size),
                extras: [],
                title: 'Merry Christmas!',
                titleChanged: false,
            };
        }

        this.addDog = this.addDog.bind(this);
        this.handlePersonChange = this.handlePersonChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.updateParent = this.updateParent.bind(this);
    }

    componentDidMount() {
        this.props.addButton(
            {
                src: paw,
                id: "dogplus",
                action: this.addDog,
                alt: "Add a dog",
            }
        );
    }

    addDog() {
        console.log('Dog added');
    }

    handlePersonChange(i, opts) {
        let newPeopleOpts = this.state.peopleOpts;
        newPeopleOpts[i] = opts;
        this.setState(
            {
                peopleOpts: newPeopleOpts,
            },
            this.updateParent,
        );
    }

    handleTitleChange(event) {
        let newTitle = event.target.value;
        if (!this.state.titleChanged) {
            newTitle = '';
        }

        this.setState(
            {
                title: newTitle,
                titleChanged: true,
            },
            this.updateParent,
        );
    }

    updateParent() {
        this.props.updateParent( this.state );
    }

    render() {
        const people = [];
        for (var i = 0; i < this.state.size; i++) {
            people.push(
                <PersonOptions
                    key={i}
                    id={i}
                    personState={this.state.peopleOpts[i]}
                    getOptions={this.props.getOptions}
                    change={this.handlePersonChange}
                />
            );
        }

        return (
            <div className="alignCol content-pane" >

                <div id="title" className="outlined opaque center alignCol">
                    <u> Board Title </u>
                    <input type="text" value={this.state.title} onChange={this.handleTitleChange}/>
                </div>

                {people}

            </div>
        );
    }
}

export default BoardOptions;
