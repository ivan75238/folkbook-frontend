import React, {ChangeEvent, useState} from "react";
import styled from "styled-components";
import EyeIcon from "../../Icons/EyeIcon";

//region Types
type Props = {
    value?: string,
    onEnterPress?: (e: React.KeyboardEvent) => void,
    type?: string,
    title?: string,
    disabled?: boolean,
    width?: string,
    margin?: string,
    height?: string,
    hideTitle?: boolean,
    padding?: string,
    onClick?: () => void | null
}

type PropsStyled = Props & {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void | null,
}

type PropsComponent = Props & {
    onChange?: (e: string) => void | null,
}
//endregion

//region Styled
const InputWrapper = styled.div<PropsStyled>`
    position: relative;
    width: ${props => props.width};
    margin: ${props => props.margin};
        
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type='number'] {
        -moz-appearance: textfield;
    }     
    
    input::-ms-clear {
       display: none;
    }
`;

const Label = styled.p`
    font-family: Roboto,sans-serif;
    position: absolute;
    top: -5px;
    padding: 0 6px;
    left: 7px;
    font-size: 12px;
    color: #cecece;
    background: #fff;
`;

const IconWrapper = styled.div`
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
`;

const InputStyled = styled.input<PropsStyled>`
    width: 100%;
    font-family: "GothamPro", sans-serif;
    font-size: 14px;
    height: ${props => props.height}; 
    border: 1px solid #cdcdcd;
    box-sizing: border-box;
    border-radius: 4px;
    background: transparent;
    padding: ${props => props.padding};
    color: #000;
    padding: 0 16px;
    outline: none;
`;
//endregion

const Input = (props: PropsComponent) => {
    const {onChange, value, onEnterPress, type, title, disabled, width, margin, height, hideTitle, padding, onClick} = props;
    const [visiblePassword, setVisiblePassword] = useState<boolean>();

    const onKeyPressHandler = (event: React.KeyboardEvent) => {
        if (onEnterPress && event.charCode === 13){
            onEnterPress(event);
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange){
            onChange(e.target.value);
        }
    };

    return (
        <InputWrapper width={width}
                      className={"wrapper"}
                      onClick={() => onClick ? onClick() : null}
                      margin={margin}>
            {
                hideTitle ? null :
                    <Label className={"label"}>{title}</Label>
            }
            {
                type === "password" &&
                <IconWrapper onClick={() => setVisiblePassword(!visiblePassword)}
                             className={"password-icon"}>
                    <EyeIcon/>
                </IconWrapper>
            }
            <InputStyled onChange={onChangeHandler}
                         onKeyPress={onKeyPressHandler}
                         className={"InputStyled"}
                         type={type === "password" ? visiblePassword ? "" : type : type}
                         height={height}
                         padding={padding}
                         disabled={disabled}
                         value={value ? value : ""}/>
        </InputWrapper>
    )
};

export default Input;