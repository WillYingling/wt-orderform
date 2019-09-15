import React, { Component } from 'react';
import Review from './Review/Review.js'
import BoardOptions from './BoardOptions/BoardOptions.js'

import backarrow from '../../images/left.png';
import nextarrow from '../../images/forward.png';

import './Form.css'

class Form extends Component {

    constructor(props) {
        super(props);

        this.addSidebarButton = this.addSidebarButton.bind(this);
        this.removeSidebarButton = this.removeSidebarButton.bind(this);
        this.setBackAction = this.setBackAction.bind(this);
        this.loadReview = this.loadReview.bind(this);

        this.state = {
            people: Array(props.people).fill(null),
            backAction: this.props.loadGreeting,
            isReview: false,
        };

        this.state.buttons = [
            {
                id: 'backArrow',
                src: backarrow,
                action: this.state.backAction,
            },
            {
                id: 'next',
                src: nextarrow,
                action: this.loadReview,
            },
        ];

    }

    removeSidebarButton(id) {

    }

    addSidebarButton(button) {
        let buttons = this.state.buttons;
        buttons.push(button);
        this.setState({
            buttons: buttons,
        });
    }

    setBackAction(action) {
        this.setState({
            backAction: action
        });
    }

    loadReview() {
        this.setState({
            isReview: true,
        });
    }

    render() {
        const optsDisp = (
            <BoardOptions
                getOptions={this.props.getOptions}
                size={this.props.people}
                addButton={this.addSidebarButton}
                removeButton={this.removeSidebarButton}
                loadReview={this.loadReview}
            />
        );
        const revDisp = (<Review />);
        const disp = this.state.isReview ? revDisp : optsDisp;

        const buttons = this.state.buttons.map( (button) => (
            <img key={button.id}
                src={button.src}
                id={button.id}
                alt={button.alt}
                onClick={button.action}
                className="button"
            />
        ));

        return (
            <div className="fullpage alignRow">

                <div id="button-bar" className="opaque alignCol">
                    {buttons}
                </div>

                <div id="display" >
                    {disp}
                </div>

            </div>
        );
    }
}

export default Form;
