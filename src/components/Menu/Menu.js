import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {API} from "components/API";
import {appActions} from "reducers/actions";
import {toast} from "react-toastify";
import {connect} from "react-redux";
import {Items} from "components/Menu/Items";
import {withRouter} from "react-router-dom";

const Wrapper = styled.div`
    position: fixed;
    z-index: 1000;
    width: 240px;
    height: calc(100% - 48px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    background: #fff;
    bottom: 0;
    right: ${props => props.openMenu ? "0" : "-400px"};
    box-shadow: 0 10px 24px rgb(0 0 0 / 10%);
    transition: right .3s ease-in-out;
`;

const MenuWrapper = styled.div`
    width: 100%;
`;

const Item = styled.div`
    width: 100%;
    height: 40px;
    padding: 0 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    
    ${props => props.isActive && `
        background-color: #EBECF0;
        color: #42526E;    
    `}
    
    :hover {
        background-color: #EBECF0;
        color: #42526E;
    }
`;

@withRouter
@connect(() => ({}))
class Menu extends PureComponent {
    state = {
        activeMenuId: 0,
    };

    unlisten = null;

    componentDidMount() {
        this.onLocationChange(this);
        this.unlisten = this.props.history.listen(() => {
            this.onLocationChange(this)
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    onClickLogout = () => {
        const {dispatch} = this.props;
        API.USER.LOGOUT()
            .then(() => {
                dispatch({type: appActions.SET_AUTH_VALUE, auth: false});
                dispatch({type: appActions.SET_AUTH_DATA, user: null});
            })
            .catch(error => {
                toast.error(error.response.data.msgUser);
            });
    };

    onLocationChange = (_this) => {
        const pathname = window.location.hash.split('/');
        const findMenuItem = Items.find(i => {
            const pathParsed = i.path.split('/');
            if (pathname.findIndex(j => j === pathParsed[1]) > -1)
                return i;
        });
        if (findMenuItem) {
            _this.setState({activeMenuId: findMenuItem.id});
        }
        else {
            _this.setState({activeMenuId: -1});
        }
    };

    openPage = path => {
        const {history} = this.props;
        history.push(path);
    };

    render() {
        const {openMenu} = this.props;
        const {activeMenuId} = this.state;
        const itemsTop = Items.filter(i => i.id < 100);
        const itemsBottom = Items.filter(i => i.id > 100);
        return(
            <Wrapper openMenu={openMenu}>
                <MenuWrapper>
                    {
                        itemsTop.map((item, i) => {
                            return <Item key={i}
                                         isActive={activeMenuId === item.id}
                                         onClick={() => this.openPage(item.path)}>
                                        {item.title}
                                    </Item>;
                        })
                    }
                </MenuWrapper>
                <MenuWrapper>
                    {
                        itemsBottom.map((item, i) => {
                            return <Item key={i}
                                         isActive={activeMenuId === item.id}
                                         onClick={() => this.openPage(item.path)}>
                                {item.title}
                            </Item>;
                        })
                    }
                    <Item onClick={this.onClickLogout}>Выход</Item>
                </MenuWrapper>
            </Wrapper>
        )
    }
}

Menu.propTypes = {
    openMenu: PropTypes.bool,
    dispatch: PropTypes.func,
    history: PropTypes.func,
};

export default Menu;