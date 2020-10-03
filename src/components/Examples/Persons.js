import React from "react";
import Person from "./Person";

const Persons = (props) =>
    props.persons.map((p, index) => (
        <Person
            key={index}
            {...p}
            click={() => props.clicked(p)}
            nameChange={(event) => props.nameChange(p, event.target.value)}
            starChange={(s) => props.starChange(p, s)}
        >
            {p.bio != null
                ? p.bio
                : "React изначально был спроектирован так, чтобы его можно было внедрять постепенно. Другими словами, вы можете начать с малого и использовать только ту функциональность React, которая необходима вам в данный момент."}
        </Person>
    ));

export default Persons;
