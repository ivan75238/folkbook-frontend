import Popup from "./Popup";
import React, {useEffect} from "react";
import 'jest-styled-components';
import 'jsdom-global/register';

const props = {
    width: "400px",
    title: "Тестой заоголовок"
};

const setUp = (props) => shallow(<Popup {...props}/>);

describe("Тесты для компонента Popup", () => {
    describe("Тесты отрисовки", () => {
        it("Отрисовка компонента без пропсов", () => {
            const component = mount(<Popup/>);
            expect(component).toMatchSnapshot();
        });
    });

    describe("Тесты событий", () => {
        beforeEach(() => {
            jest.spyOn(React, "useEffect").mockImplementationOnce(func => func());
        });

        it("Событие закрытия окна по нажатию на подложку, onClose передан", () => {
            const onClose = jest.fn();
            const component = setUp({...props, onClose});
            component.find(".background").simulate("click");
            expect(onClose.mock.calls.length).toBe(1);
        });

        it("Событие закрытия окна по нажатию на подложку, onClose непередан", () => {
            const onClose = jest.fn();
            const component = setUp({...props, onClose: null});
            component.find(".background").simulate("click");
            expect(onClose.mock.calls.length).toBe(0);
        });

        it("Событие закрытия окна по нажатию на крестик, onClose передан", () => {
            const onClose = jest.fn();
            const component = setUp({...props, onClose});
            component.find(".close-icon").simulate("click");
            expect(onClose.mock.calls.length).toBe(1);
        });

        it("Событие закрытия окна по нажатию на крестик, onClose непередан", () => {
            const onClose = jest.fn();
            const component = setUp({...props, onClose: null});
            component.find(".close-icon").simulate("click");
            expect(onClose.mock.calls.length).toBe(0);
        });

        it("Событие закрытия окна по нажатию на ESC, onClose передан", () => {
            const onClose = jest.fn();
            const component = mount(<Popup {...{...props, onClose: onClose, listenEscForClose: true}}/>);
            const event = new KeyboardEvent('keydown', {'keyCode': 27});
            document.dispatchEvent(event);
            expect(onClose.mock.calls.length).toBe(1);
        });

        it("Событие закрытия окна по нажатию на ESC, onClose непередан", () => {
            const onClose = jest.fn();
            const component = mount(<Popup {...{...props, onClose: null, listenEscForClose: true}}/>);
            const event = new KeyboardEvent('keydown', {'keyCode': 27});
            document.dispatchEvent(event);
            expect(onClose.mock.calls.length).toBe(0);
        });

    });
});