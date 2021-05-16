import React, {useState} from "react";
import Input from "components/Elements/Input";
import Button from "components/Elements/Button";
import {toast} from "react-toastify";
import {API} from "components/API";
import {appActions} from "reducers/actions";
import _get from "lodash/get";
import {useDispatch} from "react-redux";

export const Auth = () => {
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const [disabled, setDisabled] = useState(false);
    const dispatch = useDispatch();

    const login = async () => {
        if (username === "") {
            toast.warn("Введите имя пользователя");
            return;
        }
        if (pass === "") {
            toast.warn("Введите пароль");
            return;
        }
        setDisabled(true);
        try {
            const response = await API.USER.LOGIN(username, pass);
            dispatch({type: appActions.SET_AUTH_DATA, user: response.data});
            dispatch({type: appActions.SET_AUTH_VALUE, auth: true});
            setDisabled(false);
        }
        catch(error) {
            setDisabled(false);
            if (_get(error, "response.data.msgUser", false))
                toast.error(error.response.data.msgUser);
            else
                toast.error("Неправилный email или пароль");
        }
    };

    return (
        <>
            <Input width="100%"
                   value={username}
                   onChange={val => setUsername(val.trim())}
                   disabled={disabled}
                   onEnterPress={login}
                   title="Почта"
                   height="40px"
                   padding="8px 0"/>
            <Input width="100%"
                   value={pass}
                   disabled={disabled}
                   onEnterPress={login}
                   onChange={val => setPass(val.trim())}
                   title="Пароль"
                   height="40px"
                   type={"password"}
                   margin="16px 0 0 0"
                   padding="8px 0"/>
            <Button title={"Войти"}
                    height="40px"
                    disabled={disabled}
                    onClick={login}
                    margin="16px 0 0 0"/>
        </>
    )
};