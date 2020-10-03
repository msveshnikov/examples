import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../BuildControls/BuildControls";
import Modal from "./../../UI/Modal/Modal";
import Burger from "../Burger";
import Spinner from "./../../UI/Spinner/Spinner";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} onInitPrices={() => {}} />);
    });

    it("should render <BuildControls /> when receiving ingredients", () => {
        wrapper.setProps({ ingredients: { a_salad: 0 } });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });

    it("should render 1 modal, 1 burger and 1 BuildControls if we have inggredients", () => {
        wrapper.setProps({ ingredients: { salad: 0 } });
        expect(wrapper.find(Modal)).toHaveLength(1);
        expect(wrapper.find(Burger)).toHaveLength(1);
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });

    it("should render Spinner only if we dont have inggredients", () => {
        expect(wrapper.find(Spinner)).toHaveLength(1);
        expect(wrapper.find(Burger)).toHaveLength(0);
        expect(wrapper.find(BuildControls)).toHaveLength(0);
    });
});
