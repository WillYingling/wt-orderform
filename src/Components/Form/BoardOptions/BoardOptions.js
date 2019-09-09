import React, { Component } from 'react';
import PersonOptions from './PersonOptions/PersonOptions.js';
import paw from '../../../images/paw6.png';

import './BoardOptions.css';

class BoardOptions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            size: props.size,
            peopleOpts: Array(props.size),
            extras: [],
            title: 'Merry Christmas!',
            titleChanged: false,
        };

        this.addDog = this.addDog.bind(this);
        this.handlePersonChange = this.handlePersonChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    componentDidMount() {
        this.props.addButton(
            {
                src: paw,
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
        this.setState({
            peopleOpts: newPeopleOpts,
        });
    }

    handleTitleChange(event) {
        let newTitle = event.target.value;
        if (!this.state.titleChanged) {
            newTitle = '';
        }

        this.setState({
            title: newTitle,
            titleChanged: true,
        });
    }

    render() {
        const people = [];
        for (var i = 0; i < this.state.size; i++) {
            people.push(
                <PersonOptions 
                    key={i}
                    id={i}
                    getOptions={this.props.getOptions}
                    change={this.handlePersonChange}
                />
            );            
        }

        return (
            <div className="alignCol board-options" >

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
