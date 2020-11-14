import React, { Component } from 'react';

import './Review.css'

class Review extends Component {

    constructor(props) {
        super(props);

        this.getHatDescription = this.getHatDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            boardOptions: this.props.boardOptions,
            isSubmitted: false,
        };

    }

    async handleSubmit() {
        let options = this.state.boardOptions;

        let backendFormat = {
            Title: options.title,
            Size: options.size,
            PeopleOptions: []
        }

        for ( let i = 0; i < options.size; i++ ) {
            backendFormat.PeopleOptions.push(
                {
                    Name: options.peopleOpts[i].name,
                    HatType: options.peopleOpts[i].choices.hat,
                    CapColor: options.peopleOpts[i].choices.cap,
                    BrimColor: options.peopleOpts[i].choices.brim,
                    PomColor: options.peopleOpts[i].choices.pom
                }
            );
        }

        console.log( "Submitting: " );
        console.log( backendFormat );

        let response = await this.props.submitBoard( backendFormat );
        
        console.log( "Submitted board, Response: ");
        console.log(response);
    }

    getHatDescription(options) {
        let hatType = "None"
        if (options.hat !== undefined) {
            hatType = options.hat;
        }
        let hatOptions = ""
        if (hatType === "beanie") {
            hatOptions = (
                <div className="indented">
                    Cap: {options.cap === undefined ? "None" : options.cap } <br/>
                    Brim: {options.brim === undefined ? "None" : options.brim } <br/>
                    Pom: {options.pom === undefined ? "None" : options.pom } <br/>
                </div>
            );
        }

        return (
            <div>
            Hat Type: {hatType} <br/>
            {hatOptions}
            </div>
        );
    }

    render() {
        let people = this.state.boardOptions.peopleOpts.map( (person,i) => (
            <div key={i} >
                <u> Snowman #{i+1} </u> <br/>
                Name: {person.name} <br/>
                {this.getHatDescription(person.choices)}
            </div>
        ));

        return (
            <div className="content-pane opaque">
            <div className="indented" >
                <div id="title" className="alignCol center">
                    <u> Review Your Order </u>
                </div>

                <h1> <u> Title </u> <br/> {this.state.boardOptions.title} </h1>

                {people}

                <div id="submitDiv" className="alignCol center" >
                    <button
                        id="submitButton"
                        onClick={this.handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
            </div>
        );
    }
}

export default Review;
