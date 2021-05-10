import React, {PureComponent} from "react";
import Input from "components/Elements/Input";
import Button from "components/Elements/Button";
import PropTypes from "prop-types";
import {appActions} from "reducers/actions";
import { connect } from "react-redux";
import {API} from "components/API";
import _get from "lodash/get";
import {toast} from "react-toastify";

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

    render() {
        const {username, pass, disabled, disabledBtn} = this.state;

        if (disabled) return null;

        return (
            <>
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
            </>
        )
    }
}

Auth.propTypes = {
    updateSession: PropTypes.func,
    dispatch: PropTypes.func,
    history: PropTypes.object,
};

export default Auth;
