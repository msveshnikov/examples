import React, { useEffect, useState } from "react";
import Pokemon from "./Pokemon";
import Input from "../UI/Input/Input";
import Container from "@material-ui/core/Container";

const Pokemons = () => {
    const [pokemons, setPokemons] = useState([]);
    const [selected, setSelected] = useState(3);
    const [types, setTypes] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        fetch("https://pokeapi.co/api/v2/type/")
            .then((response) => response.json())
            .then((res) => setTypes(res.results.slice(0, 17).map((r) => r.name)));
        return () => abortController.abort();
    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        fetch("https://pokeapi.co/api/v2/type/" + selected)
            .then((res) => res.json())
            .then((res) => setPokemons(res.pokemon.map((p) => p.pokemon.name)));
        return () => abortController.abort();
    }, [selected]);

    return (
        <Container style={{ textAlign: "center" }} component="main" maxWidth="md">
            <br />
            <br />
            {types && (
                <Input
                    style={{ width: "50%" }}
                    elementType="select"
                    elementConfig={{
                        options: types.map((c, index) => ({
                            value: index + 1,
                            displayValue: c,
                        })),
                    }}
                    value={selected}
                    changed={(e) => setSelected(e.target.value)}
                />
            )}
            <br />
            <br />
            {pokemons.slice(0, 40).map((p, index) => (
                <Pokemon key={index} name={p}></Pokemon>
            ))}
        </Container>
    );
};

export default Pokemons;
