import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {connect} from "react-redux";
import UserInfo from "components/Header/UserInfo";
import Menu from "components/Menu/Menu";
import HumburgerIcon from "components/Icons/HumburgerIcon";

//region Styled
const Wrapper = styled.div`
    width: 100vw;
    height: 48px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #e7e8ec;
`;

const WrapperInner = styled.div`
    width: 100%;
    max-width: 1180px;
    padding: 0px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const MenuWrapper = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    
    svg {
        width: 38px;
        height: 38px;
    }
`;

const MenuText = styled.div`
    margin-right: 8px;
`;

const ClickCatcher = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    bottom: 0;
    left: 0;
`;
//endregion

@connect(() => ({}))
class Header extends PureComponent {
    state = {
        openMenu: false
    };

    render() {
        const {openMenu} = this.state;
        return (
            <Wrapper>
                <WrapperInner>
                    <UserInfo/>
                    <MenuWrapper onClick={() => this.setState({openMenu: !openMenu})}>
                        <MenuText>Меню</MenuText>
                        <HumburgerIcon/>
                    </MenuWrapper>
                    {
                        openMenu &&
                        <ClickCatcher onClick={() => this.setState({openMenu: false})}/>
                    }
                    <Menu openMenu={openMenu}
                          closeMenu={() => this.setState({openMenu: false})}/>
                </WrapperInner>
            </Wrapper>
        )
    }
}

Header.propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func,
};

export default Header;