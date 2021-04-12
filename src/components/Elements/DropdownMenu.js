import React, {PureComponent} from "react";
import More from "components/Icons/More";
import styled from "styled-components";
import PropTypes from "prop-types";


const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    cursor: pointer;
    
    &:hover {
        border: 1px solid #cdcdcd;
        border-radius: 3px;
    }
    
    svg {
        width: 16px;
        height: 16px;
    }
`;

const Container = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
`;

const DropdownMenuContainer = styled.div`
    display: "flex";
    flex-direction:column;
    background: #fff;
    border-radius: 5px;
    width: 250px;
    position: absolute;
    ${props => props.position}: 0px;
    right: 0;
    box-shadow: 0 0 6px rgba(0,0,0,0.5);
    z-index: 3;
`;

const Item = styled.div`
    width: 100%;
    display: flex;
    background: #fff;
    padding: 8px;
    color: #000;
    font-size: 14px;
    cursor: pointer;
    border-radius: 5px;
    
    &:hover {
        background: rgba(0,0,0,0.1);
    }
`;

const Background = styled.div`
    width: 100vw;
    height: 100vh;
    background: rgba(255,255,255,0.01);
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
`;

class DropdownMenu extends PureComponent {
    state={
        isOpen: false
    };

    render() {
        return (
            <Container>
                <IconContainer onClick={() => this.setState({isOpen: true})}>
                    <More/>
                </IconContainer>
                {
                    this.state.isOpen &&
                        <>
                            <Background onClick={() => this.setState({isOpen: false})}/>
                            <DropdownMenuContainer position={this.props.position}>
                                {
                                    this.props.items.map((item, i) => {
                                        return (
                                            <Item key={i}
                                                  onClick={() => {
                                                      this.setState({isOpen: false});
                                                      item.onClick();
                                                  }}>
                                                {item.title}
                                            </Item>
                                        )
                                    })
                                }
                            </DropdownMenuContainer>
                        </>
                }
            </Container>
        )
    }
}

DropdownMenu.propTypes = {
    items: PropTypes.array,
    position: PropTypes.string,
};

export default DropdownMenu;
