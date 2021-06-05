import React from 'react';
import Loader from "./Loader";
import 'jsdom-global/register';

describe("Тесты компонента Loader", () => {
    it ("Тест снапшотом", () => {
        const component = mount(<Loader/>);
        expect(component).toMatchSnapshot();
    })
});
