import React, {useState} from "react";
import styled from "styled-components";
import Button from "../Elements/Button";
import {appActions} from "../../reducers/actions";
import {useDispatch} from "react-redux";
import {API} from "../API";
import {toast} from "react-toastify";
// @ts-ignore
import VkAuth from 'react-vk-auth';
import LogoVk from "../Icons/LogoVk";
import { GoogleLogin } from 'react-google-login';
import LogoGoogle from "../Icons/LogoGoogle";
import auth_main_book from "../Images/auth_main_book.png"
import {Auth} from "./Auth";
import Registration from "../Auth/Registration";

//region Styles
const ContentWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: #3366FF;
    padding: 60px 160px;
    justify-content: space-between;
`;

const Container = styled.div`
    width: 400px;
    border-radius: 5px;
    border: 1px solid #cdcdcd;
    background: #fff;
`;

const HeaderWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const FooterWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const LogoText = styled.div`
    color: white;
    font-size: 36px;
    font-weight: bold;
`;

const TitleText = styled.div`
    color: white;
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 16px;
`;

const SubTitleText = styled.div`
    color: white;
    font-size: 20px;
    margin-bottom: 12px;
`;

const Slogan = styled.div`
    color: white;
    font-size: 14px;
`;

const MsgText = styled.div`
    color: white;
    font-size: 16px;
    margin-bottom: 16px;
`;

const RegistrationText = styled.div`
    color: white;
    font-size: 16px;
    margin-right: 16px;
    text-decoration: underline;
    cursor: pointer;
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const ContentPageWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    img {
        width: 600px;
        max-width: 600px;
        min-width: 300px;    
    }
`;

const TextWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    max-width: 650px;
    min-width: 300px;
`;

const PopupWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0,0,0, 0.6);
`;

const TitleWrapper = styled.div`
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #cdcdcd;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Tab = styled.div`
    width: 50%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #aeb4ba;
    font-size: 14px;
    cursor: pointer;
    background-color: ${props => props.isActive ? "#ffffff" : "#e7e8ea"}; 
`;

const InputWrapper = styled.div`
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #e7e8ea;
    position: relative;
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
    color: #000;
    text-align: center;
    position: absolute;
    bottom: -5px;
    background: #fff;
    padding: 0 10px;
`;
//endregion

export const AuthPage = () => {
    const [disabledBtn, setDisabledBtn] = useState(false);
    const [popupTabIndex, setPopupTabIndex] = useState(-1);
    const dispatch = useDispatch();

    const responseGoogle = async response => {
        const errorMsg = "Произошла ошибка, повторите попытку или попробуйте позже";
        if (!response.error) {
            setDisabledBtn(true);
            const data_for_request = {
                username: response.profileObj.googleId,
                email: response.profileObj.email,
                first_name: response.profileObj.givenName,
                last_name: response.profileObj.familyName,
                secret: response.accessToken,
                expire: response.Aa,
                password: response.Aa
            };
            try {
                const response = await API.USER.LOGIN_GOOGLE(data_for_request);
                setDisabledBtn(false);
                dispatch({type: appActions.SET_AUTH_DATA, user: response.data});
                dispatch({type: appActions.SET_AUTH_VALUE, auth: true});
            }
            catch(error) {
                //Делаем регистрацию
                if (error.response.status === 401) {
                    try {
                        await API.USER.REGISTRATION_GOOGLE(data_for_request);
                        await API.USER.LOGIN_GOOGLE(data_for_request);
                        setDisabledBtn(false);
                        dispatch({type: appActions.SET_AUTH_DATA, user: response.data});
                        dispatch({type: appActions.SET_AUTH_VALUE, auth: true});
                    }
                    catch(e)  {
                        toast.error(errorMsg);
                        setDisabledBtn(false);
                    }
                }
                else {
                    toast.error(errorMsg);
                    setDisabledBtn(false);
                }
            }
        }
    };

    const handleVkResponse = async data => {
        const errorMsg = "Произошла ошибка, повторите попытку или попробуйте позже";
        if (data.status === "connected") {
            setDisabledBtn(true);
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
            try {
                const response = await API.USER.LOGIN_VK(data_for_request);
                setDisabledBtn(false);
                dispatch({type: appActions.SET_AUTH_DATA, user: response.data});
                dispatch({type: appActions.SET_AUTH_VALUE, auth: true});
            }
            catch (e) {
                if (e.response.status === 401) {
                    try {
                        await API.USER.REGISTRATION_VK(data_for_request);
                        const response = await API.USER.LOGIN_VK(data_for_request);
                        dispatch({type: appActions.SET_AUTH_DATA, user: response.data});
                        dispatch({type: appActions.SET_AUTH_VALUE, auth: true});
                        setDisabledBtn(false);
                    }
                    catch(e) {
                        toast.error(errorMsg);
                        setDisabledBtn(false);
                    }
                }
                else {
                    toast.error(errorMsg);
                    setDisabledBtn(false);
                }
            }
        }
        else {
            toast.error("Произошла ошибка, повторите попытку или попробуйте позже");
            setDisabledBtn(false);
        }
    };

    return (
        <ContentWrapper>
            <HeaderWrapper>
                <LogoText>FOLKBOOK</LogoText>
                <ButtonWrapper>
                    <RegistrationText onClick={() => setPopupTabIndex(1)}>
                        Регистрация
                    </RegistrationText>
                    <Button title={"Войти"}
                            height="40px"
                            type={"fill-white"}
                            disabled={disabledBtn}
                            fontSize={"16px"}
                            onClick={() => setPopupTabIndex(0)}/>
                </ButtonWrapper>
            </HeaderWrapper>
            <ContentPageWrapper>
                <TextWrapper>
                    <TitleText>Написать книгу стало проще!</TitleText>
                    <SubTitleText>Всегда хотел написать книгу но не знал как начать?</SubTitleText>
                    <MsgText>Присоединяйся к сообществу авторов и прими участие в создании шедевра</MsgText>
                    <Button title={"Присоединиться"}
                            height="60px"
                            type={"fill-white"}
                            fontSize={"18px"}
                            disabled={disabledBtn}
                            padding={"20px"}
                            onClick={() => setPopupTabIndex(0)}/>
                </TextWrapper>
                <img src={auth_main_book} alt={""}/>
            </ContentPageWrapper>
            <FooterWrapper>
                <Slogan>сервис совместного написания книг</Slogan>
            </FooterWrapper>
            {
                popupTabIndex !== -1 &&
                <PopupWrapper onClick={e => e.target.closest('.ignoreEvents') ? null : setPopupTabIndex(-1)}>
                    <Container className={"ignoreEvents"}>
                        <TitleWrapper>
                            <Tab isActive={popupTabIndex === 0}
                                 onClick={() => setPopupTabIndex(0)}>
                                Авторизация
                            </Tab>
                            <Tab isActive={popupTabIndex === 1}
                                 onClick={() => setPopupTabIndex(1)}>
                                Регситрация
                            </Tab>
                        </TitleWrapper>
                        <InputWrapper>
                            {
                                popupTabIndex === 0 ?
                                    <Auth/>
                                    :
                                    <Registration openAuthTab={() => setPopupTabIndex(0)}/>
                            }
                            <LinkText>Войти через социальные сети</LinkText>
                        </InputWrapper>
                        <OAuthWrapper>
                            <VkButton>
                                <VkAuth apiId="7849610"
                                        callback={handleVkResponse} >
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
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </OAuthWrapper>
                    </Container>
                </PopupWrapper>
            }
        </ContentWrapper>
    )
};