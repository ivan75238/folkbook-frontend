import React, {PureComponent} from "react";
import Input from "components/Elements/Input";
import Button from "components/Elements/Button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {API} from "components/API";
import {validateEmail} from "components/utils";
import {Paths} from "../../Paths";
import {toast} from "react-toastify";

@connect(() => ({}))
class Registration extends PureComponent {
    state = {
        username: "",
        pass: "",
        pass_repeat: "",
        disabled: false
    };

    registration = () => {
        let {username, pass, pass_repeat} = this.state;
        const {history} = this.props;
        username = username.trim();
        const pass_trim = pass.trim();
        const pass_repeat_trim = pass_repeat.trim();
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
        if (pass_trim !== pass || pass_repeat_trim !== pass_repeat ) {
            toast.warn("Пароль не может содержать символы пробела");
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

    render() {
        const {username, pass, pass_repeat, disabled} = this.state;

        return (
            <>
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
            </>
        )
    }
}

Registration.propTypes = {
    dispatch: PropTypes.func,
    history: PropTypes.object,
};

export default Registration;
