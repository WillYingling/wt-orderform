import React, { Component } from 'react';
import Greeting from './Components/Greeting/Greeting';
import Form from './Components/Form/Form';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isForm: false,
            numPeople: 0,
            options: [],
        }

        this.loadGreeting = this.loadGreeting.bind(this);
        this.loadForm = this.loadForm.bind(this);
    }

    loadGreeting() {
        this.setState({
            isForm: false,
            numPeople: 0,
        });
    }

    async loadForm(i) {
        let opts = await this.getOptions()
        this.setState({
            isForm: true,
            numPeople: i,
            options: opts,
        });
    }

    async getOptions() {
        let serverUrl = "http://" + window.location.hostname + ":8080/options";
        let options = null;

        try {
            //let serverUrl = "http://localhost:8080/options";
            let jsonReturned = await fetch(serverUrl, {
                method: "GET"
            });

            options = await jsonReturned.json();

        } catch (e) {
            console.log('Error getting options: ' + serverUrl);
            console.log(e);
        }
        return options;
    }

    async submitBoard( options ) {
        let serverUrl = "http://" + window.location.hostname + ":8080/submit";
        let response = null;

        try {
            let jsonReturned = await fetch( serverUrl, {
                method: "POST",
                body: JSON.stringify(options)
            } )
            response = await jsonReturned.json();
        }
        catch( e ) {
            console.log('Error submitting board: ' + serverUrl)
            console.log(e);
        }

        return response;
    }

    render() {
        if (this.state.isForm) {
            return (
                <Form people={this.state.numPeople}
                    loadGreeting={this.loadGreeting}
                    getOptions={this.getOptions}
                    submitBoard={this.submitBoard}
                />
            );
        }

        return (
            <Greeting
                loadForm={this.loadForm}
                getOptions={this.getOptions}
            />
        );
    }
}

export default App;
