import React, {useState} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import EyeIcon from "components/Icons/EyeIcon";

//region Styled
const InputWrapper = styled.div`
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

const InputStyled = styled.input`
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

const Input = (props) => {
    const {onChange, value, onEnterPress, type, title, disabled, width, margin, height, hideTitle, padding, onClick} = props;
    const [visiblePassword, setVisiblePassword] = useState();

    const onKeyPress = event => {
        if (onEnterPress && event.charCode === 13){
            onEnterPress(event);
        }
    };

    return (
        <InputWrapper width={width}
                      onClick={onClick ? onClick : null}
                      margin={margin}>
            {
                hideTitle ? null :
                    <Label>{title}</Label>
            }
            {
                type === "password" &&
                <IconWrapper onClick={() => setVisiblePassword(!visiblePassword)}>
                    <EyeIcon/>
                </IconWrapper>
            }
            <InputStyled onChange={e => onChange(e.target.value)}
                         onKeyPress={e => onKeyPress(e)}
                         type={type === "password" ? visiblePassword ? "" : type : type}
                         height={height}
                         padding={padding}
                         disabled={disabled}
                         value={value ? value : ""}/>
        </InputWrapper>
    )
};

Input.propTypes = {
    value: PropTypes.any,
    type: PropTypes.string,
    title: PropTypes.string,
    padding: PropTypes.string,
    hideTitle: PropTypes.bool,
    widthImportant: PropTypes.bool,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    width: PropTypes.string,
    height: PropTypes.string,
    disabled: PropTypes.bool,
    onEnterPress: PropTypes.func,
    margin: PropTypes.string,
};

export default Input;
