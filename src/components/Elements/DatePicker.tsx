import React from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//region Types
type DPInputWrapperProps = {
    inputHeight?: string,
    inputWidth?: string,
    margin?: string,
}

type Props = {
    height?: string,
    margin?: string,
    title?: string,
    width?: string,
    hideTitle?: boolean,
    selected?: Date|null,
    onChange: ( date: Date | [Date, Date] | null, event?: React.SyntheticEvent<any>) => void,
    format?: string,
}
//endregion

//region Styled
const DPInputWrapper = styled.div<DPInputWrapperProps>`
  height: ${props => props.inputHeight || "auto"};
  width: ${props => props.inputWidth || "auto"};
  margin: ${props => props.margin || "auto"};
    position: relative;
  
  .react-datepicker-wrapper {
      width: 100%;
  }

  input{
      width: 100%;
      padding: 6px 35px 6px 10px;
      border: 1px solid #cdcdcd;
      border-radius: 4px;
      height: ${props => props.inputHeight || "40px"};
    }

    input[disabled]{
      background-color: #F0F1F3 !important;
    }

  .react-datepicker-wrapper,
  .form-control,
   .react-datepicker__input-container {
    height: 100%;
  }

  input.form-control {
    border: 1px solid  #cdcdcd;
    box-shadow: none !important;
    outline: none;

    &:hover, &:focus {
      border: 1px solid #2D9CDB;
    }
    ::placeholder {
      color: #8B90A0;
      font-size: 13px;
    }
  }
`;

const Label = styled.p`
    font-family: Roboto,sans-serif;
    position: absolute;
    top: -5px;
    padding: 0 6px;
    left: 7px;
    z-index: 1;
    font-size: 12px;
    color: #cecece;
    background: #fff;
`;
//endregion

//Стилизованный button
const CustomDatePicker:React.FC<Props> = (props: Props) => {
    const {height, selected, margin, onChange, width, hideTitle, title, format = "dd.MM.yyyy"} = props;
    return (
        <DPInputWrapper inputHeight={height}
                        margin={margin}
                        inputWidth={width}>
            {
                hideTitle ? null :
                    <Label>{title}</Label>
            }
            <DatePicker selected={selected}
                        onChange={onChange}
                        dateFormat={format}/>
        </DPInputWrapper>
    )
}

export default CustomDatePicker;
