import React from 'react';
import Button from "./Button";
import 'jest-styled-components';
import 'jsdom-global/register';

const props = {
    title: "Test title",
    background: "black",
    textColor: "white",
    fontSize: "14px",
    onClick: () => {},
    disabled: false,
    width: "100px",
    height: "40px",
    margin: "10px",
    padding: "10px",
    type: undefined
};

const setUp = (props) => shallow(<Button {...props}/>);

describe("Тесты компонента Button", () => {

    describe("Тесты отрисовки", () => {
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

    describe("Тесты с наличием пропсов", () => {
        const component = setUp(props);

        it("Снапшот с пропсами", () => {
            expect(component).toMatchSnapshot();
        });
    });

    describe("Тесты без пропсов", () => {
        const component = setUp({});

        it("Снапшот без пропсов", () => {
            expect(component).toMatchSnapshot();
        });
    });

    describe("Тесты обработчика нажатия", () => {

        it("Клик при disabled=true", () => {
            const onClickCallback = jest.fn();
            const component = setUp({disabled: true, onClick: onClickCallback});
            component.find(".btn").simulate("click");
            expect(onClickCallback.mock.calls.length).toBe(0)
        });

        it("Клик при disabled=false", () => {
            const onClickCallback = jest.fn();
            const component = setUp({disabled: false, onClick: onClickCallback});
            component.find(".btn").simulate("click");
            expect(onClickCallback.mock.calls.length).toBe(1)
        });
    });

    describe("Тесты Styled Component", () => {

        it('Тест border при type = fill-white', () => {
            const component = mount(<Button type={"fill-white"}/>);
            expect(component.find('Button')).toHaveStyleRule('border', "2px solid white");
        });

        it('Тест background при disabled = true', () => {
            const component = mount(<Button type={"fill-white"} disabled={true}/>);
            expect(component.find('Button')).toHaveStyleRule('background', "gray");
        });

        it('Тест background при disabled = false и background = undef и type = undef', () => {
            const component = mount(<Button disabled={false}/>);
            expect(component.find('Button')).toHaveStyleRule('background', "#3366FF");
        });
    });
});