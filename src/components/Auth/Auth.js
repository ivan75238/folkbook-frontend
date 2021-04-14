import React, {PureComponent} from "react";
import styled from "styled-components";
import Input from "components/Elements/Input";
import Button from "components/Elements/Button";
import {toast} from "react-toastify";
import PropTypes from "prop-types";
import {appActions} from "reducers/actions";
import connect from "react-redux/es/connect/connect";
import {API} from "components/API";
import {Paths} from "../../Paths";

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

const InputWrapper = styled.div`
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const LinkText = styled.p`
    font-size: 12px; 
    margin-top: 8px;
    color: #000;
    width: 100%;
    text-align: center;
    cursor: pointer;
`;

@connect(() => ({}))
class Auth extends PureComponent {
    state = {
        username: "",
        pass: "",
        disabled: true
    };

    constructor(props) {
        super(props);
        this.checkAuth();
    }

    checkAuth = () => {
        const {dispatch} = this.props;
        API.USER.GET_USER()
            .then(response => {
                dispatch({type: appActions.SET_AUTH_VALUE, auth: true});
                dispatch({type: appActions.SET_AUTH_DATA, user: response.data});
            })
            .catch(() => {
                this.setState({disabled: false});
            });
    };

    openRegistration = () => {
        const {history} = this.props;
        history.push(Paths.auth.registration.path());
    };

    login = () => {
        const {username, pass} = this.state;
        const {dispatch} = this.props;
        if (username === "") {
            toast.warn("Введите имя пользователя");
            return;
        }
        if (pass === "") {
            toast.warn("Введите пароль");
            return;
        }

        API.USER.LOGIN(username, pass)
            .then(response => {
                if (response.data.result === false){
                    toast.error(response.data.msgUser);
                }
                else {
                    dispatch({type: appActions.SET_AUTH_DATA, user: response.data});
                    dispatch({type: appActions.SET_AUTH_VALUE, auth: true});
                }
            })
            .catch(() => {
                toast.error("Неправилный email или пароль");
            });
    };

    render() {
        const {username, pass, disabled} = this.state;

        if (disabled) return null;

        return (
            <ContentWrapper>
                <Container>
                    <TitleWrapper>
                        <Title>Авторизация</Title>
                    </TitleWrapper>
                    <InputWrapper>
                        <Input width="100%"
                               value={username}
                               onChange={val => this.setState({username: val})}
                               disabled={disabled}
                               onEnterPress={this.login}
                               title="Почта"
                               height="40px"
                               padding="8px 0"/>
                        <Input width="100%"
                               value={pass}
                               disabled={disabled}
                               onEnterPress={this.login}
                               onChange={val => this.setState({pass: val})}
                               title="Пароль"
                               height="40px"
                               type={"password"}
                               margin="16px 0 0 0"
                               padding="8px 0"/>
                        <Button title={"Войти"}
                                height="40px"
                                disabled={disabled}
                                onClick={this.login}
                                margin="16px 0 0 0"/>
                        <LinkText onClick={this.openRegistration}>Регистрация</LinkText>
                    </InputWrapper>
                </Container>
            </ContentWrapper>
        )
    }
}

Auth.propTypes = {
    updateSession: PropTypes.func,
    dispatch: PropTypes.func,
    history: PropTypes.object,
};

export default Auth;
