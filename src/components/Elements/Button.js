import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

//region Styled
const ButtonWrapper = styled.div`
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

const Label = styled.p`
    font-family: Roboto,sans-serif;
    font-size: ${props => props.fontSize || "14px"};
    color: ${props => props.textColor || "#fff"};
`;
//endregion

const Button = (props) => {
    const {
        title, background,
        textColor, fontSize,
        onClick, disabled,
        width, height,
        margin, padding, type
    } = props;

    switch (type) {
        case "fill-white":
            return (
                <ButtonWrapper width={width}
                               height={height}
                               background={"transparent"}
                               disabled={disabled}
                               border={"2px solid white"}
                               onClick={disabled ? null : onClick ? onClick : null}
                               padding={padding}
                               margin={margin}>
                    <Label fontSize={fontSize}
                           textColor={"white"}>
                        {title}
                    </Label>
                </ButtonWrapper>
            );
        default:
            return (
                <ButtonWrapper width={width}
                               height={height}
                               background={background}
                               disabled={disabled}
                               onClick={disabled ? null : onClick ? onClick : null}
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

Button.propTypes = {
    title: PropTypes.any,
    background: PropTypes.string,
    textColor: PropTypes.string,
    fontSize: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    width: PropTypes.string,
    height: PropTypes.string,
    margin: PropTypes.string,
    padding: PropTypes.string,
    type: PropTypes.string,
};

export default Button;
