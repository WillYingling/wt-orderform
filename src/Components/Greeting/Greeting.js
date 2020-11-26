import React, { Component } from 'react';

import proxy from '../../ServerProxy';
import './Greeting.css'

class Greeting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            people: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.onEnter = this.onEnter.bind(this);
        this.setError = this.setError.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.onEnter, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onEnter, false);
    }

    setError( errString ) {
        this.setState({
            error: errString
        });
    }

    // This needs to be async because it uses getOptions
    async onEnter(event) {
        if ( event.keyCode !== 13 )
        {
            return;
        }

        var numPeople = parseInt(this.state.people, 10);
        this.setState({people: ''})
        if (isNaN(numPeople)) {
            this.setError("Not a number");
            return;
        }

        console.log(proxy);
        let options = await proxy.getOptions();
        if (options == null) {
            this.setError("Failed to load options, try again");
            return;
        }

        var found = false;
        for (let i = 0; i < options.boards.length; i++) {
            // This adds a string because numPeople is an int, and 
            // boards[i] is not
            if (numPeople+'' === options.boards[i]) {
                found = true;
            }
        }

        if (found) {
            this.props.loadForm(numPeople);
        } else {
            this.setError("Sorry, we can't do that")
        }
    }

    handleChange(event) {
        var str = event.target.value;
        var last = str.substring(str.length-1, str.length);
        if (isNaN(parseInt(last)) && str !== '') {
            return;
        }

        this.setState({people: str});
    }

    render() {
        return (
            <div className="fullpage alignRow center" >

                <div className="opaque center alignRow" id="greeting-bar">

                    <h1 id="prompt" className="outlined">
                        How many people in your snow family?
                    </h1>

                    <div className="alignCol center">
                        <input 
                            className="outlined"
                            id="people-input"
                            type="text" 
                            autoComplete="off"
                            value={this.state.people} 
                            onChange={this.handleChange} />

                        <p className="error outlined"> 
                            {this.state.error}
                        </p>
                    </div>
                </div>

            </div>
        );
    }
}

export default Greeting;
