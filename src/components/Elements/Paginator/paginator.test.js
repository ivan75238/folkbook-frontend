import React from 'react';
import Paginator from "./Paginator";
import 'jsdom-global/register';

const props = {
    countOnPage: 10,
    currentPage: 1,
    countItems: 200,
    onChangeCurrentPage: () => {}
};

describe("Тесты компонента Paginator", () => {
    describe("Тесты отрисовки", () => {
        it("Рендер с пропсами, отображаем пагинацию", () => {
            const component = shallow(<Paginator {...props}/>);
            expect(component).toMatchSnapshot();
        });

        it("Рендер с пропсами, пагинация не отображается", () => {
            const component = shallow(<Paginator {...{...props, countItems: 9}}/>);
            expect(component).toMatchSnapshot();
        });

        it("Рендер с пропсами, отображение многоточия перед цифрами", () => {
            const component = shallow(<Paginator {...{...props, currentPage: 4}}/>);
            expect(component).toMatchSnapshot();
        });

        it("Рендер с пропсами, отображение многоточия перед цифрами, без многоточия после", () => {
            const component = shallow(<Paginator {...{...props, currentPage: 18}}/>);
            expect(component).toMatchSnapshot();
        });
    });

    describe("Тесты обработчиков", () => {
        it("Клик на <<, при currentPage = 1", () => {
            const onChangeCurrentPage = jest.fn();
            const component = shallow(<Paginator {...{...props, onChangeCurrentPage}}/>);
            component.find(".arrBack2").simulate("click");
            expect(onChangeCurrentPage.mock.calls.length).toBe(0)
        });

        it("Клик на <<, при currentPage = 2", () => {
            const onChangeCurrentPage = jest.fn();
            const component = shallow(<Paginator {...{...props, onChangeCurrentPage, currentPage: 2}}/>);
            component.find(".arrBack2").simulate("click");
            expect(onChangeCurrentPage.mock.calls.length).toBe(1)
        });

        it("Клик на <, при currentPage = 1", () => {
            const onChangeCurrentPage = jest.fn();
            const component = shallow(<Paginator {...{...props, onChangeCurrentPage}}/>);
            component.find(".arrBack1").simulate("click");
            expect(onChangeCurrentPage.mock.calls.length).toBe(0)
        });

        it("Клик на <, при currentPage = 2", () => {
            const onChangeCurrentPage = jest.fn();
            const component = shallow(<Paginator {...{...props, onChangeCurrentPage, currentPage: 2}}/>);
            component.find(".arrBack1").simulate("click");
            expect(onChangeCurrentPage.mock.calls.length).toBe(1)
        });

        it("Клик на кнопка с цифрой, при currentPage = (i+1)", () => {
            const onChangeCurrentPage = jest.fn();
            const component = shallow(<Paginator {...{...props, onChangeCurrentPage, currentPage: 5}}/>);
            component.find(".btn5").simulate("click");
            expect(onChangeCurrentPage.mock.calls.length).toBe(0)
        });

        it("Клик на кнопка с цифрой, при currentPage != (i+1)", () => {
            const onChangeCurrentPage = jest.fn();
            const component = shallow(<Paginator {...{...props, onChangeCurrentPage, currentPage: 5}}/>);
            component.find(".btn7").simulate("click");
            expect(onChangeCurrentPage.mock.calls.length).toBe(1)
        });

        it("Клик на >, при currentPage = countPage", () => {
            const onChangeCurrentPage = jest.fn();
            const component = shallow(<Paginator {...{...props, onChangeCurrentPage, currentPage: 20}}/>);
            component.find(".arrNext1").simulate("click");
            expect(onChangeCurrentPage.mock.calls.length).toBe(0)
        });

        it("Клик на >, при currentPage != countPage", () => {
            const onChangeCurrentPage = jest.fn();
            const component = shallow(<Paginator {...{...props, onChangeCurrentPage, currentPage: 19}}/>);
            component.find(".arrNext1").simulate("click");
            expect(onChangeCurrentPage.mock.calls.length).toBe(1)
        });

        it("Клик на >>, при currentPage = countPage", () => {
            const onChangeCurrentPage = jest.fn();
            const component = shallow(<Paginator {...{...props, onChangeCurrentPage, currentPage: 20}}/>);
            component.find(".arrNext2").simulate("click");
            expect(onChangeCurrentPage.mock.calls.length).toBe(0)
        });

        it("Клик на >>, при currentPage != countPage", () => {
            const onChangeCurrentPage = jest.fn();
            const component = shallow(<Paginator {...{...props, onChangeCurrentPage, currentPage: 19}}/>);
            component.find(".arrNext2").simulate("click");
            expect(onChangeCurrentPage.mock.calls.length).toBe(1)
        });
    });
});
