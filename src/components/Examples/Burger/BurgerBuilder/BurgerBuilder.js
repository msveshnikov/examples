import React, { Component } from "react";
import Burger from "../Burger";
import BuildControls from "../BuildControls/BuildControls";
import Modal from "../../UI/Modal/Modal";
import OrderSummary from "../OrderSummary/OrderSummary";
import Spinner from "../../UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as burgerTypes from "../../../store/burgerSlice";
import * as orderTypes from "../../../store/orderSlice";
import * as authTypes from "../../../store/authSlice";
import firebase from "../../Firebase/firebase";
import WithErrorHandler from "../../../hoc/WithErrorHandler";
import axios from "../../../axios-orders";

export class BurgerBuilder extends Component {
    state = {
        inOrder: false,
    };

    componentDidMount() {
        firebase.analytics().logEvent("Burger opened");
        if (!this.props.noinit) {
            this.props.onInitIngredients();
        }
        this.props.onInitPrices();
    }

    orderHandler = () => {
        this.setState({ inOrder: true });
    };

    purchaseCancelledHandler = () => {
        this.setState({ inOrder: false });
    };

    purchaseCompletedHandler = () => {
        this.props.onInit();
        this.props.history.push("/checkout");
    };

    render() {
        const disabledInfo = { ...this.props.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let burger = <Spinner />;
        if (this.props.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        price={this.props.totalPrice}
                        purchaseable={this.props.purchaseable}
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onRemoveIngredient}
                        order={this.orderHandler}
                        disabledInfo={disabledInfo}
                        auth={this.props.auth}
                    />
                </>
            );
        }
        return (
            <>
                <Modal show={this.state.inOrder} modalClosed={this.purchaseCancelledHandler}>
                    {this.props.ingredients && (
                        <OrderSummary
                            ingredients={this.props.ingredients}
                            purchaseCancelled={this.purchaseCancelledHandler}
                            purchaseContinued={this.purchaseCompletedHandler}
                            price={this.props.totalPrice}
                        />
                    )}
                </Modal>
                {burger}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        purchaseable: state.burger.purchaseable,
        auth: state.auth.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddIngredient: (i) => dispatch(burgerTypes.addIngredient(i)),
        onRemoveIngredient: (i) => dispatch(burgerTypes.removeIngredient(i)),
        onInitIngredients: () => dispatch(burgerTypes.initIngredients()),
        onInitPrices: () => dispatch(burgerTypes.initPrices()),
        onInit: () => dispatch(orderTypes.purchaseInit()),
        onSetRedirect: (p) => dispatch(authTypes.setAuthRedirectPath(p)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));
