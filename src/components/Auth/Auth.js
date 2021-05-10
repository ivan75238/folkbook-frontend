import React, {PureComponent} from "react";
import styled from "styled-components";
import Input from "components/Elements/Input";
import Button from "components/Elements/Button";
import PropTypes from "prop-types";
import {appActions} from "reducers/actions";
import { connect } from "react-redux";
import {API} from "components/API";
import {Paths} from "../../Paths";
import _get from "lodash/get";
import {toast} from "react-toastify";
import VkAuth from 'react-vk-auth';
import LogoVk from "components/Icons/LogoVk";
import { GoogleLogin } from 'react-google-login';
import LogoGoogle from "components/Icons/LogoGoogle";


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

const VkButton = styled.div`
    width: 48px;
    height: 48px;

button {
    background: transparent;
    border: none;
    padding: 0px;
}
`;

const LogoWrapper = styled.div`
    width: 32px;
    height: 32px;
    margin: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    svg {
        width: 100%;
        height: 100%;
    }
`;

const GoogleWrapper = styled.div`
    width: 22px;
    height: 22px;
    margin: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    svg {
        width: 100%;
        height: 100%;
    }
`;

const OAuthWrapper = styled.div`
    width: 100%;
    display: flex;
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
        disabled: false,
        disabledBtn: false,
    };

    constructor(props) {
        super(props);
    }

    openRegistration = () => {
        const {history} = this.props;
        const {disabled} = this.state;
        if (!disabled)
            history.push(Paths.auth.registration.path());
    };

    login = () => {
        let {username, pass} = this.state;
        const {dispatch} = this.props;
        username = username.trim();
        if (username === "") {
            toast.warn("Введите имя пользователя");
            return;
        }
        if (pass === "") {
            toast.warn("Введите пароль");
            return;
        }
        this.setState({disabledBtn: true});

        API.USER.LOGIN(username, pass)
            .then(response => {
                this.setState({disabledBtn: false});
                dispatch({type: appActions.SET_AUTH_DATA, user: response.data});
                dispatch({type: appActions.SET_AUTH_VALUE, auth: true});
            })
            .catch(error => {
                this.setState({disabledBtn: false});
                if (_get(error, "response.data.msgUser", false))
                    toast.error(error.response.data.msgUser);
                else
                    toast.error("Неправилный email или пароль");
            });
    };

    handleVkResponse = (data) => {
        const {dispatch} = this.props;
        if (data.status === "connected") {
            this.setState({ disabled: true, disabledBtn: true });
            const data_for_request = {
                username: data.session.user.id,
                first_name: data.session.user.first_name,
                last_name: data.session.user.last_name,
                href: data.session.user.href,
                secret: data.session.secret,
                status: data.status,
                expire: data.session.expire,
                password: data.session.expire,
            };
            API.USER.LOGIN_VK(data_for_request)
                .then(response => {
                    this.setState({disabledBtn: false, disabled: false});
                    dispatch({type: appActions.SET_AUTH_DATA, user: response.data});
                    dispatch({type: appActions.SET_AUTH_VALUE, auth: true});
                })
                .catch(error => {
                    //Делаем регистрацию
                    if (error.response.status === 401) {
                        API.USER.REGISTRATION_VK(data_for_request)
                            .then(() => {
                                API.USER.LOGIN_VK(data_for_request)
                                    .then(response => {
                                        this.setState({disabledBtn: false, disabled: false});
                                        dispatch({type: appActions.SET_AUTH_DATA, user: response.data});
                                        dispatch({type: appActions.SET_AUTH_VALUE, auth: true});
                                    })
                                    .catch(() => {
                                        toast.error("Произошла ошибка, повторите попытку или попробуйте позже");
                                        this.setState({disabledBtn: false, disabled: false});
                                    })
                            })
                            .catch(() => {
                                toast.error("Произошла ошибка, повторите попытку или попробуйте позже");
                                this.setState({disabledBtn: false, disabled: false});
                            })
                    }
                    else {
                        toast.error("Произошла ошибка, повторите попытку или попробуйте позже");
                        this.setState({disabledBtn: false, disabled: false});
                    }
                });
        }
        else {
            toast.error("Произошла ошибка, повторите попытку или попробуйте позже");
            this.setState({disabledBtn: false, disabled: false});
        }
    };

    responseGoogle = (response) => {
        //const {dispatch} = this.props;
        this.setState({ disabled: true, disabledBtn: true });
        console.log(response);
        /*const data_for_request = {
            username: data.session.user.id,
            first_name: data.session.user.first_name,
            last_name: data.session.user.last_name,
            href: data.session.user.href,
            secret: data.session.secret,
            status: data.status,
            expire: data.session.expire,
            password: data.session.expire,
        };*/
        if (!response.error) {

        }
    };

    render() {
        const {username, pass, disabled, disabledBtn} = this.state;

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
                                disabled={disabledBtn}
                                onClick={this.login}
                                margin="16px 0 0 0"/>
                        <LinkText onClick={this.openRegistration}>Регистрация</LinkText>
                    </InputWrapper>
                    <OAuthWrapper>
                        <VkButton>
                            <VkAuth apiId="7849610"
                                    callback={this.handleVkResponse} >
                                <LogoWrapper>
                                    <LogoVk/>
                                </LogoWrapper>
                            </VkAuth>
                        </VkButton>
                        <GoogleLogin
                            clientId="556493551813-43hqhe31birgr84pre1lkvp20hs506o9.apps.googleusercontent.com"
                            render={renderProps => (
                                <GoogleWrapper onClick={() => renderProps.onClick()}>
                                    <LogoGoogle />
                                </GoogleWrapper>
                            )}
                            buttonText="Login"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </OAuthWrapper>
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
