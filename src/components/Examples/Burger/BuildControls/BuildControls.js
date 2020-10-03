import React from "react";
import "./BuildControls.css";
import BuildControl from "./BuildControl";

const controls = [
    { label: "Salad", type: "a_salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
    { label: "Avocado", type: "avocado" },
    { label: "Hummus", type: "hummus" },
];

const BuildControls = (props) => (
    <div className="BuildControls">
        <p>
            Total price: <strong>{(props.price * 25).toFixed(0)}Kč</strong>
        </p>
        {controls.map((c) => (
            <BuildControl
                added={() => props.ingredientAdded(c.type)}
                removed={() => props.ingredientRemoved(c.type)}
                disabled={props.disabledInfo[c.type]}
                key={c.label}
                label={c.label}
            />
        ))}
        <button onClick={props.order} className="OrderButton" disabled={!props.purchaseable}>
            ORDER NOW
        </button>
    </div>
);

export default BuildControls;
