import React from "react";
import Burger from "../components/Examples/Burger/Burger";

export default {
    title: "Burger",
    component: Burger,
};

const TemplateBurger = (args) => <Burger ingredients={args} />;

export const BurgerStory = TemplateBurger.bind({});
BurgerStory.args = {
    a_salad: 1,
    avocado: 0,
    bacon: 2,
    cheese: 0,
    hummus: 0,
    meat: 1,
};
