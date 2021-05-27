import React from 'react';
import styled from 'styled-components';
import CheckedIcon from "../../components/Icons/CheckedIcon";

//region Type
type CheckboxWrapperProps = {
    mainMargin?: string
}

type LabelWrapperProps = {
    label?: string,
}

type Props = CheckboxWrapperProps & LabelWrapperProps & {
    value: boolean,
    onChange: (x:boolean) => void,
    disabled?: boolean
}
//endregion

//region Styled
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

const CheckboxWrapper = styled.div<CheckboxWrapperProps>`
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

const LabelWrapper = styled.label<LabelWrapperProps>`
    display: flex;
    align-items: center;
    height: 100%;
    padding-left: 29px;
    font-size: 14px;
    color: black;
    cursor: inherit;
    margin-bottom: 0;
    position: relative;
    ${props => props.label !== "" ? 'height: 8px' : ''};

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
//endregion

export const StyledCheckbox: React.FC<Props> = (props:Props) => {
    const {disabled, onChange, value, mainMargin, label} = props;

    const toggleChecked = () => disabled ? null : onChange(!value);

    return (
        <CheckboxWrapper mainMargin={mainMargin}
                         onClick={toggleChecked}>
            <LabelWrapperHover/>
            <CheckboxInput
                type="checkbox"
                checked={value}
                disabled={disabled}/>
            <LabelWrapper label={label}>
                {label}
            </LabelWrapper>
            {
                value &&
                <IconWrapper>
                    <CheckedIcon/>
                </IconWrapper>
            }
        </CheckboxWrapper>
    )
};