import React from 'react';
import {Auth} from "./Auth";
import 'jsdom-global/register';
import 'regenerator-runtime/runtime';
import {Provider} from "react-redux";
import {store} from "./../../../store/index";
import { act } from 'react-dom/test-utils';

jest.mock('./../../../__mocks__/API');

describe("Тесты компонента Auth", () => {
    const ReduxProvider = <Provider store={store}><Auth/></Provider>;

    describe("Тесты отрисовки", () => {
        it("Тест снапшотом", () => {
            const component = mount(ReduxProvider);
            expect(component).toMatchSnapshot();
        });
    });

    describe("Тесты функций", () => {

        describe("Тесты функции login", () => {

            it("Тест функции login, проверка пустого email", () => {
                const component = mount(ReduxProvider);
                component.find("#btn-login").simulate("click");
                expect(component.find('.resultLoginValue').text()).toBe('Введите имя пользователя');
            });

            it("Тест функции login, проверка пустого password", () => {
                const component = mount(ReduxProvider);
                act(() => {
                    component.find("#login").prop("onChange")("moyecaf438@iludir.com");
                });
                component.find("#btn-login").simulate("click");
                expect(component.find('.resultLoginValue').text()).toBe('Введите пароль');
            });

            it("Тест функции login, успешная авторизация", () => {
                expect.assertions(1);
                const component = mount(ReduxProvider);
                act(() => {
                    component.find("#login").prop("onChange")("moyecaf438@iludir.com");
                    component.find("#pass").prop("onChange")("12345678");
                });
                component.find("#btn-login").simulate("click");
                expect(component.find('.resultLoginValue').text()).toBe('Иван Фонтош');
            });
        });
    });
});