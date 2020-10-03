import React, { useState } from "react";
import "./App.css";
import { useSpring, animated } from "react-spring";

function App() {
    const [isToggled, setIsToggled] = useState(false);

    const fade = useSpring({
        color: isToggled ? "#fff" : "green",
        transform: isToggled ? "translate3d(0, 15px, 0)" : "translate3d(0, 15px, 0)",
        fontSize: isToggled ? "2rem" : "3rem",
    });

    const [props, set] = useSpring(() => ({
        xys: [0, 0, 0.5],
        config: { mass: 5, tension: 200, friction: 100 },
    }));

    const perspective = (x, y, s) =>
        `perspective(500px) 
            rotateX(${x*2}deg) 
            rotateY(${y*2}deg) 
            scale(${s})`;

    const calcXY = (x, y) => [-(y - window.innerHeight / 2) / 15, (x - window.innerWidth / 2) / 15, 1.0];

    return (
        <div className="App">
            <header className="App-header">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                <animated.h1 style={fade}>Hello</animated.h1>
                <button onClick={() => setIsToggled(!isToggled)}>Toggle</button>
                <br />
                <br />
                <br />
                <animated.div
                    className="card"
                    onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calcXY(x, y) })}
                    onMouseLeave={() => set({ xys: [0, 0, 0.5] })}
                    style={{ transform: props.xys.interpolate(perspective) }}
                />
            </header>
        </div>
    );
}

export default App;
