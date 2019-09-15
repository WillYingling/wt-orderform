import React, { Component } from 'react';

import './PersonOptions.css'

class PersonOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                hats: [],
                brims: [],
                caps: [],
                poms: [],
            },
            name: '',
            choices: {},
        };

        this.updateParent = this.updateParent.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleHatChange = this.handleHatChange.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    async componentDidMount() {
        let opts = await this.props.getOptions();
        if (opts == null) {
            return;
        }

        this.setState({
            options: opts,
        });
    }

    updateParent() {
        let person = {
            name: this.state.name,
            options: this.state.choices,
        };

        this.props.change(this.props.id, person);
    }

    handleNameChange(event) {
        let name = event.target.value;

        this.setState({
            name: name,
        });

        this.updateParent();
    }

    handleHatChange(event) {
        this.setState({
            choices: {
                hat: event.target.value,
            }
        });
        this.updateParent();
    }

    handleOptionChange(event) {
        let newPomChoice = this.state.choices.pom;
        let newCapChoice = this.state.choices.cap;
        let newBrimChoice = this.state.choices.brim;

        let selectTag = event.target;
        switch (selectTag.name) {
            case "pom":
                newPomChoice = selectTag.selectedOptions[0].value;
                break;
            case "cap":
                newCapChoice = selectTag.selectedOptions[0].value;
                break;
            case "brim":
                newBrimChoice = selectTag.selectedOptions[0].value;
                break;
            default:
                console.log('How?')
        }

        let choices = {
            pom: newPomChoice,
            cap: newCapChoice,
            brim: newBrimChoice,
        };

        this.setState({
            choices: choices,
        });

        this.updateParent();
    }

    render() {
       const hats = this.state.options.hats.map( (style) => (
            <label key={style}>
                <input
                    type="radio"
                    value={style}
                    checked={this.state.choices.hat === style}
                    onChange={this.handleHatChange}
                />
                {style}
            </label>
        ));

        const poms = this.state.options.poms.map((style) => (
            <option key={style} value={style}> {style} </option>
        ));

        const brims = this.state.options.brims.map((style) => (
            <option key={style} value={style}> {style} </option>
        ));

        const caps = this.state.options.caps.map((style) => (
            <option key={style} value={style}> {style} </option>
        ));

        const beanieChoices = (
            <div className="capOpts alignRow fadeIn">
                <div className="field alignCol">
                    <u> Cap Color </u>
                    <select
                        name="cap"
                        onChange={this.handleOptionChange}
                    >
                        {caps}
                    </select>
                </div>
                <div className="field alignCol">
                    <u> Brim Color </u>
                    <select
                        name="brim"
                        onChange={this.handleOptionChange}
                    >
                        {brims}
                    </select>
                </div>
                <div className="field alignCol">
                    <u> Pompom Color </u>
                    <select
                        name="pom"
                        onChange={this.handleOptionChange}
                    >
                        {poms}
                    </select>
                </div>
            </div>
        );

        const tophatChoices = (
            <div className="alignRow center fadeIn">
                <label className="field">
                    No options available for this hat type.
                </label>
            </div>
        );

        let disp;
        switch (this.state.choices.hat) {
            case "beanie":
                disp = beanieChoices;
                break;
            case "tophat":
                disp = tophatChoices;
                break;
            default:
        }

        return (
           <div className="fillparent alignRow center opaque">

               <fieldset className="snowmanfields alignRow">
                    <legend className="legend">Person #{this.props.id+1}</legend>

                    <div id="namefield" className="field alignCol">
                        <u> Name </u>
                        <input type="text" className="snowmanName"/>
                    </div>

                    <div id="hatfield" className="field hats alignCol">
                        <u> Hat Type </u>
                        {hats}
                    </div>

                    <div id="optfields">
                        {disp}
                    </div>
               </fieldset>
           </div>
        );
    }
}

export default PersonOptions;
