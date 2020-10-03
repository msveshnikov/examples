import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Overview from "./pages/Overview";
import Pokemon from "./pages/Pokemon";
import "./index.css";

const index = () => {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route path="/pokemon/:pokemonId">
                        <Pokemon />
                    </Route>
                    <Route path="/">
                        <Overview />
                    </Route>
                </Switch>
            </Router>
        </Provider>
    );
};

export default index;
