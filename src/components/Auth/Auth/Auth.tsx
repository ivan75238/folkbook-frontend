import React from "react";
import Input from "../../Elements/Input/Input";
import Button from "../../Elements/Button/Button";
import {toast} from "react-toastify";
import {API} from "../../API";
import {appActions} from "../../../reducers/actions";
import _get from "lodash/get";
import {useAppDispatch} from "../../../store/hooks";

export const Auth = () => {
    const [username, setUsername] = React.useState<string>("");
    const [pass, setPass] = React.useState<string>("");
    const [loginReturnedValue, setLoginReturnedValue] = React.useState<string>("");
    const [disabled, setDisabled] = React.useState<boolean>(false);
    const dispatch = useAppDispatch();

    const login = async () => {
        if (username === "") {
            const msg = "Введите имя пользователя";
            toast.warn(msg);
            setLoginReturnedValue(msg);
            return;
        }
        if (pass === "") {
            const msg = "Введите пароль";
            toast.warn(msg);
            setLoginReturnedValue(msg);
            return;
        }
        setDisabled(true);
        try {
            const response = await API.USER.LOGIN(username, pass);
            console.log("response", response);
            dispatch({type: appActions.SET_AUTH_DATA, user: response.data});
            dispatch({type: appActions.SET_AUTH_VALUE, auth: true});
            setDisabled(false);
            setLoginReturnedValue(response.data.nickname);
            return;
        }
        catch(error) {
            setDisabled(false);
            if (_get(error, "response.data.msgUser", false)) {
                toast.error(error.response.data.msgUser);
                setLoginReturnedValue(error.response.data.msgUser.toString());
                return;
            }
            else {
                toast.error("Неправилный email или пароль");
                setLoginReturnedValue("Неправилный email или пароль");
                return;
            }
        }
    };

    return (
        <>
            <p style={{display: "none"}} className={"resultLoginValue"}>{loginReturnedValue}</p>
            <Input width="100%"
                   value={username}
                   id={"login"}
                   onChange={(val: string) => setUsername(val.trim())}
                   disabled={disabled}
                   onEnterPress={login}
                   title="Почта"
                   height="40px"
                   padding="8px 0"/>
            <Input width="100%"
                   value={pass}
                   id={"pass"}
                   disabled={disabled}
                   onEnterPress={login}
                   onChange={(val: string) => setPass(val.trim())}
                   title="Пароль"
                   height="40px"
                   type={"password"}
                   margin="16px 0 0 0"
                   padding="8px 0"/>
            <Button title={"Войти"}
                    height="40px"
                    id={"btn-login"}
                    disabled={disabled}
                    onClick={login}
                    margin="16px 0 0 0" />
        </>
    )
};