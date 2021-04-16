import React, {PureComponent} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import _get from 'lodash/get';
import ReactTooltip from "react-tooltip";
import Auth from "components/Auth/Auth";
import Main from "components/Main";
import {registerLocale, setDefaultLocale} from "react-datepicker";
import ru from 'date-fns/locale/ru';
import {Paths} from "../Paths";
import Registration from "components/Auth/Registration";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {API} from "components/API";
import {appActions} from "reducers/actions";
registerLocale('ru', ru);

const MainWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
`;

const MainWrapperInner = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
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

@connect(state => ({
    auth: _get(state.app, "auth"),
    user: _get(state.app, "user"),
}))
class App extends PureComponent {
    state = {
        loading: true,
    };

    constructor(props) {
        super(props);
        setDefaultLocale('ru');
        this.checkAuth();
    }

    checkAuth = () => {
        const {dispatch} = this.props;
        API.USER.GET_USER()
            .then(response => {
                dispatch({type: appActions.SET_AUTH_VALUE, auth: true});
                dispatch({type: appActions.SET_AUTH_DATA, user: response.data});
                this.setState({loading: false});
            })
            .catch(() => {
                this.setState({loading: false});
            });
    };

    render() {
        const {auth} = this.props;
        const {loading} = this.state;
        return(
            <MainWrapper>
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
                                            <Route exact path={Paths.auth.auth.mask()} render={props => <Auth {...props}/>}/>
                                            <Route exact path={Paths.auth.registration.mask()} render={props => <Registration {...props}/>}/>
                                            <Redirect from="/*" to="/" />
                                        </Switch>
                            }
                        </MainWrapperInner>
                </HashRouter>
            </MainWrapper>
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func,
    auth: PropTypes.bool,
    user: PropTypes.object,
};

export default App;
