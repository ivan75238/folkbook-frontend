import Input from "./Input";
import React from "react";
import 'jest-styled-components';
import 'jsdom-global/register';

const props = {
    value: "test_value",
    title: "title_test",
    disabled: false,
    width: "100%",
    height: "40%",
    margin: "16px",
    hideTitle: false,
    padding: "10px",
    onClick: null
};

const setUp = (props) => shallow(<Input {...props}/>);

describe("Тесты компонента Input", () => {
    describe("Тесты отрисовки", () => {
        it("Отрисовка компонента без пропсов", () => {
            const component = mount(<Input/>);
            expect(component).toMatchSnapshot();
        });

        it("Отрисовка компонента для пароля", () => {
            const component = mount(<Input type={"password"}/>);
            expect(component).toMatchSnapshot();
        });
    });

    describe("Тесты с наличием пропсов", () => {
        const component = setUp(props);

        it("Снапшот с пропсами", () => {
            expect(component).toMatchSnapshot();
        });

        it("Тесты при type = password", () => {
            const component = shallow(<Input {...props}
                                           type={"password"}/>);
            const wrapper = component.find(".password-icon");
            expect(wrapper.length).toBe(1);
        });

        it("Тесты при hideTitle = true", () => {
            const component = shallow(<Input {...props}
                                             hideTitle={true}/>);
            const wrapper = component.find(".label");
            expect(wrapper.length).toBe(0);
        });
    });

    describe("Тесты событий", () => {

        it("Клик на елемент, при наличии в пропсах", () => {
            const onClick = jest.fn();
            const component = setUp({...props, onClick});
            component.find(".wrapper").simulate("click");
            expect(onClick.mock.calls.length).toBe(1)
        });

        it("Клик на елемент, при отсутствии в пропсах", () => {
            const onClick = jest.fn();
            const component = setUp({...props});
            component.find(".wrapper").simulate("click");
            expect(onClick.mock.calls.length).toBe(0)
        });

        it("Клик на иконку глаза", () => {
            const component = setUp({...props, type: "password"});
            component.find(".password-icon").simulate("click");
            const input = component.find(".InputStyled");
            expect(input.prop("type")).toBe("");
        });

        it("Событие onChange передано", () => {
            const onChange = jest.fn();
            const component = setUp({...props, onChange});
            let input = component.find(".InputStyled");
            input.simulate("change", {target: {value: "new value"}});
            expect(onChange.mock.calls.length).toBe(1);
        });

        it("Событие onEnterPress передано", () => {
            const onEnterPress = jest.fn();
            const component = setUp({...props, onEnterPress});
            let input = component.find(".InputStyled");
            input.simulate("keyPress", {charCode: 13});
            expect(onEnterPress.mock.calls.length).toBe(1);
        });
    });

});