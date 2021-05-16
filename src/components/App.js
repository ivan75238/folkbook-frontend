import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import _get from 'lodash/get';
import ReactTooltip from "react-tooltip";
import {AuthPage} from "components/Auth/AuthPage";
import {Main} from "components/Main";
import {registerLocale} from "react-datepicker";
import ru from 'date-fns/locale/ru';
import {Paths} from "../Paths";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {API} from "components/API";
import {appActions} from "reducers/actions";
import Loader from "components/Elements/Loader";
registerLocale('ru', ru);

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
    const auth = useSelector(state => _get(state.app, "auth", false));
    const app_loading = useSelector(state => _get(state.app, "loading", false));

    const [loading, setLoading] = useState(true);
    const [resCheckAuth, setResCheckAuth] = useState({});
    const dispatch = useDispatch();

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
    }, [resCheckAuth, setResCheckAuth, dispatch]);

    return (
        <MainWrapper>
            { app_loading && <Loader /> }
            <ReactTooltip className="EventTooltip"/>
            <BrowserRouter>
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
            </BrowserRouter>
        </MainWrapper>
    );
};
