import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class HumburgerIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg xmlns="http://www.w3.org/2000/svg"
                 width="24"
                 height="24"
                 fill={color}
                 fillOpacity={opacity}
                 viewBox="0 0 384.97 384.97">
                <g>
                    <path d="M12.03,120.303h360.909c6.641,0,12.03-5.39,12.03-12.03c0-6.641-5.39-12.03-12.03-12.03H12.03    c-6.641,0-12.03,5.39-12.03,12.03C0,114.913,5.39,120.303,12.03,120.303z"/>
                    <path d="M372.939,180.455H12.03c-6.641,0-12.03,5.39-12.03,12.03s5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03    S379.58,180.455,372.939,180.455z"/>
                    <path d="M372.939,264.667H132.333c-6.641,0-12.03,5.39-12.03,12.03c0,6.641,5.39,12.03,12.03,12.03h240.606    c6.641,0,12.03-5.39,12.03-12.03C384.97,270.056,379.58,264.667,372.939,264.667z"/>
                </g>
            </svg>
        );
    }
}

HumburgerIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default HumburgerIcon;
