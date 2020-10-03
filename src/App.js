import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useSpring } from "react-spring";
import { animated } from "react-spring";

function App() {
    const [isToggled, setIsToggled] = useState(false);

    const fade = useSpring({
        color: isToggled ? "#fff" : "green",
        transform: isToggled ? "translate3d(0, 15px, 0)" : "translate3d(0, 15px, 0)",
        fontSize: isToggled ? "2rem" : "3rem",
    });

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <animated.h1 style={fade}>Hello</animated.h1>
                <button onClick={() => setIsToggled(!isToggled)}>Toggle</button>
            </header>
        </div>
    );
}

export default App;
