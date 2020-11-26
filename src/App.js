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

    loadForm(i) {
        this.setState({
            isForm: true,
            numPeople: i,
        });
    }

    render() {
        let greeter = (
            <Greeting
                loadForm={this.loadForm}
            />
        );

        let form = (
            <Form
                people={this.state.numPeople}
                loadGreeting={this.loadGreeting}
            />
        );

        return this.state.isForm ? form : greeter;
    }
}

export default App;
