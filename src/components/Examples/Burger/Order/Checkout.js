import React, { Component } from "react";
import CheckoutSummary from "./CheckoutSummary";
import Contact from "./Contact";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Payment from "./Payment";

class Checkout extends Component {
    state = {
        focus: "",
        number: "",
        name: "",
        expiry: "",
        cvc: "",
    };

    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    render() {
        return (
            <>
                {this.props.purchased && <Redirect to="/orders" />}
                <CheckoutSummary ingredients={this.props.ingredients} />
                <Payment
                    focus={this.state.focus}
                    number={this.state.number}
                    name={this.state.name}
                    expiry={this.state.expiry}
                    cvc={this.state.cvc}
                    handleInputChange={this.handleInputChange}
                    handleInputFocus={this.handleInputFocus}
                />
                <br />
                <Contact
                    number={this.state.number}
                    name={this.state.name}
                    expiry={this.state.expiry}
                    cvc={this.state.cvc}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burger.ingredients,
        purchased: state.order.purchased,
    };
};

export default connect(mapStateToProps)(Checkout);
