import React from 'react';
import Burger from '../Burger';
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => (
    <div className={classes.CheckoutSummary}>
        <h2> TAKE IT!</h2>
        <div style={{ width: "100%", margin: "auto" }}>
            <Burger ingredients={props.ingredients} />
        </div>
    </div>
)

export default CheckoutSummary;