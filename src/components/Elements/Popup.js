import React, {PureComponent} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Close from "components/Icons/Close";

const Wrapper = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 13;
    top: 0;
    left: 0;
`;

const Background = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 14;
    top: 0;
    left: 0;
`;

const PopupContainer = styled.div`
    width: ${props => props.width || "auto"};
    height: auto;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    z-index: 15;
    border-radius: 5px;
`;

const Header = styled.div`
    width: 100%;
    height: 40px;
    background: #00b700;
    display: flex;
    position: relative;
    align-items: center;
    padding: 0 8px;
    color: #fff;
    font-size: 16px;
    justify-content: space-between;
    border-radius: 5px 5px 0 0;
`;

const Content = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;

const ButtonsContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    padding: 16px;
    align-items: center;
    justify-content: center;
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 8px;
    
    svg {
        width: 16px;
        height: 16px;
    }
`;

//Стилизованный инпут
class Popup extends PureComponent {
    componentDidMount() {
        const {listenEscForClose, onClose} = this.props;
        if (listenEscForClose) {
            document.onkeydown = evt => {
                evt = evt || window.event;
                if (evt.keyCode == 27 && onClose) {
                     onClose();
                }
            };
        }
    }

    componentWillUnmount() {
        document.onkeydown =  null;
    }

    render() {
        const { title, width, onClose, children, buttons} = this.props;
        return (
            <Wrapper>
                <Background onClick={onClose ? onClose : null}/>
                <PopupContainer width={width}>
                    <Header>
                        {title}
                        <IconContainer onClick={onClose ? onClose : null}>
                            <Close color={"#fff"}/>
                        </IconContainer>
                    </Header>
                    <Content>{children}</Content>
                    <ButtonsContainer>{buttons}</ButtonsContainer>
                </PopupContainer>
            </Wrapper>
        )
    }
}

Popup.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func,
    width: PropTypes.string,
    children: PropTypes.any,
    listenEscForClose: PropTypes.bool,
    buttons: PropTypes.any,
};

export default Popup;
