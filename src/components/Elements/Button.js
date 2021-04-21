import React, {PureComponent} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    border-radius: 5px;
    background: ${props => props.disabled ? "gray" : props.background || "#00b700"};
    margin: ${props => props.margin};
    padding: ${props => props.padding};
    width: ${props => props.width || "auto"};
    height: ${props => props.height || "auto"};
    cursor: pointer;
    
    &:hover {
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
    }
`;

const Label = styled.p`
    font-family: Roboto,sans-serif;
    font-size: ${props => props.fontSize || "14px"};
    color: ${props => props.textColor || "#fff"};
`;

//Стилизованный button
class Button extends PureComponent {

    render() {
        const {title, width, height, textColor, disabled, fontSize, margin, onClick, background, padding} = this.props;
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
}



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
};

export default Button;
