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
        let options = null;

        try {
            let serverUrl = "http://localhost:8080/options";
            let jsonReturned = await fetch(serverUrl, {
                method: "GET"
            });

            options = await jsonReturned.json();

        } catch (e) {
            console.log('Error talking to server');
            console.log(e);
        }
        return options;
    }

    render() {
        if (this.state.isForm) {
            return (
                <Form people={this.state.numPeople} 
                    loadGreeting={this.loadGreeting}
                    getOptions={this.getOptions}
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
