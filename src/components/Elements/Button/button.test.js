import React from 'react';
import Button from "./Button";

describe("Тесты компонента Button", () => {

    it("Отрисовка компонента Button без type", () => {
        const component = shallow(<Button/>);
        expect(component).toMatchSnapshot();
    });

    it("Отрисовка компонента Button type = fill-white", () => {
        const component = shallow(<Button type={"fill-white"}/>);
        const wrapper = component.find(".fill-white");
        expect(wrapper.length).toBe(1);
    });

});