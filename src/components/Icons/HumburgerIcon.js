import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class HumburgerIcon extends PureComponent {
    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 24 24"
                 stroke="#3366FF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" color="#2329D6">
                <rect x="5" y="5" width="2" height="2"/>
                <rect x="11" y="5" width="2" height="2"/>
                <rect x="17" y="5" width="2" height="2"/>
                <rect x="5" y="11" width="2" height="2"/>
                <rect x="11" y="11" width="2" height="2"/>
                <rect x="17" y="11" width="2" height="2"/>
                <rect x="5" y="17" width="2" height="2"/>
                <rect x="11" y="17" width="2" height="2"/>
                <rect x="17" y="17" width="2" height="2"/>
            </svg>
        );
    }
}

HumburgerIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default HumburgerIcon;
