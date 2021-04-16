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
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px;
    border-bottom: 1px solid gray;
`;

const MenuWrapper = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: flex-end;
    padding: 4px;
    cursor: pointer;
`;

const MenuText = styled.div`
    margin-right: 8px;
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
                <UserInfo/>
                <MenuWrapper onClick={() => this.setState({openMenu: !openMenu})}>
                    <MenuText>Меню</MenuText>
                    <HumburgerIcon/>
                </MenuWrapper>
                <Menu openMenu={openMenu}/>
            </Wrapper>
        )
    }
}

Header.propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func,
};

export default Header;