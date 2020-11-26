import React, { Component } from 'react';
import PersonOptions from './PersonOptions/PersonOptions.js';
import ExtraOptions from './ExtraOptions/ExtraOptions.js';

import paw from '../../../images/paw.png';
import individual from '../../../images/add-idv.png';

import './BoardOptions.css';

class BoardOptions extends Component {

    constructor(props) {
        super(props);

        if ( this.props.boardState !== undefined ) {
            console.log( this.props.boardState );
            this.state = this.props.boardState;
        } else {
            this.state = {
                size: props.size,
                peopleOpts: Array(props.size),
                extras: [],
                title: '',
            };
        }

        this.addDog = this.addDog.bind(this);
        this.addIndividual = this.addIndividual.bind(this);
        this.addExtra = this.addExtra.bind(this);

        this.handlePersonChange = this.handlePersonChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleExtraChange = this.handleExtraChange.bind(this);
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
        this.props.addButton(
            {
                src: individual,
                id: "idvplus",
                action: this.addIndividual,
                alt: "Add a snowman",
            }
        );
    }

    componentWillUnmount() {
        this.props.removeButton("dogplus");
        this.props.removeButton("idvplus");
    }

    addDog() {
        this.addExtra("Dog");
    }

    addIndividual() {
        this.addExtra("Individual")
    }

    addExtra( type ) {
        let extras = this.state.extras;

        extras.push(
            {
                type: type,
                name: "",
                notes: ""
            }
        );

        this.setState(
            {
                extras: extras
            }
        );
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

    handleExtraChange(i, opts) {
        let newExtra = this.state.extras;
        newExtra[i] = opts;

        this.setState(
            {
                extras: newExtra
            },
            this.updateParent,
        );
    }

    handleTitleChange(event) {
        let newTitle = event.target.value;
        this.setState(
            {
                title: newTitle,
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
                    change={this.handlePersonChange}
                />
            );
        }

        const extras = [];
        for ( let i = 0; i < this.state.extras.length; i++ ) {
            extras.push(
                <ExtraOptions
                    key={i}
                    id={i}
                    state={this.state.extras[i]}
                    change={this.handleExtraChange}
                />
            );
        }

        return (
            <div className="alignCol content-pane" >

                <div id="title" className="outlined opaque center alignCol">
                    <u> Board Title </u>
                    <input type="text"
                        placeholder="Merry Christmas!"
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                    />
                </div>

                {people}

                {extras}
            </div>
        );
    }
}

export default BoardOptions;
