import React, { Component } from "react";
import classes from "./Contact.module.css";
import Spinner from "../../UI/Spinner/Spinner";
import Input from "../../UI/Input/Input";
import countryList from "country-list";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/orderSlice";
import { update } from "../../../store/utility";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

class Contact extends Component {
    state = {
        orderForm: {
            name: {
                order: 1,
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 1,
                },
            },
            street: {
                order: 2,
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street",
                },
                value: "",
            },
            zipCode: {
                order: 3,
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "ZIP Code",
                },
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 6,
                    isNumeric: true,
                },
                value: "",
            },
            email: {
                order: 4,
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your E-Mail",
                },
                value: "",
                validation: {
                    required: false,
                    isEmail: true,
                },
            },
            country: {
                order: 5,
                elementType: "select",
                elementConfig: {
                    options: countryList.getData().map((c) => ({ value: c.code, displayValue: c.name })),
                },
                value: "CZ",
            },
            deliveryMethod: {
                order: 6,
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "fastest", displayValue: "Fastest" },
                        { value: "cheapest", displayValue: "Cheapest" },
                    ],
                },
                value: "fastest",
            },
            newsletter: {
                elementType: "checkbox",
                elementConfig: {
                    label: "Subscribe to our newsletter",
                },
                value: "false",
            },
        },
        formIsValid: false,
    };

    componentDidMount() {
        fetch("https://ipapi.co/json/")
            .then((response) => response.json())
            .then((data) => this.setState({ geo: data }));
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData,
            time: new Date().toLocaleString(),
            geo: this.state.geo,
            userId: this.props.userId,
            card: {
                number: this.props.number,
                name: this.props.name,
                expiry: this.props.expiry,
                cvc: this.props.cvc,
            },
        };
        this.props.onOrder(order, this.props.token);
    };

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = update(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true,
        });
        const updatedOrderForm = update(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement,
        });

        let formIsValid = true;
        for (let formElementIdentifier in updatedOrderForm) {
            if (!updatedOrderForm[formElementIdentifier].valid && updatedOrderForm[formElementIdentifier].validation) {
                formIsValid = false;
            }
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }
        formElementsArray.sort((a, b) => a.config.order - b.config.order);
        let form = (
            <>
                <Grid container spacing={3}>
                    {formElementsArray.map((formElement) => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={
                                !formElement.config.valid && formElement.config.touched && formElement.config.validation
                            }
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        />
                    ))}
                </Grid>
                <br/>
                <div style={{ textAlign: "center" }}>
                    <button
                        onClick={this.orderHandler}
                        className={classes.OrderButton}
                        disabled={!this.state.formIsValid}
                    >
                        ORDER NOW
                    </button>
                </div>
                <br/>
            </>
        );
        return (
            <Container component="main" maxWidth="md">
                {this.props.storing && <Spinner />}
                <Typography variant="h6" gutterBottom>
                    Enter your delivery data
                </Typography>
                {form}
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        storing: state.order.storing,
        token: state.auth.token,
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onOrder: (o, t) => dispatch(actionTypes.purchaseBurger(o, t)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
