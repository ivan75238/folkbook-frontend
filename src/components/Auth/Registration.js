import React, {PureComponent} from "react";
import styled from "styled-components";
import Input from "components/Elements/Input";
import Button from "components/Elements/Button";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {API} from "components/API";
import {validateEmail} from "components/utils";
import {Paths} from "../../Paths";
import {toast} from "react-toastify";

const ContentWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 400px;
    border-radius: 5px;
    border: 1px solid #cdcdcd;
    background: #fff;
`;

const TitleWrapper = styled.div`
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #cdcdcd;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Title = styled.p`
    text-transform: uppercase;
    font-size: 18px; 
    margin: 0;
    color: #000;
    font-weight: 600;
`;

const LinkText = styled.p`
    font-size: 12px; 
    margin-top: 8px;
    color: #000;
    width: 100%;
    text-align: center;
    cursor: pointer;
`;

const InputWrapper = styled.div`
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

@connect(() => ({}))
class Registration extends PureComponent {
    state = {
        username: "",
        pass: "",
        pass_repeat: "",
        disabled: false
    };

    registration = () => {
        const {username, pass, pass_repeat} = this.state;
        const {history} = this.props;
        if (username === "") {
            toast.warn("Введите имя пользователя");
            return;
        }
        if (pass === "") {
            toast.warn("Введите пароль");
            return;
        }
        if (pass_repeat === "") {
            toast.warn("Введите повтор пароля");
            return;
        }
        if (pass.length < 8) {
            toast.warn("Пароль должен быть минимум 8 символов");
            return;
        }
        if (pass_repeat !== pass) {
            toast.warn("Введенные пароли не совпадают");
            return;
        }
        if (!validateEmail(username)) {
            toast.warn("Некорректный email");
            return;
        }
        this.setState({disabled: true});

        API.USER.REGISTRATION(username, pass)
            .then(response => {
                toast.success(response.data.msgUser);
                history.push(Paths.auth.auth.path());
                this.setState({disabled: false});
            })
            .catch(error => {
                toast.error(error.response.data.msgUser);
                this.setState({disabled: false});
            });
    };

    openAuth = () => {
        const {history} = this.props;
        const {disabled} = this.state;
        if (!disabled)
            history.push(Paths.auth.auth.path());
    };

    render() {
        const {username, pass, pass_repeat, disabled} = this.state;

        return (
            <ContentWrapper>
                <Container>
                    <TitleWrapper>
                        <Title>Регистрация</Title>
                    </TitleWrapper>
                    <InputWrapper>
                        <Input width="100%"
                               value={username}
                               onChange={val => this.setState({username: val})}
                               disabled={disabled}
                               title="Почта"
                               height="40px"
                               padding="8px 0"/>
                        <Input width="100%"
                               value={pass}
                               onChange={val => this.setState({pass: val})}
                               disabled={disabled}
                               title="Пароль"
                               height="40px"
                               type={"password"}
                               margin="16px 0 0 0"
                               padding="8px 0"/>
                        <Input width="100%"
                               value={pass_repeat}
                               onChange={val => this.setState({pass_repeat: val})}
                               disabled={disabled}
                               title="Подтвердите пароль"
                               height="40px"
                               type={"password"}
                               margin="16px 0 0 0"
                               padding="8px 0"/>
                        <Button title={"Зарегистрироваться"}
                                height="40px"
                                onClick={this.registration}
                                disabled={disabled}
                                margin="16px 0 0 0"/>
                        <LinkText onClick={this.openAuth}>Войти в существующий аккаунт</LinkText>
                    </InputWrapper>
                </Container>
            </ContentWrapper>
        )
    }
}

Registration.propTypes = {
    dispatch: PropTypes.func,
    history: PropTypes.object,
};

export default Registration;
