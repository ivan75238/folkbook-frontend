import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import _get from 'lodash/get';
// @ts-ignore
import ReactTooltip from "react-tooltip";
import {AuthPage} from "./Auth/AuthPage";
import {Main} from "./Main";
import {registerLocale} from "react-datepicker";
import ru from 'date-fns/locale/ru';
import {Paths} from "../Paths";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {API} from "./API";
import {appActions} from "../reducers/actions";
import Loader from "./Elements/Loader/Loader";
import {useAppDispatch, useAppSelector} from "../store/hooks";
registerLocale('ru', ru);

//Types

//endregion

//region Styled
const MainWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
`;

const MainWrapperInner = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    background-color: #F5F5F5;
`;

const BackgroundContainer = styled.div`
    background: #fff;
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
`;

const StyledToastContainer = styled(ToastContainer).attrs({
    className: 'toast-container',
    toastClassName: 'toast',
    bodyClassName: 'body',
    progressClassName: 'progress',
})`
  .toast {
    border-radius: 5px;
  }
`;
//endregion

export const App = () => {
    const auth = useAppSelector<boolean>(state => _get(state.app, "auth", false));
    const app_loading = useAppSelector<boolean>(state => _get(state.app, "loading", false));

    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await API.USER.GET_USER();
                dispatch({type: appActions.SET_AUTH_VALUE, auth: true});
                dispatch({type: appActions.SET_AUTH_DATA, user: response.data});
                setLoading(false);
            } catch (e) {
                setLoading(false);
            }
        };
        getUser();
    }, []);

    return (
        <MainWrapper>
            { app_loading && <Loader /> }
            <ReactTooltip className="EventTooltip"/>
            <HashRouter>
                <BackgroundContainer />
                <MainWrapperInner>
                    <StyledToastContainer />
                    {
                        loading ?
                            null
                            :
                            auth ?
                                <Main/>
                                :
                                <Switch>
                                    <Route exact path={Paths.auth.auth.mask()} component={AuthPage}/>
                                    <Redirect from="/*" to="/" />
                                </Switch>
                    }
                </MainWrapperInner>
            </HashRouter>
        </MainWrapper>
    );
};
