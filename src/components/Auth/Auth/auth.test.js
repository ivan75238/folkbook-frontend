import React from 'react';
import {Auth} from "./Auth";
import 'jest-styled-components';
import 'jsdom-global/register';

describe("Тесты компонента Auth", () => {
    it ("Тест снапшотом", () => {
        const component = mount(<Auth/>);
        expect(component).toMatchSnapshot();
    })
});