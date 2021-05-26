import React, {useState} from "react";
import Input from "../Elements/Input";
import Button from "../Elements/Button";
import {toast} from "react-toastify";
import {validateEmail} from "../utils";
import {API} from "../API";

type Props = {
    openAuthTab: () => void
}

const Registration = ({openAuthTab}: Props) => {
    const [username, setUsername] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [passRepeat, setPassRepeat] = useState<string>("");
    const [disabled, setDisabled] = useState<boolean>(false);

    const registration = async () => {
        if (username === "") {
            toast.warn("Введите имя пользователя");
            return;
        }
        if (pass === "") {
            toast.warn("Введите пароль");
            return;
        }
        if (passRepeat === "") {
            toast.warn("Введите повтор пароля");
            return;
        }
        if (pass.length < 8) {
            toast.warn("Пароль должен быть минимум 8 символов");
            return;
        }
        if (passRepeat !== pass) {
            toast.warn("Введенные пароли не совпадают");
            return;
        }
        if (!validateEmail(username)) {
            toast.warn("Некорректный email");
            return;
        }
        setDisabled(true);

        try {
            const response = await API.USER.REGISTRATION(username, pass);
            toast.success(response.data.msgUser);
            openAuthTab();
            setDisabled(false);
        }
        catch(error) {
            toast.error(error.response.data.msgUser);
            setDisabled(false);
        }
    };

    return (
        <>
            <Input width="100%"
                   value={username}
                   onChange={val => setUsername(val.trim())}
                   disabled={disabled}
                   title="Почта"
                   height="40px"
                   padding="8px 0"/>
            <Input width="100%"
                   value={pass}
                   onChange={val => setPass(val.trim())}
                   disabled={disabled}
                   title="Пароль"
                   height="40px"
                   type={"password"}
                   margin="16px 0 0 0"
                   padding="8px 0"/>
            <Input width="100%"
                   value={passRepeat}
                   onChange={val => setPassRepeat(val.trim())}
                   disabled={disabled}
                   title="Подтвердите пароль"
                   height="40px"
                   type={"password"}
                   margin="16px 0 0 0"
                   padding="8px 0"/>
            <Button title={"Зарегистрироваться"}
                    height="40px"
                    onClick={registration}
                    disabled={disabled}
                    margin="16px 0 0 0"/>
        </>
    )
};

export default Registration;