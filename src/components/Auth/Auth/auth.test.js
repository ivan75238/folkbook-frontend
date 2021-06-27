import React from 'react';
import {Auth} from "./Auth";
import 'jsdom-global/register';
import 'regenerator-runtime/runtime';
import {Provider} from "react-redux";
import {store} from "./../../../store/index";
import { act } from 'react-dom/test-utils';
import axios from "axios";

jest.mock('axios');

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

            it("Тест функции login, успешная авторизация", async () => {
                const test_user_data = {
                    id: 55,
                    is_active: 1,
                    username: 46086121,
                    created_at: "2021-05-10T04:20:37.000Z",
                    nickname: "Иван Фонтош"
                };
                axios.post.mockImplementation(() => {
                    return Promise.resolve({ data: test_user_data });
                });
                const component = mount(ReduxProvider);
                act(() => component.find("#login").prop("onChange")("moyecaf438@iludir.com"));
                act(() => component.find("#pass").prop("onChange")("12345678"));
                await act(async () => await component.find("#btn-login").simulate("click"));

                expect(component.find('.resultLoginValue').text()).toBe('Иван Фонтош');
            });

            it("Тест функции login, не успешная авторизация", async () => {
                axios.post.mockImplementation(() => {
                    return Promise.reject({ response: {data: {msgUser: "error"}} });
                });
                const component = mount(ReduxProvider);
                act(() => component.find("#login").prop("onChange")("moyecaf438@iludir.com"));
                act(() => component.find("#pass").prop("onChange")("12345678"));
                await act(async () => await component.find("#btn-login").simulate("click"));

                expect(component.find('.resultLoginValue').text()).toBe('error');
            });

            it("Тест функции login, не успешная авторизация, неверныйе данные", async () => {
                axios.post.mockImplementation(() => {
                    return Promise.reject({ response: {data: {}} });
                });
                const component = mount(ReduxProvider);
                act(() => component.find("#login").prop("onChange")("moyecaf438@iludir.com"));
                act(() => component.find("#pass").prop("onChange")("12345678"));
                await act(async () => await component.find("#btn-login").simulate("click"));

                expect(component.find('.resultLoginValue').text()).toBe('Неправилный email или пароль');
            });
        });
    });
});