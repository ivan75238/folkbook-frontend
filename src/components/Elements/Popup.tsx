import React, {useEffect} from "react";
import styled from "styled-components";
import Close from "../../components/Icons/Close";

//region Types
type PopupContainerProps = {
    width?: string
}

type PopupProps = PopupContainerProps & {
    title?: string,
    onClose?: () => void,
    children?: React.ReactNode,
    listenEscForClose?: boolean,
    buttons?: React.ReactNode
}
//endregion

//region Styled
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

const PopupContainer = styled.div<PopupContainerProps>`
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
//endregion

const Popup = (props: PopupProps) => {
    const {title, onClose, width, children, buttons, listenEscForClose} = props;
    useEffect(() => {
        if (listenEscForClose) {
            document.onkeydown = evt => {
                evt = evt || window.event;
                if (evt.keyCode == 27 && onClose) {
                    onClose();
                }
            };
        }

        return () => {document.onkeydown =  null};
    });

    return (
        <Wrapper>
            <Background onClick={() => onClose ? onClose : null}/>
            <PopupContainer width={width}>
                <Header>
                    {title}
                    <IconContainer onClick={() => onClose ? onClose : null}>
                        <Close color={"#fff"}/>
                    </IconContainer>
                </Header>
                <Content>{children}</Content>
                <ButtonsContainer>{buttons}</ButtonsContainer>
            </PopupContainer>
        </Wrapper>
    )
};

export default Popup;
