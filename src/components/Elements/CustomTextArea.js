import React, {PureComponent} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import TextareaAutosize from 'react-textarea-autosize';

const InputWrapper = styled.div`
    position: relative;
    cursor: pointer;
    width: ${props => props.width};
    margin: ${props => props.margin};
        
    textarea::-webkit-outer-spin-button,
    textarea::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    textarea[type='number'] {
        -moz-appearance: textfield;
    }     
    
    textarea::-ms-clear {
       display: none;
    }
    
    textarea {
        width: 100%;
        font-family: "GothamPro", sans-serif;
        font-size: 16px;
        height: ${props => props.height}; 
        background: transparent; 
        border: 1px solid #cdcdcd;
        box-sizing: border-box;
        border-radius: 4px;
        padding-top: 24px;
        padding-left: 12px;
        padding-right: 12px;
        padding-bottom: 13px;
        resize: none;
        outline: none;
        -webkit-appearance: none;
        color: ${props => props.disable === "1" ? "#B3BABD" : "#51565B"};
        line-height: 18px;
    }
`;

function auxiliaryTextColor(type) {
    switch(type){
        default:
            return "#B3BABD";
    }
}

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

const Required = styled.span`
    color: red;
`;

const AuxiliaryText = styled.p`
    font-family: 'sfprodisplay',sans-serif;
    position: absolute;
    bottom: -18px;
    left: 12px;
    color: ${props => auxiliaryTextColor(props.color)};
    font-size: 12px;
    line-height: 14px;
    padding-top: 24px;
    padding-left: 12px;
    padding-right: 12px;
`;

class CustomTextArea extends PureComponent {
    state = {
        focus: false,
        error: false
    };

    onChange = (value) => {
        const {onChange} = this.props;
        if (onChange)
            onChange(value)
    };

    onKeyPeress = (code) => {
        const {onKeyPeress} = this.props;
        if (onKeyPeress)
            onKeyPeress(code)
    };

    render() {
        const {value, type, title, width, margin, errorText, height, padding, onClick, disable, auxiliaryText, background, minRows, maxRows, isRequired} = this.props;
        const {focus, error} = this.state;
        return (
            <InputWrapper width={width}
                          onClick={onClick ? onClick : null}
                          margin={margin}
                          color={disable ? "disable" : error ? "error" : focus ? "focus" : null}
                          background={background}
                          disable={disable ? "1" : "0"}
                          padding={padding}
                          height={height}>
                <Label isFull={focus ? "0" : value === "" ? "1" : "0"}
                       onClick={() => this._input.focus()}
                       color={error ? "error" : focus ? "focus" : value !== "" ? "active" : null}>
                    {title}
                    {isRequired && <Required>*</Required>}
                </Label>
                <TextareaAutosize onChange={e => this.onChange(e.target.value)}
                                  onFocus={() => this.setState({focus: true})}
                                  onBlur={() => this.setState({focus: false})}
                                  onKeyPress={e => this.onKeyPeress(e.keyCode)}
                                  type={type}
                                  maxRows={maxRows}
                                  minRows={minRows}
                                  disabled={disable}
                                  value={value ? value : ""}
                                  ref={(c) => this._input = c}/>
                {
                    (auxiliaryText || errorText) &&
                        <AuxiliaryText color={error ? "error" : null}>
                            {errorText ? errorText : auxiliaryText}
                        </AuxiliaryText>
                }
            </InputWrapper>
        )
    }
}

CustomTextArea.propTypes = {
    value: PropTypes.any,
    type: PropTypes.string,
    title: PropTypes.string,
    padding: PropTypes.string,
    widthImportant: PropTypes.bool,
    disable: PropTypes.bool,
    isRequired: PropTypes.bool,
    onChange: PropTypes.func,
    onKeyPeress: PropTypes.func,
    onClick: PropTypes.func,
    width: PropTypes.string,
    height: PropTypes.string,
    auxiliaryText: PropTypes.string,
    margin: PropTypes.string,
    errorText: PropTypes.string,
    background: PropTypes.string,
    minRows: PropTypes.number,
    maxRows: PropTypes.number,
};

export default CustomTextArea;
