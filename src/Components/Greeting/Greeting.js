import React, { Component } from 'react';

import './Greeting.css'

class Greeting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            people: "",
            error: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.onEnter = this.onEnter.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.onEnter, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onEnter, false);
    }

    // This needs to be async because it uses getOptions
    async onEnter(event) {
        if (event.keyCode === 13) {
            var numPeople = parseInt(this.state.people, 10);
            this.setState({people: ''})
            if (isNaN(numPeople)) {
                console.log('Bad human');
                return;
            }
            let options = await this.props.getOptions();
            if (options == null) {
                console.log(options);
                return;
            }
            var found = false;
            var i;
            for (i = 0; i < options.boards.length; i++) {
                // This adds a string because numPeople is an int, and 
                // boards[i] is not
                if (numPeople+'' === options.boards[i]) {
                    found = true;
                }
            }
            if (found) {
                this.props.loadForm(numPeople);
            } else {
                let error = "Sorry, we can't do that";
                this.setState({error: error});
            }
        }
    }

    handleChange(event) {
        var str = event.target.value;
        var last = str.substring(str.length-1, str.length);
        if (isNaN(parseInt(last)) && str !== '') {
            return;
        }

        this.setState({people: str, error: ''});
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
