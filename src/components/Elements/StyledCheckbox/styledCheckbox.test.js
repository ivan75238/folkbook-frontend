import React from 'react';
import {StyledCheckbox} from "./StyledCheckbox";
import 'jsdom-global/register';

const props = {
    value: false,
    onChange: () => {},
};

describe("Тесты компонента StyledCheckbox", () => {
    describe("Тесты отрисовки", () => {
        it("Тест snapshot, value = false", () => {
            const component = mount(<StyledCheckbox {...props}/>);
            expect(component).toMatchSnapshot();
        });

        it("Тест snapshot, value = true", () => {
            const component = mount(<StyledCheckbox {...{...props, value: true}}/>);
            expect(component).toMatchSnapshot();
        });
    });

    describe("Тесты событий", () => {
        it("Тест onChange, disabled = false", () => {
            const onChange = jest.fn();
            const component = shallow(<StyledCheckbox {...{...props, onChange}}/>);
            component.find(".checkboxWrapper").simulate("click");
            expect(onChange.mock.calls.length).toBe(1);
        });

        it("Тест onChange, disabled = true", () => {
            const onChange = jest.fn();
            const component = shallow(<StyledCheckbox {...{...props, onChange, disabled: true}}/>);
            component.find(".checkboxWrapper").simulate("click");
            expect(onChange.mock.calls.length).toBe(0);
        });
    });
});