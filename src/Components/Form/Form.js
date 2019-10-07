import React, { Component } from 'react';
import Review from './Review/Review.js'
import BoardOptions from './BoardOptions/BoardOptions.js'

import backarrow from '../../images/left.png';
import nextarrow from '../../images/forward.png';

import './Form.css'

class Form extends Component {

    constructor(props) {
        super(props);

        this.handleBoardChange = this.handleBoardChange.bind(this);
        this.addSidebarButton = this.addSidebarButton.bind(this);
        this.removeSidebarButton = this.removeSidebarButton.bind(this);
        this.goBack = this.goBack.bind(this);
        this.goForward = this.goForward.bind(this);
        this.submitOrder = this.submitOrder.bind(this);

        this.state = {
            isReview: false,
        };

        this.state.buttons = [
            {
                id: 'backArrow',
                src: backarrow,
                action: this.goBack,
            },
            {
                id: 'next',
                src: nextarrow,
                action: this.goForward,
            },
        ];

    }

    submitOrder() {

    }

    handleBoardChange(state) {
        this.setState(
            {
                boardState: state,
            }
        );
    }

    removeSidebarButton(id) {

    }

    addSidebarButton(button) {
        let buttons = this.state.buttons;
        for ( let index = 0; index < buttons.length; index++ ) {
            if ( buttons[index].id === button.id ) {
                return;
            }
        }

        buttons.push(button);
        this.setState({
            buttons: buttons,
        });
    }

    goForward() {
        console.log("Going forward");
        if ( this.state.isReview ) {
            this.submitOrder();
        } else {
            this.setState(
                {
                    isReview: true,
                },
            );
        }
    }

    goBack(action) {
        console.log("Going back");
        if ( this.state.isReview ) {
            console.log("Reloading board options");
            this.setState(
                {
                    isReview: false,
                }
            )
        }
        else {
            console.log("Reloading greeting");
            this.props.loadGreeting();
        }
    }

    render() {
        const optsDisp = (
            <BoardOptions
                getOptions={this.props.getOptions}
                size={this.props.people}
                addButton={this.addSidebarButton}
                removeButton={this.removeSidebarButton}
                updateParent={this.handleBoardChange}
                boardState={this.state.boardState}
            />
        );
        const revDisp = (
            <Review
                boardOptions={this.state.boardState}
            />
        );
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
