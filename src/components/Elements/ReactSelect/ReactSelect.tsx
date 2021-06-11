import React from "react";
import styled from "styled-components";
import Select from "react-select";

//region Types
type InputWrapperProps = {
    inputHeight?: string,
    inputWidth?: string,
    margin?: string,
    className?: string
}

type Props = {
    height?: string,
    width?: string,
    placeholder? : string,
    margin?: string,
    options: { label: string; value: string }[],
    value: {label: string; value: string},
    onChange: (value: any) => void
}
//endregion

//region Styled
const InputWrapper = styled.div<InputWrapperProps>`
  height: ${props => props.inputHeight || "auto"};
  width: ${props => props.inputWidth || "auto"};
  margin: ${props => props.margin || "auto"};

    .react-select {
        width: 100%;
        height: ${props => props.inputHeight || "auto"};
        
        >div {
            min-height: ${props => props.inputHeight || "auto"};
        }
    }
`;
//endregion


const ReactSelect = (props: Props) => {
    const {height, value, onChange, width, options, margin, placeholder} = props;
    return (
        <InputWrapper inputHeight={height}
                      inputWidth={width}
                      className={"inputWrapper"}
                      margin={margin}>
            <Select value={value}
                    className={"react-select"}
                    options={options}
                    placeholder={placeholder}
                    onChange={onChange}/>
        </InputWrapper>
    )
};

export default ReactSelect;