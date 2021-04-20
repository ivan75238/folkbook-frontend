//Галочка для чекбокса

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class CheckedIcon extends PureComponent{
    static propTypes = {
        fill: PropTypes.string,
    }

    static defaultProps = {
        fill: "black",
    }
    render(){
        const {fill} = this.props
        return(
            <svg width="13" height="10" viewBox="0 0 13 10" fill={fill} xmlns="http://www.w3.org/2000/svg">
                <path d="M12.99 1.99999L11.58 0.579986L4.98999 7.16999L2.40999 4.59999L0.98999 6.00999L4.98999 9.99999L12.99 1.99999Z"/>
            </svg>

        )
    }
}