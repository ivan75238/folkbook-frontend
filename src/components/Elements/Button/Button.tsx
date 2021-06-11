import React from "react";
import styled from "styled-components";

//region Types
type defaultProps = {
    disabled?: boolean,
    background?: string,
    margin?: string,
    padding?: string,
    width?: string,
    height?: string
}

type buttonWrapperProps = defaultProps & {border?: string}

type labelProps = {
    textColor?: string,
    fontSize?: string
}

type PropsComponent = defaultProps & labelProps & {
    title?: string,
    onClick?: () => void,
    type?: string,
    className?: string
}
//endregion

//region Styled
const ButtonWrapper = styled.div<buttonWrapperProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    border-radius: 5px;
    border: ${props => props.border};
    background: ${props => props.disabled ? "gray" : props.background || "#3366FF"};
    margin: ${props => props.margin};
    padding: ${props => props.padding};
    width: ${props => props.width || "auto"};
    height: ${props => props.height || "auto"};
    cursor: pointer;
    
    &:hover {
        box-shadow: 0 0 3px rgba(0,0,0,0.4);
    }
`;

const Label = styled.p<labelProps>`
    font-family: Roboto,sans-serif;
    font-size: ${props => props.fontSize || "14px"};
    color: ${props => props.textColor || "#fff"};
`;
//endregion

const Button = (props: PropsComponent) => {
    const {title, background,
        textColor, fontSize,
        onClick, disabled,
        width, height, className,
        margin, padding, type} = props;

    const onClickEvent = () => {
        if (!disabled && onClick){
            onClick();
        }
    };

    if (type === "fill-white") {
        return (
            <ButtonWrapper width={width}
                           className={"btn fill-white " + className}
                           height={height}
                           background={"transparent"}
                           disabled={disabled}
                           border={"2px solid white"}
                           onClick={onClickEvent}
                           padding={padding}
                           margin={margin}>
                <Label fontSize={fontSize}
                       textColor={"white"}>
                    {title}
                </Label>
            </ButtonWrapper>
        );
    } else {
        return (
            <ButtonWrapper width={width}
                           className={"btn " + className}
                           height={height}
                           background={background}
                           disabled={disabled}
                           onClick={onClickEvent}
                           padding={padding}
                           margin={margin}>
                <Label fontSize={fontSize}
                       textColor={textColor}>
                    {title}
                </Label>
            </ButtonWrapper>
        )
    }
};

export default Button;
