import React from 'react';
import ReactSelect from "./ReactSelect";
import 'jsdom-global/register';

const props = {
    options: [{label: "1", value: 1}, {label: "2", value: 2}],
    value: {label: "1", value: 1},
    onChange: () => {},
};

describe("Тесты компонента ReactSelect", () => {
    describe("Тесты отрисовки", () => {
        it("Тест snapshot", () => {
            const component = render(<ReactSelect {...props}/>);
            expect(component).toMatchSnapshot();
        });
    });
});