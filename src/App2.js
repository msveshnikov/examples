import React, { useState } from "react";

function DiceRoller() {
    const [diceValue, setDiceValue] = useState(1);

    function rollDice() {
        setDiceValue(Math.floor(Math.random() * 6) + 1);
    }

    return (
        <div>
            <button onClick={rollDice}>Roll Dice</button>
            <img src={`dice-${diceValue}.png`} alt="Dice" />
        </div>
    );
}

export default DiceRoller;
