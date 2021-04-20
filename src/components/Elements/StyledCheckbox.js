import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from "prop-types";
import CheckedIcon from "components/Icons/CheckedIcon";

const LabelWrapperHover = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  background-color: transparent;
  width: 32px;
  height: 32px;
  border-radius: 4px;
`;

const CheckboxWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin: ${props => props.mainMargin || "0"};
    padding-left: 7px;
    cursor: pointer;
    
    &:hover{
      ${LabelWrapperHover}{
        background-color: rgba(27, 117, 187, 0.1);
      }
    }
`;

const LabelWrapper = styled.label`
    display: flex;
    align-items: center;
    height: 100%;
    padding-left: 29px;
    font-size: 14px;
    color: black;
    cursor: inherit;
    margin-bottom: 0;
    position: relative;
    ${(props) => (!props.label ? 'height: 8px' : '')};

    :before {
        content: '';
        position: absolute;
        border: 2px solid black;
        width: 18px;
        height: 18px;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 2px;
    }
`;

const CheckboxInput = styled.input`
    width: 18px;
    height: 18px;
    position: absolute;
    display: block;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;

    :checked + label:before {
        border: 2px solid black; 
    }
`;

const IconWrapper = styled.div`
    width: 18px;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 7px;
    top: 50%;
    transform: translateY(-50%);
    transition: all .3s ease;

    svg {
        width: 12px;
        height: 10px;
    }
    
    &:hover{
        background-color: rgba(27, 117, 187, 0.1);
    }
`;

@withTheme
export class StyledCheckbox extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        value: PropTypes.any,
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        label: PropTypes.string,
        mainMargin: PropTypes.string,
    };

    toggleChecked = () => {
        const {disabled, onChange} = this.props;
        if (disabled) {
            return;
        }
        onChange(!this.props.value);
    };

    render() {
        const {label, disabled, mainMargin} = this.props;
        const isChecked = !!this.props.value;

        return (
            <CheckboxWrapper mainMargin={mainMargin}
                             onClick={this.toggleChecked}>
                <LabelWrapperHover/>
                <CheckboxInput
                    type="checkbox"
                    checked={isChecked}
                    disabled={disabled}/>
                <LabelWrapper
                    label={label}
                    disabled={disabled}
                    checked={isChecked}>
                    {label}
                </LabelWrapper>
                {
                    isChecked &&
                    <IconWrapper>
                        <CheckedIcon/>
                    </IconWrapper>
                }
            </CheckboxWrapper>
        );
    }
}
