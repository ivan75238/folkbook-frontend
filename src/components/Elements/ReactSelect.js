import React, {PureComponent} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Select from "react-select";

const DPInputWrapper = styled.div`
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


class ReactSelect extends PureComponent {

    render() {
        const {height, value, onChange, width, options, margin, placeholder} = this.props;
        return (
            <DPInputWrapper inputHeight={height}
                            inputWidth={width}
                            margin={margin}>
                <Select value={value}
                        className={"react-select"}
                        options={options}
                        placeholder={placeholder}
                        onChange={onChange}/>
            </DPInputWrapper>
        )
    }
}

ReactSelect.propTypes = {
    height: PropTypes.string,
    width: PropTypes.string,
    placeholder: PropTypes.string,
    margin: PropTypes.string,
    options: PropTypes.object,
    value: PropTypes.object,
    onChange: PropTypes.func,
};

export default ReactSelect;
