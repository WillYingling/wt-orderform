import React, { Component } from 'react';

import './ExtraOptions.css'

class ExtraOptions extends Component {
    constructor(props) {
        super(props);

        this.state = this.props.state;
        this.updateParent = this.updateParent.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNotesChange = this.handleNotesChange.bind(this);
    }

    updateParent() {
        let extra = {
            type: this.props.type,
            name: this.state.name,
            notes: this.state.notes
        };

        this.props.change(this.props.id, extra);
    }

    handleNameChange(event) {
        let name = event.target.value;
        this.setState({
                name: name,
            },
            this.updateParent,
        );
    }

    handleNotesChange(event) {
        let notes = event.target.value;
        this.setState({
                notes: notes,
            },
            this.updateParent,
        );
    }

    render() {
        let type = this.state.type;
        return (
           <div className="snowmanfields opaque fillparent">

               <div className="fillparent alignRow space-around">
                    <legend className="alignCol center">
                        <span className="legend">Extra #{this.props.id+1}</span>
                        <span>{type}</span>
                    </legend>

                    <div id="namefield" className="field alignCol">
                        <u> {type} Name </u>
                        <input type="text" className="snowmanName" value={this.state.name} onChange={this.handleNameChange}/>
                    </div>

                    <div id="namefield" className="field alignCol">
                        <u> Notes </u>
                        <input type="text" 
                            className="snowmanName"
                            placeholder="e.g. black ears"
                            value={this.state.notes}
                            onChange={this.handleNotesChange}
                        />
                    </div>

               </div>
           </div>
        );
    }
}

export default ExtraOptions;
