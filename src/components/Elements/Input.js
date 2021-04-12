import React, {PureComponent} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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

const InputStyled = styled.input`
    width: 100%;
    font-family: "GothamPro", sans-serif;
    font-size: 16px;
    height: ${props => props.height}; 
    border: 1px solid #cdcdcd;
    box-sizing: border-box;
    border-radius: 4px;
    background: transparent;
    padding: ${props => props.padding};
    color: #000;
    padding: 0 16px;
    outline: none;
    -webkit-appearance: none;
`;

//Стилизованный инпут
class Input extends PureComponent {
    onChange = (value) => {
        const {onChange} = this.props;
        if (onChange)
            onChange(value)
    };

    render() {
        const {value, type, title, disabled, width, margin, height, hideTitle, padding, onClick} = this.props;
        return (
            <InputWrapper width={width}
                          onClick={onClick ? onClick : null}
                          margin={margin}>
                {
                    hideTitle ? null :
                        <Label>{title}</Label>
                }
                <InputStyled onChange={e => this.onChange(e.target.value)}
                             type={type}
                             height={height}
                             padding={padding}
                             disabled={disabled}
                             value={value ? value : ""}/>
            </InputWrapper>
        )
    }
}



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
    margin: PropTypes.string,
};

export default Input;
