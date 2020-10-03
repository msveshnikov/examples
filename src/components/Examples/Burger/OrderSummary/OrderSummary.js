import React from "react";
import Button from "./../../UI/Button/Button";

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map((key) => {
        return (
            <li key={key}>
                <span style={{ textTransform: "capitalize" }}>{key}</span>: {props.ingredients[key]}
            </li>
        );
    });

    return (
        <>
            <h3>Your Order</h3>
            <p> A delicious burger with following ingredients:</p>
            <ul style={{ textAlign: "left" }}>{ingredientSummary}</ul>
            <p>
                {" "}
                <strong> Total price {(props.price * 25).toFixed(0)}Kč</strong>
            </p>
            <p> Continue to check out?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>
                CANCEL
            </Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>
                CONTINUE
            </Button>
        </>
    );
};

export default OrderSummary;
