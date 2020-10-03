import React from "react";
import T from "prop-types";
import card from "../../../../assets/images/Card.jpg";
import { Dimensions } from "../../constants";

const ReactSymbol = ({ color }) => {
    return (
        <div
            style={{
                position: "absolute",
                top: "0%",
                left: 0,
                right: 0,
                textAlign: "center",
                color: color,
            }}
        >
            <img
                style={{
                    height: Dimensions.Card.height,
                    width: Dimensions.Card.width,
                }}
                src={card}
                alt="upturned card"
            />
        </div>
    );
};

ReactSymbol.propTypes = {
    color: T.string,
};

export default ReactSymbol;
