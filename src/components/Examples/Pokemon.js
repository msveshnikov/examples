import React, { useEffect, useState } from "react";

const Pokemon = (props) => {
    const smiles = ["front_shiny", "back_shiny", "front_default", "back_default"];
    const [pokemon, setPokemon] = useState("https://via.placeholder.com/96");

    useEffect(() => {
        const abortController = new AbortController();
        fetch("https://pokeapi.co/api/v2/pokemon/" + props.name)
            .then((res) => res.json())
            .then((res) => setPokemon(res.sprites));
        return () => abortController.abort();
    }, [props.name]);

    return pokemon && <img src={pokemon[smiles[2]]} alt={props.name} />;
};

export default React.memo(Pokemon);
